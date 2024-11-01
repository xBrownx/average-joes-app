import { combineReducers, Middleware } from "redux";
import { RootState } from "./reducers";

export const localStorageMiddleware: Middleware<
    {},
    RootState
> = storeApi => next => action => {
    const result = next(action)
    const state = storeApi.getState();
    localStorage.setItem('app-data', JSON.stringify(state));
    return result;
};

export const reHydrateStore = () => {
    const appData = localStorage.getItem('app-data')
    if (appData) {
        return JSON.parse(appData); // re-hydrate the store
    }
};
