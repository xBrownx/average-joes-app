import { UserMachine, UserBean, PantryItem } from "@/domain";

export interface UserData {
    username: string,
    email: string,
    machines: UserMachine[],
    beans: UserBean[],
    pantry: PantryItem[],
}