import { ServerMachine } from "@/domain/machine";
import { ServerBean } from "@/domain/bean";
import { Roaster } from "@/domain/roaster";

export interface RemoteData {
    machines: ServerMachine[],
    beans: ServerBean[],
    roasters: Roaster[],
}