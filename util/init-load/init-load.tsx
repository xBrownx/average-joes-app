import { fetchMachines, machineMakeToKeyValue } from "@/api/google-sheets";
import { getAppData, storeAppData, storeDataString } from "@/util/local-storage";
import { Machine } from "@/types";

async function loadMachines() {
    const appData = await getAppData();
    console.log('APP DATA LOADED')
    if(appData) {
        appData["db-machines"] = await fetchMachines() as Machine[];
    }
    console.log('MACHINES DATA LOADED')
    await storeAppData(appData)
    console.log('DATA STORED')
}

export function initialLoad() {
    loadMachines();
}