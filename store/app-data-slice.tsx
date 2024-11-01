import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { AppData, Machine, UserMachine } from "@/types";
import { APP_DATA } from "@/constants/constants";
const initialState: AppData = APP_DATA;

export const appDataSlice = createSlice({
    name: 'app-data',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            state.server = action.payload.server;
            state.user = action.payload.user;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.user.name = action.payload;
        },
        setServerMachines: (state, action: PayloadAction<Machine[]>) => {
            state.server.machines = action.payload;
        },
        addUserMachine: (state, action: PayloadAction<UserMachine>) => {
            state.user.machines.push(action.payload);

        },
    }
});

export const { setAppData, setUserName, setServerMachines, addUserMachine } = appDataSlice.actions;

export const selectAppData = (state: RootState) => state.appData;

export const selectServerMachines = (state: RootState) => state.appData.server.machines;

export const selectUserMachines = (state: RootState) => state.appData.user.machines;

export default appDataSlice.reducer;