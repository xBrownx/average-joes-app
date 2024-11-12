import { Roaster, ServerBlend, UserRecipe } from "@/domain";


export function roasterIdToRoaster(id: string, roasters: Roaster[]) {
    return roasters.find(roaster => roaster.id === id)
}

export function filterBlendsWithRoasterId(roasterId: string, blends: ServerBlend[]) {
    return blends.filter(b => b.roasterId === roasterId)
}

export function blendIdToBlend(id: string, blends: ServerBlend[]) {
    return blends.find(blend => blend.id === id)
}

export function findUserRecipeWithId(id: string, userRecipes: UserRecipe[]): UserRecipe | undefined {
    return userRecipes.find((recipe) => recipe.id === id)
}

export function findServerBlendNameWithId(id: string, serverBlends: ServerBlend[]): string {
    console.log(id);
    return serverBlends.find((blend) => blend.id === id)?.blendName?? 'none found'
}

export function findServerRoasterNameWithId(id: string, serverRoasters: Roaster[]): string {
    return serverRoasters.find(roaster => roaster.id === id)?.name?? 'none found'
}
