import { UserMachine, UserRecipe, PantryItem } from "@/domain";

export interface UserData {
    username: string,
    email: string,
    machines: UserMachine[],
    defaultMachine: UserMachine | undefined,
    recipes: UserRecipe[],
    pantryItems: PantryItem[],
}