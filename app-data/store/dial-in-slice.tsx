import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app-data/store/store";

export type DialInState = {
    beans: string;
    portafilter: string;
}

const initialState: DialInState = {
    beans: '',
    portafilter: '',
}

export const dialInSlice = createSlice({
    name: 'dial-in',
    initialState,
    reducers: {
        setCoffeeBeans: (state, action: PayloadAction<string>) => {
            state.beans = action.payload;
        },
        setPortafilter: (state, action: PayloadAction<string>) => {
            state.portafilter = action.payload;
        },
    }
});

export const { setCoffeeBeans, setPortafilter } = dialInSlice.actions;

export const selectBeans= (state: RootState) => state.dialIn.beans;

export const selectPortafilter= (state: RootState) => state.dialIn.portafilter;

export default dialInSlice.reducer;