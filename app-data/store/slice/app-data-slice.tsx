import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initEmptyServerData, useInitEmptyAppData } from "@/app-data/store/util/use-init-empty-app-data";
import { AppData, ServerMachine, UserBean, UserMachine } from "../domain";
import { RootState } from "@/app-data/store/reducers";
import { API_URL } from "@/app-data/store/util/constants";

import { ServerData } from "@/app-data/store/domain/server-data";
import { GoogleSheetsResponseDto } from "@/app-data/store/dto/dto";
import { dtoToServerBeans, dtoToServerMachines } from "@/app-data/store/dto/transform";

export const loadRemoteData = createAsyncThunk<ServerData, void, { rejectValue: string }>(
    "appData/loadFromLocalStorage",
    async (_, thunkAPI) => {
        try {
            const machinesResponse = await fetch(API_URL('machines'));
            const beansResponse = await fetch(API_URL('beans'));
            // const roastersResponse = await fetch(API_URL('roasters'));

            const machinesDto = await machinesResponse.json();
            const beansDto: GoogleSheetsResponseDto = await beansResponse.json();
            // const roasterDto: GoogleSheetsResponseDto = await roastersResponse.json();

            let serverData = initEmptyServerData();
            serverData.machines = dtoToServerMachines(machinesDto);
            serverData.beans = dtoToServerBeans(beansDto);
            // serverData.roasters = dtoToRoasters(roasterDto);

            return serverData;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch server data.");
        }
    }
);

interface AppDataState {
    data: AppData;
    loading: boolean;
    error: string | null;
}

const initialState: AppDataState = {
    data: useInitEmptyAppData(),
    loading: false,
    error: null,
};

export const appDataSlice = createSlice({
    name: 'app-data',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            state.data.server = action.payload.server;
            state.data.user = action.payload.user;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.data.user.name = action.payload;
        },
        addUserMachine: (state, action: PayloadAction<UserMachine>) => {
            state.data.user.machines = [...state.data.user.machines, action.payload]
        },
        addUserBean: (state, action: PayloadAction<UserBean>) => {
            state.data.user.beans = [...state.data.user.beans, action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadRemoteData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadRemoteData.fulfilled, (state, action) => {
                state.loading = false;
                state.data.server = action.payload;
            })
            .addCase(loadRemoteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setAppData, setUserName, addUserMachine, addUserBean } = appDataSlice.actions;

export const selectAppData = (state: RootState) => state.appData;

export const selectServerMachines = (state: RootState) => state.appData.data.server.machines;

export const selectServerBeans = (state: RootState) => state.appData.data.server.beans;

export const selectServerRosters = (state: RootState) => state.appData.data.server.roasters;

export const selectUserMachines = (state: RootState) => state.appData.data.user.machines;

export const selectUserBeans = (state: RootState) => state.appData.data.user.beans;


export default appDataSlice.reducer;