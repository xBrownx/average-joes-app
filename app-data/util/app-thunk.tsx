import {ThunkAction} from 'redux-thunk'
import { UnknownAction } from 'redux';
import { RootState } from "@/app-data/store/reducers";

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>