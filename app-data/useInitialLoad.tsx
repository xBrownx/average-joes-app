import { AppData, Machine } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchMachines } from "@/api/google-sheets";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setAppData } from "@/app-data/app-data-slice";
import { APP_DATA } from "@/app-data/constants";


async function getAppData (): Promise<AppData | undefined> {
    try {
        const jsonValue = await AsyncStorage.getItem("app-data");
        return jsonValue != null ? JSON.parse(jsonValue.toString()) : undefined;
    } catch (e) {
        console.log('error fetching app data');
        return undefined;
    }
}

async function storeAppData(value: AppData) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("app-data", jsonValue);
    } catch (e) {
        // saving error
    }
}

async function initialLoadAsync() {
    console.log("initialLoadAsync");

    let appData = await getAppData().catch((err) => console.error(err));
    appData = appData ? appData : APP_DATA;

    let machines = await fetchMachines().catch((err) => console.error(err));
    appData.server.machines = machines ? machines as Machine[] : [];

    await storeAppData(appData);
    return Promise.resolve(appData)
}

export default function useInitialLoad(): boolean {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        initialLoadAsync()
            .then((data) => {
                dispatch(setAppData(data));
                setLoaded(true)
            })
            .catch((err) => console.error(err));
    }, [])


    return loaded

}