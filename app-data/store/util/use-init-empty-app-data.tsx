import { AppData } from "../domain";
import { ServerData } from "@/app-data/store/domain/server-data";

export const useInitEmptyAppData = (): AppData => {
    return {
        server: {
            beans: [],
            machines: [],
            roasters: []
        },
        user: {
            beans: [],
            email: "",
            machines: [],
            name: ""
        }
    }
}

export const initEmptyServerData = (): ServerData => {
    return {
        machines: [],
        beans: [],
        roasters: []
    }
}
