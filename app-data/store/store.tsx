import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { localStorageMiddleware, reHydrateStore } from "./middleware";
import { rootReducer, RootState } from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// store.subscribe(() => saveState(REDUX_KEY, store.getState())); // saveState: JSON.stringify() and saves store to localStorage
// https://www.dhiwise.com/post/redux-functionality-with-custom-middleware-for-async-actions
export default store;