import { Roaster, ServerBean, ServerMachine } from "@/store/domain";
import { DropdownData } from "@/components/dropdown";

export function serverMachinesToDropdown(machines: ServerMachine[]): DropdownData[] {
    return machines.map(machine => ({label: machine.make, value: machine.id}));
}

export function serverBeansToDropdown(beans: ServerBean[]): DropdownData[] {
    return beans.map(bean => ({label: bean.blendName, value: bean.id}));
}

export function serverRoastersToDropdown(roasters: Roaster[]): DropdownData[] {
    return roasters.map(roaster => ({label: roaster.name, value: roaster.id}));
}
