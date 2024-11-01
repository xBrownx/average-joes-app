import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "@/store/app-data-slice";
import dialInReducer from './dial-in-slice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        appData: appDataReducer,
        dialIn: dialInReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;