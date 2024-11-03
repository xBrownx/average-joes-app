import { UserData } from "@/app-data/store/domain/user-data";
import { ServerData } from "@/app-data/store/domain/server-data";

export interface AppData {
    user: UserData,
    server: ServerData
}