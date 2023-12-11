import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    isDarkMode: boolean,
}

const initialState: IinitialState = {
    isDarkMode: false,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
        setIsDarkMode: (status, action: PayloadAction<boolean>) => {
            status.isDarkMode = action.payload;
            if (status.isDarkMode) {
                document.documentElement.style.setProperty("--theme-switcher", "rgb(240 196 32)");
                document.documentElement.style.setProperty("--background-color", "#2F2F2F");
                document.documentElement.style.setProperty("--input-color", "white");
                document.documentElement.style.setProperty("--main-font-color", "white");
                document.documentElement.style.setProperty("--second-font-color", "#94cbea");
                document.documentElement.style.setProperty("--third-font-color", "rgb(0, 151, 238)");
                document.documentElement.style.setProperty("--hover-color", "rgb(0, 151, 238)");
                document.documentElement.style.setProperty("--card-hover-color", "#2F2F2F");
                document.documentElement.style.setProperty("--object-color", "linear-gradient(45deg, #5F5F5F, #D6ECF0)");
            }
            else {
                document.documentElement.style.setProperty("--theme-switcher", "rgb(30 48 80)");
                document.documentElement.style.setProperty("--background-color", "#f3f5f8");
                document.documentElement.style.setProperty("--input-color", "black");
                document.documentElement.style.setProperty("--main-font-color", "#3d535f");
                document.documentElement.style.setProperty("--second-font-color", "rgba(128, 0, 255, 0.5)");
                document.documentElement.style.setProperty("--third-font-color", "#7f00ff");
                document.documentElement.style.setProperty("--hover-color", "#7f00ff");
                document.documentElement.style.setProperty("--card-hover-color", "#f3f5f8");
                document.documentElement.style.setProperty("--object-color", "linear-gradient(45deg, #7f00ff, pink)");
            }
        },
    },
});

export const { setIsDarkMode } = themeSlice.actions;

export default themeSlice.reducer;