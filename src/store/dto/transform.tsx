import { GoogleSheetsResponseDto } from "@/store/dto/dto";
import { MachineModel, Roaster, ServerBlend, ServerMachine } from "@/domain";


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

export function dtoToServerBlends(dto: GoogleSheetsResponseDto): ServerBlend[] {
    let blends: ServerBlend[] = [];
    const blendsKeyPairArray =  dtoToKeyPair(dto)

    blendsKeyPairArray.forEach(blend => {
        const serverBlend: ServerBlend = {
            id: blend.id,
            blendName: blend.blendName,
            roasterId: blend.roasterId,
            origins: blend.origins,
            tastingNotes: blend.tastingNotes,
            buyLink: blend.buyLink,
        };
        blends.push(serverBlend);

    })

    return blends;
}

export function dtoToServerRoasters(dto: GoogleSheetsResponseDto): Roaster[] {
    let roasters : Roaster[] = [];
    const roastersKeyPairArray =  dtoToKeyPair(dto)

    roastersKeyPairArray.forEach(roaster => {
        const serverRoaster: Roaster = {
            id: roaster.id,
            name: roaster.name,
            profile: roaster.profile,
        };
        roasters.push(serverRoaster);

    })

    return roasters;
}