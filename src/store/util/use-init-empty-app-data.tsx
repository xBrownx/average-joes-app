import { UserData } from "../../domain";
import { RemoteData } from "@/domain/remote-data";

export const initEmptyUserData = (): UserData => {
    return {
        recipes: [],
        email: "",
        machines: [],
        username: "",
        pantry: []
    }
}

export const initEmptyRemoteData = (): RemoteData => {
    return {
        machines: [],
        beans: [],
        roasters: []
    }
}
