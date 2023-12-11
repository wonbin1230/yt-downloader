import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import searchReducer from "./slices/search";
import previewReducer from "./slices/preview";
import viewBoxReducer from "./slices/viewbox";
import themeReducer from "./slices/theme";

const store = configureStore({
    reducer: {
        loadingReducer,
        searchReducer,
        previewReducer,
        viewBoxReducer,
        themeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;