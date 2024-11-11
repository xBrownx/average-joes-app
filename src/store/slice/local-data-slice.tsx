import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initEmptyUserData } from "@/store/util/use-init-empty-app-data";
import { UserData, UserRecipe, UserMachine, PantryItem } from "@/domain";
import { RootState } from "@/store/reducers";

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
        addUserRecipe: (state, action: PayloadAction<UserRecipe>) => {
            state.data.recipes = [...state.data.recipes, action.payload]
        },
        addUserPantryItem: (state, action: PayloadAction<PantryItem>) => {
            state.data.pantry = [...state.data.pantry, action.payload]
        },
    },
});

export const { setUserName, addUserMachine, addUserRecipe, addUserPantryItem } = localDataSlice.actions;

export const selectUser = (state: RootState) => state.localData.data.username;

export const selectUserMachines = (state: RootState) => state.localData.data.machines;

export const selectUserRecipes = (state: RootState) => state.localData.data.recipes;

export const selectUserPantryItems = (state: RootState) => state.localData.data.pantry;

export default localDataSlice.reducer;