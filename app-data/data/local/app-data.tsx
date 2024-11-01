import { AppData } from "@/app-data/domain";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadLocalAppDataAsync (): Promise<AppData | undefined> {
    try {
        const jsonValue = await AsyncStorage.getItem("app-data");
        return jsonValue != null ? JSON.parse(jsonValue.toString()) : undefined;
    } catch (e) {
        console.error('error fetching app data', e);
        return undefined;
    }
}

export async function storeLocalAppDataAsync(value: AppData) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("app-data", jsonValue);
    } catch (e) {
        console.error('error fetching app data', e);
    }
}