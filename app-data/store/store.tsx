import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer, RootState } from "./reducers";
import { loadLocalAppDataAsync } from "@/app-data/data/local/app-data";

const store = configureStore({
    reducer: rootReducer,
    preloadedState: ,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// store.subscribe(() => saveState(REDUX_KEY, store.getState())); // saveState: JSON.stringify() and saves store to localStorage
// https://www.dhiwise.com/post/redux-functionality-with-custom-middleware-for-async-actions
export default store;