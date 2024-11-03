import { Recipe } from "@/app-data/domain/recipe";

export interface Bean {
    id: string;
    blendName: string;
    origins: string;
    roastProfile: string;
    tastingNotes: string;
    recipe: Recipe;
    rating: number;
    buyLink: string;
}

export interface UserBean {

}