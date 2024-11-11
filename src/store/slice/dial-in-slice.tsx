import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/reducers";

export type DialInState = {
    recipeId: string;
    pantryItemId: string;
    machineId: string;
    portafilter: string;
}

const initialState: DialInState = {
    recipeId: '',
    pantryItemId: '',
    machineId: '',
    portafilter: '',
}

export const dialInSlice = createSlice({
    name: 'dial-in',
    initialState,
    reducers: {
        setRecipeId: (state, action: PayloadAction<string>) => {
            state.recipeId = action.payload;
        },
        setPantryItemId: (state, action: PayloadAction<string>) => {
            state.pantryItemId = action.payload;
        },
        setMachineId: (state, action: PayloadAction<string>) => {
            state.machineId = action.payload;
        },
        setPortafilter: (state, action: PayloadAction<string>) => {
            state.portafilter = action.payload;
        },
    }
});

export const { setRecipeId, setPantryItemId, setMachineId, setPortafilter } = dialInSlice.actions;

export const selectRecipeId= (state: RootState) => state.dialIn.recipeId;

export const selectPantryItemId= (state: RootState) => state.dialIn.pantryItemId;

export const selectMachineId= (state: RootState) => state.dialIn.machineId;

export const selectPortafilter= (state: RootState) => state.dialIn.portafilter;

export default dialInSlice.reducer;