import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppData } from "@/types";

export const storeAppData = async (value: AppData | undefined) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("app-data", jsonValue);
    } catch (e) {
        // saving error
    }
}

export const getAppData = async (): Promise<AppData | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem("app-data");
        return jsonValue != null ? JSON.parse(jsonValue.toString()) : null;
    } catch (e) {
        console.log('error fetching app data');
    }
};

export const storeDataString = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

export const storeDataObject = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getDataString = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (e) {
        // error reading value
    }
};

export const getDataObject = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};

