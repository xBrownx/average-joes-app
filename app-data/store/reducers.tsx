import { combineReducers } from "redux";
import appDataReducer from "@/app-data/store/slice/app-data-slice";
import dialInReducer from "@/app-data/store/slice/dial-in-slice";

export const rootReducer = combineReducers({
    appData: appDataReducer,
    dialIn: dialInReducer,
});

export type RootState = ReturnType<typeof rootReducer>;