import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    isSearchList: boolean,
    isPreview: boolean,
}

const initialState: IinitialState = {
    isSearchList: false,
    isPreview: false,
};

export const viewBoxSlice = createSlice({
	name: "viewBox",
	initialState,
	reducers: {
        setIsSearchList: (status, action: PayloadAction<boolean>) => {
            status.isSearchList = action.payload;
        },
        setIsPreview: (status, action: PayloadAction<boolean>) => {
            status.isPreview = action.payload;
        }
    },
});

export const { setIsSearchList, setIsPreview } = viewBoxSlice.actions;

export default viewBoxSlice.reducer;