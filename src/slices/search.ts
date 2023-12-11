import type { PayloadAction } from "@reduxjs/toolkit";
import type { IYTItem } from "../model/youtubeModel";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    inputKeyWord: string,
    ytItems: IYTItem[],
    currentYtItems: IYTItem[],
    currentPage: number,
    inputUrl: string,
}

const initialState: IinitialState = {
    inputKeyWord: "",
    ytItems: [],
    currentYtItems: [],
    currentPage: 1,
    inputUrl: "",
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
        setInputKeyWord: (status, action: PayloadAction<string>) => {
            status.inputKeyWord = action.payload;
        },
        setYtItems: (status, action: PayloadAction<IYTItem[]>) => {
            status.ytItems = action.payload;
        },
        setCurrentYtItems: (status, action: PayloadAction<IYTItem[]>) => {
            status.currentYtItems = action.payload;
        },
        setCurrentPage: (status, action: PayloadAction<number>) => {
            status.currentPage = action.payload;
        },
        setInputUrl: (status, action: PayloadAction<string>) => {
            status.inputUrl = action.payload;
        },
    },
});

export const { setInputKeyWord, setYtItems, setCurrentYtItems, setCurrentPage, setInputUrl } = searchSlice.actions;

export default searchSlice.reducer;