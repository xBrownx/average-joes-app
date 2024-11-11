import { UserMachine, UserRecipe, PantryItem } from "@/domain";

export interface UserData {
    username: string,
    email: string,
    machines: UserMachine[],
    recipes: UserRecipe[],
    pantryItems: PantryItem[],
}