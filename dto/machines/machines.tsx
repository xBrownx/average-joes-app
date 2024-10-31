import { DropdownData, Machine } from "@/types";

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
    return models.map(machine => machine.model);
}