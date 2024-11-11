import { PantryItem, Roaster, ServerBean, ServerMachine, UserRecipe } from '../domain';
import { DropdownData } from "@/components/dropdown";

export function serverMachinesToDropdown(machines: ServerMachine[]): DropdownData[] {
    return machines.map(machine => ({label: machine.make, value: machine.id}));
}

export function serverBeansToDropdown(beans: ServerBean[]): DropdownData[] {
    return beans.map(bean => ({label: bean.blendName, value: bean.id}));
}

export function serverRoastersToDropdown(roasters: Roaster[]): DropdownData[] {
    return roasters.map(roaster => ({label: roaster.name, value: roaster.id}));
}

export function pantryItemsToDropdown(pantryItems: PantryItem[]): DropdownData[] {
    return pantryItems.map(pantryItem => ({label: pantryItem.blendName, value: pantryItem.id}));
}

export function userRecipesToDropdown(recipes: UserRecipe[]): DropdownData[] {
    return recipes.map(recipe => ({label: recipe.blendName, value: recipe.id}));
}
