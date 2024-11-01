

export interface DropdownData {
    label: string;
    value: string;
}

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

export interface Bean {
    id: string;
}

export interface UserMachine {
    id: string;
    make: string;
    model: MachineModel;
}

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