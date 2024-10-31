

export interface DropdownData {
    label: string;
    value: string;
}

export interface Machine {
    make: string;
    model: string;
    size: string;
    portafilterSize: string;
    tamperSize: string;
    dosingRingSize: string;
}

export interface AppData {
    'user-name': string;
    'user-machines': [];
    'db-machines': Machine[]
}