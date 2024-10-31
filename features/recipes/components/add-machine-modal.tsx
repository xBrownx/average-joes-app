import {
    Button,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet,
    TextInput,
    Touchable, TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import DropdownComponent from "@/components/dropdown/dropdown";
import { DropdownData, Machine } from "@/types";
import { machinesMake, machinesMakeModel, stringArrayToDropdown } from "@/dto/machines/machines";
import { useAppSelector } from "@/store";
import { selectAppData } from "@/app-data/app-data-slice";

type AddMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const AddMachineModal = ({isOpen, onClose, withInput, children, ...rest}: AddMachineModalProps) => {
    const [machines, setMachines] = useState<Machine[] | undefined>([])
    const [modelList, setModelList] = React.useState<DropdownData[] | undefined>([]);
    const [selectedMake, setSelectedMake] = React.useState('')
    const [makeList, setMakeList] = useState<DropdownData[] | undefined>([])

    const machineList = useAppSelector(selectAppData);

    const showModels = () => {
        setModelList(
            stringArrayToDropdown(
                machinesMakeModel(machines, selectedMake)
            )
        )
    }

    const onTextChange = (text: string) => {
        setSelectedMake(text);
        if (text !== "") {
            showModels()
        }
    }

    useEffect(() => {
        console.log(machineList.server.machines);
        setMachines(machineList.server.machines)
        setMakeList(stringArrayToDropdown(machinesMake(machineList.server.machines)));
    }, [])

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            style={styles.container}
            {...rest}
        >
            <TouchableOpacity style={styles.modalOuter} onPress={onClose}>
                <TouchableWithoutFeedback>
                <View style={styles.modalInner}>
                    <DropdownComponent placeholder={'Make'} data={makeList} onChange={onTextChange} />
                    <DropdownComponent placeholder={'Model'} data={modelList} onChange={() => {}}/>
                    <Button title={'SAVE'} color={colors.primary} onPress={() => {}} />
                </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </RNModal>
    );
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
    input: {
        height: 40,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
    },
});