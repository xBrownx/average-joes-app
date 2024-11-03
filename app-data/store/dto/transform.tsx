import { GoogleSheetsResponseDto } from "@/app-data/store/dto/dto";
import { MachineModel, ServerBean, ServerMachine } from "@/app-data/store/domain";


function dtoToKeyPair(dto: GoogleSheetsResponseDto) {
    const keys: string[] = dto.values[0]
    const values: string[][] = dto.values.slice(1);
    return values.map((val) => Object.assign({}, ...keys.map((k, i) =>
        ({[k]: val[i]}))))
}

export function dtoToServerMachines(dto: GoogleSheetsResponseDto): ServerMachine[] {
    let machines: ServerMachine[] = [];
    const machineKeyPairArray =  dtoToKeyPair(dto)

    machineKeyPairArray.forEach(machine => {
        const model: MachineModel = {
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

export function dtoToServerBeans(dto: GoogleSheetsResponseDto): ServerBean[] {
    let beans: ServerBean[] = [];
    const beansKeyPairArray =  dtoToKeyPair(dto)

    beansKeyPairArray.forEach(bean => {
        const serverBean: ServerBean = {
            id: bean.id,
            blendName: bean.blendName,
            roasterId: bean.roasterId,
            origins: bean.origins,
            tastingNotes: bean.tastingNotes,
            buyLink: bean.buyLink,
        };
        beans.push(serverBean);

    })

    return beans;
}