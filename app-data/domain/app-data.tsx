import { Machine, UserMachine } from "@/app-data/domain/machine";
import { Bean } from "@/app-data/domain/bean";

export interface AppData {
    user: {
        'name': string,
        'email': string,
        'machines': UserMachine[],
        'beans': Bean[],
    },
    server: {
        'machines': Machine[],
        'beans': Bean[],
    }
}