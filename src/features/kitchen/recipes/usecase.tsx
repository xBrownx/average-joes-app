import { RemoteRoaster, RemoteBlend, UserRecipe, RemoteMachineModel } from "@/domain";
import { remoteMachineModelToDropdown } from "@/usecase";
import { DropdownData } from "@/components/dropdown";

export function filterModelsWithMakeId(id: string, models: RemoteMachineModel[]) {
    return models.filter(model => model.id === id);
}

export function filterModelsToDropdown(id: string, models: RemoteMachineModel[]): DropdownData[] {
    const filteredModels = models.filter(model => model.id === id);
    return remoteMachineModelToDropdown(filteredModels);
}

export function roasterIdToRoaster(id: string, roasters: RemoteRoaster[]) {
    return roasters.find(roaster => roaster.id === id)
}

export function filterBlendsWithRoasterId(roasterId: string, blends: RemoteBlend[]) {
    return blends.filter(b => b.roasterId === roasterId)
}

export function blendIdToBlend(id: string, blends: RemoteBlend[]) {
    return blends.find(blend => blend.id === id)
}

export function findUserRecipeWithId(id: string, userRecipes: UserRecipe[]): UserRecipe | undefined {
    return userRecipes.find((recipe) => recipe.id === id)
}

export function findServerBlendNameWithId(id: string, serverBlends: RemoteBlend[]): string {
    console.log(id);
    return serverBlends.find((blend) => blend.id === id)?.name?? 'none found'
}

export function findServerRoasterNameWithId(id: string, serverRoasters: RemoteRoaster[]): string {
    return serverRoasters.find(roaster => roaster.id === id)?.name?? 'none found'
}
