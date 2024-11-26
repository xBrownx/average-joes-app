import { UserMachine } from "@/domain";

export function machineIdToUserMachine(id: string, userMachines: UserMachine[]) {
    return userMachines.find(machine => machine.id === id);
}