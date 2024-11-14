export interface MachineModel {
    id: string;
    name: string;
    size?: string;
    portafilterSize: string;
    tamperSize?: string;
    dosingRingSize?: string;
}

export interface RemoteMachineMake {
    id: string;
    name: string;
}

export interface RemoteMachineModel {
    id: string;
    name: string;
    makeId: string;
    size?: string;
    portafilterSize: string;
    tamperSize?: string;
    dosingRingSize?: string;
}

export interface UserMachine {
    id: string;
    make: string;
    model: MachineModel;
}