import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RemoteData } from "@/domain/remote-data";
import { API_URL } from "@/store/util/constants";
import { GoogleSheetsResponseDto } from "@/store/dto/dto";
import { initEmptyRemoteData } from "@/store/util/use-init-empty-app-data";
import {
    dtoToServerBlends,
    dtoToRemoteMachineMakeList,
    dtoToRemoteRoasterList,
    dtoToRemoteMachineModelList
} from "@/store/dto/transform";
import { RootState } from "@/store/reducers";

export const loadRemoteData = createAsyncThunk<RemoteData, void, { rejectValue: string }>(
    "appData/loadRemoteData",
    async (_, thunkAPI) => {
        try {
            const makeResponse = await fetch(API_URL('machine-make'));
            const modelResponse = await fetch(API_URL('machine-model'));
            const roasterResponse = await fetch(API_URL('roasters'));
            const blendResponse = await fetch(API_URL('blends'));

            const makeDto: GoogleSheetsResponseDto = await makeResponse.json();
            const modelDto: GoogleSheetsResponseDto = await modelResponse.json();
            const roasterDto: GoogleSheetsResponseDto = await roasterResponse.json();
            const blendDto: GoogleSheetsResponseDto = await blendResponse.json();

            let serverData = initEmptyRemoteData();
            serverData.machineMakes = dtoToRemoteMachineMakeList(makeDto);
            serverData.machineModels = dtoToRemoteMachineModelList(modelDto)
            serverData.roasters = dtoToRemoteRoasterList(roasterDto);
            serverData.blends = dtoToServerBlends(blendDto);

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

export const selectRemoteMachineMake = (state: RootState) => state.remoteData.data.machineMakes;
export const selectRemoteMachineModel = (state: RootState) => state.remoteData.data.machineModels;
export const selectRemoteRoasters = (state: RootState) => state.remoteData.data.roasters;
export const selectRemoteBlends = (state: RootState) => state.remoteData.data.blends;



export default remoteDataSlice.reducer;