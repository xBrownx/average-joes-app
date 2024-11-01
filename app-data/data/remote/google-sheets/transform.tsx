import { MachineResponseDto } from "@/app-data/data/remote/google-sheets/dto";
import { Machine, MachineModel } from "@/types";

export function dtoToMachines(dto: MachineResponseDto): Machine[] {
    let machines: Machine[] = [];
    const keys: string[] = dto.values[0]
    const values: string[][] = dto.values.slice(1);
    const machineKeyPairArray =  values.map((val) => Object.assign({}, ...keys.map((k, i) =>
        ({[k]: val[i]}))))
    machineKeyPairArray.forEach(machine => {
        const model:MachineModel = {
            id: machine.id,
            name: machine.model,
            size: machine.size,
            portafilterSize: machine.portafilterSize,
            tamperSize: machine.tamperSize,
            dosingRingSize: machine.dosingRingSize,
        };
        let make = machines.find(element => element.make === machine.make);
        if(make) {
            make.models.push(model);
        } else {
            make = {
                id: machine.make,
                make: machine.make,
                models: [model]
            }
            machines.push(make)
        }
    })

    return machines;
}