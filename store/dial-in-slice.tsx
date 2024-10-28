import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

export const dialInSlice = createSlice({
    name: 'dial-in',
    initialState,
    reducers: {
        setCoffeeBeans: () => {},
        setPortafilter: () => {}
    }
});

const { setCoffeeBeans, setPortafilter } = dialInSlice.actions;

export const DialInActions = {
    setCoffeeBeans,
    setPortafilter,
}

export default dialInSlice.reducer;