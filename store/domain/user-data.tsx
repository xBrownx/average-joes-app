import { UserMachine } from "@/store/domain/machine";
import { UserBean } from "@/store/domain/bean";
import { Pantry } from "@/store/domain/pantry";

export interface UserData {
    username: string,
    email: string,
    machines: UserMachine[],
    beans: UserBean[],
    pantry: Pantry[],
}