import { RemoteBlend, RemoteRoaster, RemoteMachineMake, RemoteMachineModel } from "@/domain";

export interface RemoteData {
    machineMakes: RemoteMachineMake[],
    machineModels: RemoteMachineModel[],
    roasters: RemoteRoaster[],
    blends: RemoteBlend[],

}