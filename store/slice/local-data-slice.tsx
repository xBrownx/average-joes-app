import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initEmptyUserData } from "@/store/util/use-init-empty-app-data";
import { UserData, UserBean, UserMachine } from "../domain";
import { RootState } from "@/store/reducers";
import { Pantry } from "@/store/domain/pantry";

interface UserDataState {
    data: UserData;
    loading: boolean;
    error: string | null;
}

const initialState: UserDataState = {
    data: initEmptyUserData(),
    loading: false,
    error: null,
};

export const localDataSlice = createSlice({
    name: 'app-data',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.data.username = action.payload;
        },
        addUserMachine: (state, action: PayloadAction<UserMachine>) => {
            state.data.machines = [...state.data.machines, action.payload]
        },
        addUserBean: (state, action: PayloadAction<UserBean>) => {
            state.data.beans = [...state.data.beans, action.payload]
        },
        addUserPantry: (state, action: PayloadAction<Pantry>) => {
            state.data.pantry = [...state.data.pantry, action.payload]
        },
    },
});

export const { setUserName, addUserMachine, addUserBean } = localDataSlice.actions;

export const selectUser = (state: RootState) => state.localData.data.username;

export const selectAppData = (state: RootState) => state.localData.data;

export const selectUserMachines = (state: RootState) => state.localData.data.machines;

export const selectUserBeans = (state: RootState) => state.localData.data.beans;

export const selectUserPantry = (state: RootState) => state.localData.data.pantry;


export default localDataSlice.reducer;