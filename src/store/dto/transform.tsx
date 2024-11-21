import { GoogleSheetsResponseDto } from "@/store/dto/dto";
import { RemoteMachineMake, RemoteMachineModel, RemoteRoaster, RemoteBlend } from "@/domain";


function dtoToKeyValuePair(dto: GoogleSheetsResponseDto) {
    const keys: string[] = dto.values[0]
    const values: string[][] = dto.values.slice(1);
    return values.map((val) => Object.assign({}, ...keys.map((k, i) =>
        ({[k]: val[i]}))))
}

export function dtoToRemoteMachineMakeList(dto: GoogleSheetsResponseDto): RemoteMachineMake[] {
    let machineMakes: RemoteMachineMake[] = [];
    const keyValuePair = dtoToKeyValuePair(dto);

    keyValuePair.forEach(make => {
        const machineMake: RemoteMachineMake = {
            id: make.id,
            name: make.name,
        }
        machineMakes.push(machineMake);
    });

    return machineMakes;
}

export function dtoToRemoteMachineModelList(dto: GoogleSheetsResponseDto): RemoteMachineModel[] {
    let machineModels: RemoteMachineModel[] = [];
    const keyValuePair = dtoToKeyValuePair(dto);

    keyValuePair.forEach(model => {
        const machineModel: RemoteMachineModel = {
            id: model.id,
            name: model.name,
            makeId: model.makeId,
            size: model.size,
            portafilterSize: model.portafilterSize,
            tamperSize: model.tamperSize,
            dosingRingSize: model.dosingRingSize,
        }
        machineModels.push(machineModel);
    });

    return machineModels;
}

export function dtoToRemoteRoasterList(dto: GoogleSheetsResponseDto): RemoteRoaster[] {
    let roasters : RemoteRoaster[] = [];
    const roastersKeyPairArray =  dtoToKeyValuePair(dto)

    roastersKeyPairArray.forEach(roaster => {
        const serverRoaster: RemoteRoaster = {
            id: roaster.id,
            name: roaster.name,
            profile: roaster.profile,
        };
        roasters.push(serverRoaster);
    });

    return roasters;
}

export function dtoToServerBlends(dto: GoogleSheetsResponseDto): RemoteBlend[] {
    let blends: RemoteBlend[] = [];
    const blendsKeyPairArray =  dtoToKeyValuePair(dto)

    blendsKeyPairArray.forEach(blend => {
        const serverBlend: RemoteBlend = {
            id: blend.id,
            name: blend.name,
            roasterId: blend.roasterId,
            origins: blend.origins,
            tastingNotes: blend.tastingNotes,
            buyLink: blend.buyLink,
        };
        blends.push(serverBlend);
    });



    return blends;
}

