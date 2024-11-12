import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/reducers";


export type DialInState = {
    beans: string;
    portafilter: string;
    muted: boolean;
}

const initialState: DialInState = {
    beans: '',
    portafilter: '',
    muted: false,
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
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.muted = action.payload;
        }
    }
});

export const { setCoffeeBeans, setPortafilter, setMuted } = dialInSlice.actions;

export const selectBeans= (state: RootState) => state.dialIn.beans;

export const selectPortafilter= (state: RootState) => state.dialIn.portafilter;

export const selectMuted = (state: RootState) => state.dialIn.muted;

export default dialInSlice.reducer;