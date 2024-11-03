import { Recipe } from "@/store/domain/recipe";

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

export interface  UserBean {
    id: string;
    blendName: string;
    roasterId: string;
    origins: string;
    tastingNotes: string;
    recipe: Recipe;
    rating: number;
    buyLink: string;
    roastDate: string;
}