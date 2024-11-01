import { AppData } from "@/app-data/domain";

export const useInitEmptyAppData = (): AppData => {
    return {
        server: {
            beans: [],
            machines: []
        },
        user: {
            beans: [],
            email: "",
            machines: [],
            name: ""
        }
    }
}
