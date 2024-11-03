import { Machine, UserMachine } from "@/app-data/domain/machine";
import { Bean, UserBean } from "@/app-data/domain/bean";
import { Roaster } from "@/app-data/domain/roaster";

export interface AppData {
    user: {
        'name': string,
        'email': string,
        'machines': UserMachine[],
        'beans': UserBean[],
    },
    server: {
        'machines': Machine[],
        'beans': Bean[],
        'roaster': Roaster[],
    }
}