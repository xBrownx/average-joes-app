import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export type ScreenParams = {
    enterDir: 'left' | 'right'
    exitDir: 'left' | 'right'
}

export type RootStackParamList = {
   home: ScreenParams;
   brew: ScreenParams;
   'dial-in': ScreenParams;
   pantry: ScreenParams;
   learn: ScreenParams;
   shop: ScreenParams;

};
export interface HomeProps extends NativeStackScreenProps<RootStackParamList, 'home'> {}
export interface BrewProps extends NativeStackScreenProps<RootStackParamList, 'brew'> {}
export interface DialInProps extends NativeStackScreenProps<RootStackParamList, 'dial-in'> {}
export interface PantryProps extends NativeStackScreenProps<RootStackParamList, 'pantry'> {}
export interface LearnProps extends NativeStackScreenProps<RootStackParamList, 'learn'> {}
export interface ShopProps extends NativeStackScreenProps<RootStackParamList, 'shop'> {}