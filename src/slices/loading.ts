import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    isLoading: boolean,
    loadingText: string,
}

const initialState: IinitialState = {
    isLoading: false,
    loadingText: "",
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
        toggleLoading: (status, action: PayloadAction<boolean>) => {
            status.isLoading = action.payload;
        },
        setLoadingText: (status, action: PayloadAction<string>) => {
            status.loadingText = action.payload;
        }
    },
});

export const { toggleLoading, setLoadingText } = loadingSlice.actions;

export default loadingSlice.reducer;
