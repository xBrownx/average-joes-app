import { configureStore } from "@reduxjs/toolkit";
import dialInReducer from './dial-in-slice';

const store = configureStore({
    reducer: {
        dialIn: dialInReducer,
    }
});

export default store;