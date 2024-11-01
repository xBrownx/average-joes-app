import { AppData } from "@/app-data/domain";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app-data/store/store";
import { selectAppData, setAppData } from "@/app-data/store/app-data-slice";
import useFetchMachines from "@/app-data/data/remote/google-sheets/useFetchMachines";

import { loadLocalAppDataAsync, storeLocalAppDataAsync } from "./app-data";
import { useInitEmptyAppData } from "@/app-data/util/use-init-empty-app-data";

function useLoadAppData(): [boolean, AppData | undefined, Error | null]  {
    console.log('useLoadAppData');
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<AppData | undefined>(undefined);

    useEffect(() => {
        loadLocalAppDataAsync()
            .then((data) => {
                console.log('useLoadAppData', data!!.user.machines)
                setData(data);
                setLoaded(true)
            })
            .catch(setError)
    }, []);

    return [loaded, data, error]
}

export function useSaveAppData() {
    console.log('useSaveAppData');
    const appData = useAppSelector(selectAppData);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log('....................useSaveAppData saving...');
        console.log(appData.user.machines)
        storeLocalAppDataAsync(appData)
            .then(() => {
                setLoaded(true)
                loadLocalAppDataAsync()
                    .then((data) => console.log('useSaveAppData useLoadAppData', data!!.user.machines))
                    .catch(setError)
            })
            .catch(setError)
    }, [appData]);

    return [loaded, error]
}


export function useInitialLoad(): [boolean, Error | null] {
    console.log('useInitialLoad');
    const dispatch = useAppDispatch();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [ localAppDataLoaded, localAppData] = useLoadAppData();
    const [ fetchMachinesLoaded, machinesData] = useFetchMachines();

    useEffect(() => {
        if(localAppDataLoaded && fetchMachinesLoaded) {
            let newLocalAppData = localAppData ? localAppData : useInitEmptyAppData();
            console.log(newLocalAppData.user.machines);
            newLocalAppData.server.machines = machinesData;
            dispatch(setAppData(newLocalAppData));
            storeLocalAppDataAsync(newLocalAppData)
                .then(() => setLoaded(true))
                .catch(setError)
        }

    }, [localAppDataLoaded, fetchMachinesLoaded]);

    return [loaded, error];
}
