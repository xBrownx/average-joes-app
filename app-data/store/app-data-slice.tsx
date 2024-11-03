import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useInitEmptyAppData } from "@/app-data/util/use-init-empty-app-data";
import { AppData, Machine, UserMachine } from "@/app-data/domain";
import { RootState } from "@/app-data/store/reducers";
import { API_URL } from "@/app-data/store/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromLocalStorage = createAsyncThunk<AppData, void, { rejectValue: string }>(
    "appData/loadFromLocalStorage",
    async (_, thunkAPI) => {
        try {
            const jsonValue = await AsyncStorage.getItem("app-data");
            return jsonValue != null ? JSON.parse(jsonValue.toString()) : undefined;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch local app data.");
        }
    }
);

export const loadRemoteMachines = createAsyncThunk<string[], void, { rejectValue: string }>(
    "appData/loadFromLocalStorage",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(API_URL('machines'));
            const data = await response.json();
            const issues = data.map((issue: { title: string }) => issue.title);
            return issues;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch issues.");
        }
    }
);

interface AppDataState {
    appData: AppData;
    loading: boolean;
    error: string | null;
}

const initialState: AppDataState = {
    appData: useInitEmptyAppData(),
    loading: false,
    error: null,
};

export const appDataSlice = createSlice({
    name: 'app-data',
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            state.appData.server = action.payload.server;
            state.appData.user = action.payload.user;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.appData.user.name = action.payload;
        },
        setServerMachines: (state, action: PayloadAction<Machine[]>) => {
            state.appData.server.machines = action.payload;
        },
        addUserMachine: (state, action: PayloadAction<UserMachine>) => {
            state.appData.user.machines = [...state.appData.user.machines, action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFromLocalStorage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadFromLocalStorage.fulfilled, (state, action) => {
                state.loading = false;
                state.appData = action.payload;
            })
            .addCase(loadFromLocalStorage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setAppData, setUserName, setServerMachines, addUserMachine } = appDataSlice.actions;

export const selectAppData = (state: RootState) => state.appData;

export const selectServerMachines = (state: RootState) => state.appData.appData.server.machines;

export const selectUserMachines = (state: RootState) => state.appData.appData.user.machines;

export default appDataSlice.reducer;