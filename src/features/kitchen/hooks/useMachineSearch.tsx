import { useAppSelector } from "@/store";
import { selectRemoteMachineMake, selectRemoteMachineModel } from "@/store/slice/remote-data-slice";
import { DropdownData } from "@/components/dropdown";
import { remoteMachineMakeToDropdown, remoteMachineModelToDropdown } from "@/usecase";
import { useState } from "react";

interface MachineSearch {
    makeDropdown: DropdownData[],
    modelDropdown: DropdownData[],
    filterModels: (makeId: string) => void,
}

export function useMachineSearch(): MachineSearch {
    const machineMakes = useAppSelector(selectRemoteMachineMake);
    const machineModels = useAppSelector(selectRemoteMachineModel);
    const makeDropdown= remoteMachineMakeToDropdown(machineMakes)
    const [modelDropdown, setModelDropdown] = useState<DropdownData[]>([]);

    const filterModels = (makeId: string) => {
        const filteredModels = machineModels.filter(model => model.makeId === makeId);
        console.log(filteredModels);
        setModelDropdown(
            remoteMachineModelToDropdown(filteredModels)
        )
    }

    return {makeDropdown, modelDropdown, filterModels}
}