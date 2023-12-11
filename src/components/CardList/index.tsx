import type { IYTList, IYTItem, IWsPreviewVideo } from "../../model/youtubeModel";

import React from "react";
import { socket } from "../../services/socketService";
import { Action, SearchArea, InputGroup, SearchBtn, Center, PageBtn, List, Card, Title } from "./style";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleLoading, setLoadingText } from "../../slices/loading";
import { setInputKeyWord, setYtItems, setCurrentYtItems, setCurrentPage, setInputUrl } from "../../slices/search";
import { setVideoPath, setVideoItagList, setAudioItagList, setSliderMax, setSendResult } from "../../slices/preview";
import { setIsPreview } from "../../slices/viewbox";

interface IProps {
	startIndex: number,
	endIndex: number,
	cardPerPage: number,
}

const CardList = ({ startIndex, endIndex, cardPerPage }: IProps) => {
	const dispatch = useAppDispatch();

    const { inputKeyWord, currentPage, ytItems, currentYtItems } = useAppSelector(status => status.searchReducer);

	const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setInputKeyWord(event.target.value));
	};

	const getYTList = () => {
		socket.off("status");
		socket.off("res_searchKeyWord");

		dispatch(toggleLoading(true));
		socket.emit("req_searchKeyWord", inputKeyWord);
		socket.on("status", (mesaage: string) => {
			dispatch(setLoadingText(mesaage));
		});
		socket.on("res_searchKeyWord", (result: IYTList) => {
			const onlyVideos: IYTItem[] = result.items.filter((item: IYTItem) => item.type === "video");
			dispatch(setYtItems(onlyVideos));
			dispatch(setCurrentPage(1));
			dispatch(setCurrentYtItems(onlyVideos.slice(startIndex, endIndex)));
			dispatch(toggleLoading(false));
		});
	};

    const getYtVideo = (url: string) => {
		socket.off("status");
		socket.off("chunk");
		socket.off("res_genPreview");

		dispatch(toggleLoading(true));
		socket.emit("req_genPreview", url);
		socket.on("status", (mesaage: string) => {
			dispatch(setLoadingText(mesaage));
		});
		const receivedChunks: BlobPart[] = [];
		socket.on("chunk", (chunk: BlobPart) => {
			receivedChunks.push(chunk);
		});
		socket.on("res_genPreview", (result: IWsPreviewVideo) => {
			if (Object.keys(result).length !== 3) {
				dispatch(toggleLoading(false));
				alert("Can not find viedo from youtube");
				return false;
			}
			const url: string = URL.createObjectURL(new Blob(receivedChunks, { type: "video/mp4" }));
			dispatch(setVideoPath(url));
			dispatch(setSliderMax(Number(result.lengthSeconds)));
			dispatch(setSendResult({
				range: {
					start: 0,
					end: Number(result.lengthSeconds),
				},
				mediaType: result.audioItagList.length > 0 ? "MP3" : "MP4",
				itag: result.audioItagList.length > 0 ? result.audioItagList[0].itag : result.videoItagList[0].itag,
			}));
			dispatch(setVideoItagList(result.videoItagList));
			dispatch(setAudioItagList(result.audioItagList));
			dispatch(setIsPreview(true));
			dispatch(toggleLoading(false));
		});
	};

	return (
		<>
			<Action>
				<SearchArea>
					<InputGroup>
						<input type="text" id="search"
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && inputKeyWord) {
                                getYTList();
                            }
                        }}
                        value={inputKeyWord}
                        onChange={handleText} required />
						<div className="bar"></div>
					</InputGroup>
					<SearchBtn onClick={getYTList}>Search</SearchBtn>
				</SearchArea>
				<Center>
					<div>
						<PageBtn onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}>上一頁</PageBtn>
						<PageBtn onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, Math.ceil(ytItems.length / cardPerPage))))}>下一頁</PageBtn>
					</div>
					<span>
						第 {currentPage} 頁 / 共 {Math.ceil(ytItems.length / cardPerPage)} 頁
					</span>
				</Center>
			</Action>
			<List>
				{currentYtItems.map((item: IYTItem) => {
					return (
						<Card
							key={item.id}
							onClick={() => {
								dispatch(setInputUrl(item.url));
								getYtVideo(item.url);
							}}>
							<img src={item.bestThumbnail.url} alt={item.title} title={item.title} />
							<Title title={item.title}>
								{item.title}
							</Title>
						</Card>
					);
				})}
			</List>
		</>
	);
};

export default CardList;
