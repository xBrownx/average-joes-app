import { DropdownData, Machine } from "@/types";

export interface MachineResponseDto {
    range: string;
    majorDimension: string;
    values: string[][];
}

export interface BeanDto {
    id: string;
}


export function machinesMake(machines: Machine[] | undefined): string[] {
    if (!machines) return []
    const arr = machines.map(machine => machine.make)
    return [...new Set(arr)];
}

export function stringArrayToDropdown(array: string[] | undefined): DropdownData[] {
    if (!array) return []
    return array.map(value => ({ label: value, value: value }));
}

export function machinesMakeModel(machines: Machine[] | undefined, make: string): string[] {
    if (!machines) return []
    const models = machines.filter(machine => machine.make === make);
    return [] //models.map(machine => machine.models);
}

export function machineMakeToKeyValue(machines: Machine[] | undefined): DropdownData[] | undefined {
    if (!machines) return undefined

    let uniqueMake = machines.map(machine => machine.make)
    uniqueMake = [...new Set(uniqueMake)];

    return uniqueMake.map(machine => {
        return {label: machine, value: machine};
    })
}