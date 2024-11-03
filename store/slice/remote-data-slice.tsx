import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RemoteData } from "@/store/domain/remote-data";
import { API_URL } from "@/store/util/constants";
import { GoogleSheetsResponseDto } from "@/store/dto/dto";
import { initEmptyRemoteData } from "@/store/util/use-init-empty-app-data";
import { dtoToServerBeans, dtoToServerMachines, dtoToServerRoasters } from "@/store/dto/transform";
import { RootState } from "@/store/reducers";

export const loadRemoteData = createAsyncThunk<RemoteData, void, { rejectValue: string }>(
    "appData/loadRemoteData",
    async (_, thunkAPI) => {
        try {
            const machinesResponse = await fetch(API_URL('machines'));
            const beansResponse = await fetch(API_URL('beans'));
            const roastersResponse = await fetch(API_URL('roasters'));

            const machinesDto = await machinesResponse.json();
            const beansDto: GoogleSheetsResponseDto = await beansResponse.json();
            const roasterDto: GoogleSheetsResponseDto = await roastersResponse.json();

            let serverData = initEmptyRemoteData();
            serverData.machines = dtoToServerMachines(machinesDto);
            serverData.beans = dtoToServerBeans(beansDto);
            serverData.roasters = dtoToServerRoasters(roasterDto);
            return serverData;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch server data.");
        }
    }
);

interface ServerDataState {
    data: RemoteData;
    loading: boolean;
    error: string | null;
}

const initialState: ServerDataState = {
    data: initEmptyRemoteData(),
    loading: false,
    error: null,
};

export const remoteDataSlice = createSlice({
    name: 'remote-data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRemoteData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadRemoteData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loadRemoteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
})

export const selectRemoteMachines = (state: RootState) => state.remoteData.data.machines;

export const selectRemoteBeans = (state: RootState) => state.remoteData.data.beans;

export const selectRemoteRoasters = (state: RootState) => state.remoteData.data.roasters;

export default remoteDataSlice.reducer;