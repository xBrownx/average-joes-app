import { Bean } from "@/app-data/domain/bean";

export interface Roaster {
    id: string,
    name: string,
    blends: Bean[]
}