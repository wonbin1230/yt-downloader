import type { IYTList, IYTItem } from "../../model/youtubeModel";

import React from "react";
import { socket } from "../../services/socketService";
import { Centered, InputGroup, BtnArea, Btn } from "./style";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleLoading, setLoadingText } from "../../slices/loading";
import { setInputKeyWord, setYtItems, setCurrentYtItems, setCurrentPage } from "../../slices/search";
import { setIsSearchList } from "../../slices/viewbox";

interface IProps {
    startIndex: number,
    endIndex: number,
}

const Search = ({ startIndex, endIndex }: IProps) => {
    const dispatch = useAppDispatch();

    const { inputKeyWord } = useAppSelector(status => status.searchReducer);

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
            dispatch(setIsSearchList(true));
            dispatch(toggleLoading(false));
        });
    };

    return (
        <>
			<Centered>
				<InputGroup>
					<input type="text" id="search"
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && inputKeyWord) {
                            getYTList();
                        }
                    }}
                    value={inputKeyWord}
                    onChange={handleText} required />
					<label htmlFor="search">
						搜尋Youtube影片<i className="fa-solid fa-magnifying-glass"></i>
					</label>
					<div className="bar"></div>
				</InputGroup>
				{inputKeyWord && (
					<BtnArea>
						<Btn onClick={getYTList}>Search</Btn>
					</BtnArea>
				)}
			</Centered>
        </>
    );
};

export default Search;