import {
    PantryItem,
    RemoteRoaster,
    RemoteBlend,
    UserMachine,
    UserRecipe,
    RemoteMachineMake,
    RemoteMachineModel
} from '@/domain';
import { DropdownData } from "@/components/dropdown";

export function remoteMachineMakeToDropdown(makes: RemoteMachineMake[]): DropdownData[] {
    return makes.map(machine => ({label: machine.name, value: machine.id}));
}

export function remoteMachineModelToDropdown(models: RemoteMachineModel[]): DropdownData[] {
    return models.map(model => ({label: model.name, value: model.id}));
}

export function remoteBlendsToDropdown(blends: RemoteBlend[]): DropdownData[] {
    return blends.map(blend => ({label: blend.name, value: blend.id}));
}

export function remoteRoastersToDropdown(roasters: RemoteRoaster[]): DropdownData[] {
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