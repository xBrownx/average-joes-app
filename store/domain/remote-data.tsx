import { ServerMachine } from "@/store/domain/machine";
import { ServerBean } from "@/store/domain/bean";
import { Roaster } from "@/store/domain/roaster";

export interface RemoteData {
    machines: ServerMachine[],
    beans: ServerBean[],
    roasters: Roaster[],
}