import { DropdownData } from "@/components/dropdown";
import { useAppSelector } from "@/store";
import { selectRemoteBlends, selectRemoteRoasters } from "@/store/slice/remote-data-slice";
import { remoteBlendsToDropdown, remoteRoastersToDropdown } from "@/usecase";
import { useState } from "react";
import { RemoteBlend, RemoteRoaster } from "@/domain";

interface BlendSearch {
    roasterDropdown: DropdownData[],
    blendDropdown: DropdownData[],
    filterBlends: (makeId: string) => void,
    getRoasterWithId: (roasterId: string) => RemoteRoaster | undefined,
    getBlendWithId: (blendId: string) => RemoteBlend | undefined,
}

export function useBlendSearch(): BlendSearch {
    const roasters = useAppSelector(selectRemoteRoasters);
    const blends = useAppSelector(selectRemoteBlends);
    const roasterDropdown = remoteRoastersToDropdown(roasters);
    const [blendDropdown, setBlendDropdown] = useState<DropdownData[]>([]);

    const filterBlends = (roasterId: string) => {
        const filteredBlends = blends.filter(blend => blend.roasterId === roasterId);
        setBlendDropdown(
            remoteBlendsToDropdown(filteredBlends)
        );
    };

    const getRoasterWithId = (roasterId: string) => {
        return roasters.find(roaster => roaster.id === roasterId);
    }

    const getBlendWithId = (blendId: string) => {
        return blends.find(blend => blend.id === blendId);
    }

    return {roasterDropdown, blendDropdown, filterBlends, getRoasterWithId, getBlendWithId};
}