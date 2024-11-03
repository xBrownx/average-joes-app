import {
    Button,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import DropdownComponent, { DropdownData } from "@/components/dropdown/dropdown";
import { useAppDispatch, useAppSelector } from "@/app-data/store/store";
import {
    selectAppData,
    addUserBean,
    selectServerBeans,
    selectServerMachines, selectServerRosters, addUserMachine
} from "@/app-data/store/slice/app-data-slice";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserBean, UserMachine } from "@/app-data/store/domain";
import { serverBeansToDropdown, serverMachinesToDropdown, serverRoastersToDropdown } from "@/app-data/store/use-case";
import { text } from "node:stream/consumers";

type AddBeanModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

type AddBeanModalState = {
    roastersDropdown: DropdownData[],
    blendDropdown: DropdownData[],
    selectedRoaster: string,
    isRoasterSelected: boolean,
    selectedBlend: string,
    isBlendSelected: boolean,
}

const initialModalState: AddBeanModalState = {
    roastersDropdown: [],
    blendDropdown: [],
    selectedRoaster: '',
    isRoasterSelected: false,
    selectedBlend: '',
    isBlendSelected: false,
}

type UpdateStateType = 'roastersDropdown' | 'blendDropdown' | 'selectedRoaster' | 'isRoasterSelected' | 'selectedBlend' | 'isBlendSelected';

export const AddBeanModal = ({isOpen, onClose, withInput, children, ...rest}: AddBeanModalProps) => {
    const dispatch = useAppDispatch();
    const roasters = useAppSelector(selectServerRosters);
    const beans = useAppSelector(selectServerBeans);
    const [modalState, setModalState] = useState<AddBeanModalState>(initialModalState);

    const updateState = (name: UpdateStateType, value: any) => {
        setModalState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        updateState('roastersDropdown', serverRoastersToDropdown(roasters))
    }, [])

    const onRoasterSelect = (text: string) => {
        const roaster = roasters.find(roaster => roaster.name === text);
        if (!roaster) {
            updateState('isRoasterSelected', false)
            return;
        }
        const blends = beans.filter(blend => blend.roasterId === roaster.id)

        updateState('blendDropdown', serverBeansToDropdown(blends));
        updateState('selectedRoaster', text);
        updateState('isRoasterSelected', true);
    };

    const onBlendSelected = (text: string) => {
        if (!text) return
        const blend = beans.find(bean => bean.blendName === text);

        if (!blend) {
            updateState('isBlendSelected', false);
            return;
        }
        updateState('selectedBlend', text);
        updateState('isBlendSelected', true);
    }

    const onSave = () => {
        if (!modalState.isBlendSelected || !modalState.isRoasterSelected) return;
        const blend = beans.find(blend => blend.blendName === modalState.selectedBlend);
        if (!blend) return;

        const userBean: UserBean = {
            id: blend.id,
            blendName: blend.blendName,
        }

        dispatch(addUserBean(userBean))
        onClose()
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: "space-between",
    },
    stepContainer: {
        gap: 16,
        marginBottom: 16,
    },
    reactLogo: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        width: '100%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    content: {
        gap: 16,
    },

    input: {
        height: 40,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
    },
});