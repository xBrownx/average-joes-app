import { combineReducers } from "redux";
import remoteDataReducer from "@/store/slice/remote-data-slice";
import appDataReducer from "@/store/slice/local-data-slice";
import dialInReducer from "@/store/slice/dial-in-slice";
import shopifyReducer from '@/store/slice/shopify-slice';

export const rootReducer = combineReducers({
    remoteData: remoteDataReducer,
    localData: appDataReducer,
    dialIn: dialInReducer,
    shopify: shopifyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;