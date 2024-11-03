import { Recipe } from "@/app-data/store/domain/recipe";

export interface ServerBean {
    id: string;
    blendName: string;
    roasterId: string;
    origins: string;
    tastingNotes: string;
    buyLink: string;
}

export interface Bean {
    id: string;
    blendName: string;
    roasterId: string;
    origins: string;
    tastingNotes: string;
    recipe: Recipe;
    rating: number;
    buyLink: string;
}

export interface UserBean {

}