import { UserMachine } from "@/app-data/store/domain/machine";
import { UserBean } from "@/app-data/store/domain/bean";

export interface UserData {
    name: string,
    email: string,
    machines: UserMachine[],
    beans: UserBean[],
}