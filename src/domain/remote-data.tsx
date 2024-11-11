import { ServerMachine, ServerBlend, Roaster } from "@/domain";

export interface RemoteData {
    machines: ServerMachine[],
    blends: ServerBlend[],
    roasters: Roaster[],
}