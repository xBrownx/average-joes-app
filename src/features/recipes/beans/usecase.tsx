import { Roaster, ServerBean, UserRecipe } from "@/domain";


export function roasterIdToRoaster(id: string, roasters: Roaster[]) {
    return roasters.find(roaster => roaster.id === id)
}

export function filterBlendsWithRoasterId(roasterId: string, blends: ServerBean[]) {
    return blends.filter(b => b.roasterId === roasterId)
}

export function blendIdToBlend(id: string, blends: ServerBean[]) {
    return blends.find(blend => blend.id === id)
}

export function findUserBean(id: string, userBeans: UserRecipe[]): UserRecipe | undefined {
    return userBeans.find((bean) => bean.id === id)
}

export function findServerBlendName(id: string, serverBeans: ServerBean[]): string {
    console.log(id);
    return serverBeans.find((bean) => bean.id === id)?.blendName?? 'none found'
}

export function findServerRoasterName(id: string, serverRoasters: Roaster[]): string {
    return serverRoasters.find(roaster => roaster.id === id)?.name?? 'none found'
}