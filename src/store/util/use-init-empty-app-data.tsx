import { UserData } from '@/domain';
import { RemoteData } from "@/domain/remote-data";

export const initEmptyUserData = (): UserData => {
    return {
        recipes: [],
        email: "",
        machines: [],
        username: "",
        pantryItems: []
    }
}

export const initEmptyRemoteData = (): RemoteData => {
    return {
        machineMakes: [],
        machineModels: [],
        blends: [],
        roasters: []
    }
}
