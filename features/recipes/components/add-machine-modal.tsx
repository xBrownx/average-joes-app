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
import DropdownComponent, { DropdownData } from "@/components/dropdown/dropdown";
import { useAppDispatch, useAppSelector } from "@/app-data/store/store";
import { selectAppData, addUserMachine, selectServerMachines } from "@/app-data/store/app-data-slice";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserMachine } from "@/app-data/domain";

type AddMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const AddMachineModal = ({isOpen, onClose, withInput, children, ...rest}: AddMachineModalProps) => {
    const dispatch = useAppDispatch();
    const [modelsDropdown, setModelsDropdown] = useState<DropdownData[]>([]);
    const [makeSelected, setMakeSelected] = useState(false);
    const [selectedMake, setSelectedMake] = useState('')
    const [modelSelected, setModelSelected] = useState(false)
    const [selectedModel, setSelectedModel] = useState('')
    const machines = useAppSelector(selectServerMachines);
    const machinesDropdown: DropdownData[] = machines.map(machine => ({label: machine.make, value: machine.make}))

    const onMakeSelect = (text: string) => {
        const machine = machines.find(machine => machine.make === text);
        if(!machine) {
            setMakeSelected(false);
            return;
        }
        setModelsDropdown(
            machine.models.map(model => (
                {label: model.name, value: model.name}
            ))
        );
        setSelectedMake(text);
        setMakeSelected(true);
    }

    const onModelSelect = (text: string) => {
        if(!text) return
        const make = machines.find(machine => machine.make === selectedMake);
        const model = make ? make.models.find(model => model.name === text) : null;

        if(!model) {
            setMakeSelected(false);
            setModelSelected(false)
            return;
        }
        setSelectedModel(text);
        setModelSelected(true);
    }

    const onSave = () => {
        if(!modelSelected) return;
        const make = machines.find(machine => machine.make === selectedMake);
        const model = make ? make.models.find(model => model.name === selectedModel) : null;
        if(!model || !make) return;

        const userMachine: UserMachine = {
            id: make.make,
            make: make.make,
            model: model
        }

        dispatch(addUserMachine(userMachine))
        onClose()
    }

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
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>Add Your Machine</ThemedText>
                        <Ionicons.Button
                            name="add"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.tertiary}
                            onPress={() => {}}
                        />
                    </View>

                    <ThemedText type={'default'} style={styles.titleContainer}>Search our database or add your own!</ThemedText>
                    <DropdownComponent placeholder={'Make'} data={machinesDropdown} onChange={(text) => onMakeSelect(text)} />
                    {makeSelected && <DropdownComponent placeholder={'Model'} data={modelsDropdown} onChange={(text) => onModelSelect(text)} />}
                    <Button title={'SAVE'} color={colors.primary} onPress={onSave} />
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
    input: {
        height: 40,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
    },
});