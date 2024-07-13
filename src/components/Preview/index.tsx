import type { ITargetElement, IWsDownload, IItagInfo } from "../../model/youtubeModel";

import React, { useEffect, useRef } from "react";
import noUiSlider, { PipsMode } from "nouislider";
import "nouislider/dist/nouislider.css";
import { socket } from "../../services/socketService";
import { Container, Video, Volume, Slider, Center, TypeBtn, ActionBtn } from "./style";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setVideoPath, setVideoItagList, setAudioItagList, setSliderMax, setPauseTime, setMediaActiveIndex, setVideoItagActiveIndex, setAudioItagActiveIndex, setSendResult } from "../../slices/preview";
import { toggleLoading, setLoadingText } from "../../slices/loading";
import { setIsPreview } from "../../slices/viewbox";

const Preview = () => {
	const dispatch = useAppDispatch();

	const { inputUrl } = useAppSelector((status) => status.searchReducer);
	const { videoPath, videoItagList, audioItagList, sliderMax, pauseTime, mediaActiveIndex, videoItagActiveIndex, audioItagActiveIndex, sendResult } = useAppSelector((status) => status.previewReducer);

	const videoRef = useRef<HTMLVideoElement>(null);
	const sliderRef = useRef<ITargetElement>(null);
	const volumeRef = useRef<ITargetElement>(null);

	const mediaTypes: string[] = ["MP3", "MP4"];

	const handleMediaType = (mediaType: string, index: number) => {
		dispatch(setMediaActiveIndex(index));
		index === 0 ? dispatch(setAudioItagActiveIndex(0)) : dispatch(setVideoItagActiveIndex(0));
		dispatch(
			setSendResult({
				...sendResult,
				mediaType: mediaType,
				itag: mediaType === "MP3" ? audioItagList[0].itag : videoItagList[0].itag,
			})
		);
	};

    const handleItagList = (itagType: string, itagData: IItagInfo, index: number) => {
		itagType === "video" ? dispatch(setVideoItagActiveIndex(index)) : dispatch(setAudioItagActiveIndex(index));
		dispatch(setSendResult({
			...sendResult,
			mediaType: itagType === "video" ? "MP4" : "MP3",
			itag: itagData.itag,
		}));
	};

	const handleSlider = (valueBegin: number, valueEnd: number) => {
		if (videoRef.current) {
			videoRef.current.currentTime = valueBegin;
			dispatch(setPauseTime(valueEnd));
			videoRef.current.play();
		}
	};

	const handleVolume = (values: string[]) => {
		videoRef.current.volume = Number(values[0]) / 100;
	};

	const handleOnReady = () => {
		const mobileDevice: string[] = ["Android", "webOS", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];
		const isMobileDevice: boolean = mobileDevice.some((userAgent: string) => navigator.userAgent.match(userAgent));
		if (!isMobileDevice) {
			videoRef.current.pause();
		}
		if (isMobileDevice) {
			volumeRef.current.style.display = "none";
		}
	};

	const download = () => {
		socket.off("status");
		socket.off("chunk");
		socket.off("res_download");

		videoRef.current.pause();
		dispatch(toggleLoading(true));
		socket.emit("req_download", { ...sendResult, url: inputUrl });
		socket.on("status", (mesaage: string) => {
			dispatch(setLoadingText(mesaage));
		});
		const receivedChunks: BlobPart[] = [];
		socket.on("chunk", (chunk: BlobPart) => {
			receivedChunks.push(chunk);
		});
		socket.on("res_download", (result: IWsDownload) => {
			const url: string = window.URL.createObjectURL(
				new Blob(receivedChunks, {
					type: result.mediaType === "MP4" ? "video/mp4" : "audio/mp3",
				})
			);
			const a: HTMLAnchorElement = document.createElement("a");
			a.href = url;
			a.download = decodeURIComponent(`${result.titleName}.${result.mediaType.toLowerCase()}`);
			document.body.append(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			dispatch(toggleLoading(false));
		});
	};

	const reset = () => {
		sliderRef.current.noUiSlider.reset();
		videoRef.current.pause();
		videoRef.current.currentTime = 0;
	};

	useEffect(() => {
		if (sliderRef.current) {
			noUiSlider.create(sliderRef.current, {
				range: { min: 0, max: sliderMax },
				start: [0, sliderMax],
				tooltips: [true, true],
				format: {
					to: function (value: number) {
						return String(Math.floor(value / 60)) + ":" + String(Math.floor(value % 60)).padStart(2, "0");
					},
					from: function (value: string) {
						return Number(value);
					},
				},
				pips: {
					mode: PipsMode.Values,
					values: [0, sliderMax],
					format: {
						to: function (value: number) {
							return String(Math.floor(value / 60)) + ":" + String(Math.floor(value % 60)).padStart(2, "0");
						},
						from: function (value: string) {
							return Number(value);
						},
					},
				},
				connect: true,
			});
			sliderRef.current.noUiSlider.on("change", (values: string[]) => {
				const valueBegin: number = Number(values[0].split(":")[0]) * 60 + Number(values[0].split(":")[1]);
				const valueEnd: number = Number(values[1].split(":")[0]) * 60 + Number(values[1].split(":")[1]);
				handleSlider(valueBegin, valueEnd);
				dispatch(
					setSendResult({
						...sendResult,
						range: {
							start: valueBegin,
							end: valueEnd,
						},
					})
				);
			});
		}

		if (volumeRef.current) {
			noUiSlider.create(volumeRef.current, {
				range: { min: 0, max: 100 },
				start: 100,
				connect: "lower",
			});
			volumeRef.current.noUiSlider.on("update", (values: string[]) => {
				handleVolume(values);
			});
		}
	}, [sliderMax]);

	return (
		<Container>
			<Video
				ref={videoRef}
				preload="none"
				width={600}
				onTimeUpdate={() => {
					if (pauseTime !== 0) {
						if (videoRef.current && videoRef.current.currentTime >= pauseTime) {
							videoRef.current.pause();
						}
					}
				}}
				onLoadedMetadata={handleOnReady}
				controls
				autoPlay
				playsInline>
				<source type="video/mp4" src={videoPath} />
				<p>你的瀏覽器不支援 HTML 5 video tag</p>
			</Video>
			<Volume ref={volumeRef} />
			<Slider ref={sliderRef} />
			<Center>
				{mediaTypes.map((mediaType: string, index: number) => {
					return (
						<TypeBtn
							key={index}
                            style={{
                                backgroundColor: index === mediaActiveIndex ? "var(--hover-color)" : "#3d535f",
                            }}
							onClick={() => {
								handleMediaType(mediaType, index);
							}}>
							{mediaType}
						</TypeBtn>
					);
				})}
			</Center>
			<Center>
				{videoItagList.length > 0 &&
					mediaActiveIndex === 1 &&
					videoItagList.map((videoItag: IItagInfo, index: number) => {
						return (
							<TypeBtn
								key={index}
                                style={{
                                    backgroundColor: index === videoItagActiveIndex ? "var(--hover-color)" : "#3d535f",
                                }}
								onClick={() => {
									handleItagList("video", videoItag, index);
								}}>
								{videoItag.resolution}
							</TypeBtn>
						);
					})}
				{audioItagList.length > 0 &&
					mediaActiveIndex === 0 &&
					audioItagList.map((audioItag: IItagInfo, index: number) => {
						return (
							<TypeBtn
								key={index}
                                style={{
                                    backgroundColor: index === audioItagActiveIndex ? "var(--hover-color)" : "#3d535f",
                                }}
								onClick={() => {
									handleItagList("audio", audioItag, index);
								}}>
								{audioItag.resolution}
							</TypeBtn>
						);
					})}
			</Center>
			<Center>
				<ActionBtn onClick={download}>下載{mediaActiveIndex === 0 ? "音檔" : "影片"}</ActionBtn>
				<ActionBtn onClick={reset}>重置預覽</ActionBtn>
			</Center>
			<Center>
				<ActionBtn onClick={() => dispatch(setIsPreview(false))}>重新選擇影片</ActionBtn>
			</Center>
		</Container>
	);
};

export default Preview;
