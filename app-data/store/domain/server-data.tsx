import { ServerMachine } from "@/app-data/store/domain/machine";
import { Bean, ServerBean } from "@/app-data/store/domain/bean";
import { Roaster } from "@/app-data/store/domain/roaster";

export interface ServerData {
    machines: ServerMachine[],
    beans: ServerBean[],
    roasters: Roaster[],
}