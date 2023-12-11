import type { PayloadAction } from "@reduxjs/toolkit";
import type { IItagInfo, ISendResult } from "../model/youtubeModel";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    videoPath: string,
    videoItagList: IItagInfo[],
    audioItagList: IItagInfo[],
    sliderMax: number,
    pauseTime: number,
    mediaActiveIndex: number,
    videoItagActiveIndex: number,
    audioItagActiveIndex: number,
    sendResult: ISendResult,
}

const initialState: IinitialState = {
    videoPath: "",
    videoItagList: [],
    audioItagList: [],
    sliderMax: 1,
    pauseTime: 0,
    mediaActiveIndex: 0,
    videoItagActiveIndex: 0,
    audioItagActiveIndex: 0,
    sendResult: null,
};

export const previewSlice = createSlice({
	name: "preview",
	initialState,
	reducers: {
        setVideoPath: (status, action: PayloadAction<string>) => {
            status.videoPath = action.payload;
        },
        setVideoItagList: (status, action: PayloadAction<IItagInfo[]>) => {
            status.videoItagList = action.payload;
        },
        setAudioItagList: (status, action: PayloadAction<IItagInfo[]>) => {
            status.audioItagList = action.payload;
        },
        setSliderMax: (status, action: PayloadAction<number>) => {
            status.sliderMax = action.payload;
        },
        setPauseTime: (status, action: PayloadAction<number>) => {
            status.pauseTime = action.payload;
        },
        setMediaActiveIndex: (status, action: PayloadAction<number>) => {
            status.mediaActiveIndex = action.payload;
        },
        setVideoItagActiveIndex: (status, action: PayloadAction<number>) => {
            status.videoItagActiveIndex = action.payload;
        },
        setAudioItagActiveIndex: (status, action: PayloadAction<number>) => {
            status.audioItagActiveIndex = action.payload;
        },
        setSendResult: (status, action: PayloadAction<ISendResult>) => {
            status.sendResult = action.payload;
        },
    },
});

export const { setVideoPath, setVideoItagList, setAudioItagList, setSliderMax, setPauseTime, setMediaActiveIndex, setVideoItagActiveIndex, setAudioItagActiveIndex, setSendResult } = previewSlice.actions;

export default previewSlice.reducer;