

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

export interface Bean {

}

export interface AppData {
    'user': {
        'name': string,
        'email': string,
        'machines': Machine[],
        'beans': Bean[],
    },
    server: {
        'machines': Machine[],
        'beans': Bean[],
    }
}