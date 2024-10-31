import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AppData } from "@/types";
import { APP_DATA } from "@/app-data/constants";

export const initialState: AppData = APP_DATA;

export const appDataSlice = createSlice({
    name: 'app-data',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            state.server = action.payload.server;
            state.user = action.payload.user;
        }
    }
});

export const { setAppData } = appDataSlice.actions;

export const selectAppData = (state: RootState) => state.appData;

export default appDataSlice.reducer;