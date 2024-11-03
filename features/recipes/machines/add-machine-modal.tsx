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
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addUserMachine } from "@/store/slice/local-data-slice";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserMachine } from "../../../store/domain";
import { serverMachinesToDropdown } from "../../../store/usecase";
import { selectRemoteMachines } from "@/store/slice/remote-data-slice";

type AddMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

type AddMachineModalState = {
    machinesDropdown: DropdownData[],
    modelsDropdown: DropdownData[],
    selectedMake: string,
    selectedModel: string,
    isMakeSelected: boolean,
    isModelSelected: boolean,
}

const initialModalState: AddMachineModalState = {
    machinesDropdown: [],
    modelsDropdown: [],
    selectedMake: '',
    selectedModel: '',
    isMakeSelected: false,
    isModelSelected: false,
}

type UpdateStateType = 'machinesDropdown' | 'modelsDropdown' | 'selectedMake' | 'selectedModel' | 'isMakeSelected' | 'isModelSelected';

export const AddMachineModal = ({isOpen, onClose, withInput, children, ...rest}: AddMachineModalProps) => {
    const dispatch = useAppDispatch();
    const machines = useAppSelector(selectRemoteMachines);
    const [modalState, setModalState] = useState<AddMachineModalState>(initialModalState)

    const updateState = (name: UpdateStateType, value: any) => {
        setModalState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        updateState('machinesDropdown', serverMachinesToDropdown(machines))
    }, [])

    const onMakeSelect = (text: string) => {
        const machine = machines.find(machine => machine.make === text);
        if (!machine) {
            updateState('isMakeSelected', false)
            return;
        }

        const modelsDropdown = machine.models.map(model => (
                {label: model.name, value: model.name}
            ));

        updateState('modelsDropdown', modelsDropdown);
        updateState('selectedMake', text);
        updateState('isMakeSelected', true);

    }

    const onModelSelect = (text: string) => {
        if (!text) return
        const make = machines.find(machine => machine.make === modalState.selectedMake);
        const model = make ? make.models.find(model => model.name === text) : null;

        if (!model) {
            updateState('isMakeSelected', false);
            updateState('isModelSelected', false);
            return;
        }
        updateState('selectedModel', text);
        updateState('isModelSelected', true);
    }

    const onSave = () => {
        if (!modalState.isModelSelected || !modalState.isMakeSelected) return;
        const make = machines.find(machine => machine.make === modalState.selectedMake);
        const model = make ? make.models.find(model => model.name === modalState.selectedModel) : null;
        if (!model || !make) return;

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
                                onPress={() => {
                                }}
                            />
                        </View>

                        <ThemedText
                            type={'default'}
                            style={styles.titleContainer}
                        >
                            Search our database or add your own!
                        </ThemedText>

                        <View style={styles.content}>
                            <DropdownComponent
                                placeholder={'Make'}
                                data={modalState.machinesDropdown}
                                onChange={(text) => onMakeSelect(text)}
                            />

                            {modalState.isMakeSelected &&
                                <DropdownComponent
                                    placeholder={'Model'}
                                    data={modalState.modelsDropdown}
                                    onChange={(text) => onModelSelect(text)}
                                />
                            }

                            <Button
                                title={'SAVE'}
                                color={colors.primary}
                                onPress={onSave}
                            />
                        </View>
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