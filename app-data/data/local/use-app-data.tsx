import { AppData } from "@/app-data/domain";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { setAppData } from "@/store/app-data-slice";
import useFetchMachines from "@/app-data/data/remote/google-sheets/useFetchMachines";
import { APP_DATA } from "@/constants/constants";
import { loadLocalAppDataAsync, storeLocalAppDataAsync } from "./app-data";

export function useLoadAppData(): [boolean, AppData | undefined, Error | null]  {
    console.log('useLoadAppData');
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<AppData | undefined>(undefined);

    useEffect(() => {
        loadLocalAppDataAsync()
            .then((data) => {
                data ? setData(data) : setData(APP_DATA)
                setLoaded(true)
            })
            .catch(setError)
    }, []);

    return [loaded, data, error]
}

export function useStoreAppData(value: AppData) {
    console.log('useStoreAppData');
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        storeLocalAppDataAsync(value)
            .then(() => setLoaded(true))
            .catch(setError)
    });

    return [loaded, error]
}

export function useCreateAppData() {
    console.log('useCreateAppData');
    const appData = APP_DATA;
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        storeLocalAppDataAsync(appData)
            .then(() => setLoaded(true))
            .catch(setError)
    }, []);

    return [loaded, error]
}

export default function useInitialLoad(): boolean {
    console.log('useInitialLoad');
    const dispatch = useAppDispatch();
    const [loaded, setLoaded] = useState(false);

    const [ localAppDataLoaded, localAppData, localAppDataError ] = useLoadAppData();
    const [ fetchMachinesLoaded, machinesData, fetchMachinesError ] = useFetchMachines();

    useEffect(() => {
        if(localAppDataLoaded && localAppData && fetchMachinesLoaded) {
            console.log("app data loaded")
            localAppData.server.machines = machinesData;
            console.log(machinesData);
            dispatch(setAppData(localAppData));
            setLoaded(true)
        }

    }, [localAppDataLoaded, fetchMachinesLoaded])


    return loaded;

}