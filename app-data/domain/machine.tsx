export interface MachineModel {
    id: string;
    name: string;
    size: string;
    portafilterSize: string;
    tamperSize: string;
    dosingRingSize: string;
}

export interface Machine {
    id: string;
    make: string;
    models: MachineModel[];
}

export interface UserMachine {
    id: string;
    make: string;
    model: MachineModel;
}