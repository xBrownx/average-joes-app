import { Bean } from "@/app-data/store/domain/bean";

export interface Roaster {
    id: string,
    name: string,
    blends: Bean[]
}