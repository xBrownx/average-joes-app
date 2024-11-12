import { PantryItem, Roaster, ServerBlend, ServerMachine, UserMachine, UserRecipe } from '@/domain';
import { DropdownData } from "@/components/dropdown";

export function serverMachinesToDropdown(machines: ServerMachine[]): DropdownData[] {
    return machines.map(machine => ({label: machine.make, value: machine.id}));
}

export function serverBlendsToDropdown(blends: ServerBlend[]): DropdownData[] {
    return blends.map(blend => ({label: blend.blendName, value: blend.id}));
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

export function userMachinesToDropdown(machines: UserMachine[]): DropdownData[] {
    return machines.map(machine => ({label: machine.model.name, value: machine.id}))
}