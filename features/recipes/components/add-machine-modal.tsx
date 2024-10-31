import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from "@/components/text/themed-text";
import { ThemedView } from "@/components/ThemedView";
import colors from "@/components/colors";
import React, { useEffect } from "react";
import { setCoffeeBeans } from "@/features/dial-in/store/dial-in-slice";
import { getAppData, storeDataString } from "@/util/local-storage";
import { fetchMachines, machineMakeToKeyValue } from "@/api/google-sheets";
import DropdownComponent from "@/components/dropdown/dropdown";
import { DropdownData, Machine } from "@/types";
import { machinesMake, machinesMakeModel, stringArrayToDropdown } from "@/dto/machines/machines";

type AddMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const AddMachineModal = ({isOpen, onClose, withInput, children, ...rest}: AddMachineModalProps) => {
    const [machineName, setMachineName] = React.useState<string>("");
    const [dbMachines, setDbMachines] = React.useState<Machine[] | undefined>([]);
    const [makeList, setMachineList] = React.useState<DropdownData[] | undefined>([]);
    const [modelList, setModelList] = React.useState<DropdownData[] | undefined>([]);

    useEffect(() => {
        getAppData().then((data) => {
            setDbMachines(data?.["db-machines"])
            const make = machinesMake(data?.["db-machines"])
            setMachineList(stringArrayToDropdown(make));
        })

    }, [])

    const showModels = () => {
        setModelList(
            stringArrayToDropdown(
                machinesMakeModel(dbMachines, machineName)
            )
        )
    }

    const onTextChange = (text: string) => {
        setMachineName(text);
        if (text !== "") {
            showModels()
        }
    }

    const saveMachine = () => {
        storeDataString('machine-name', machineName).then((data) => {
            onClose()
        });
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
            <View style={styles.modalOuter}>
                <View style={styles.modalInner}>
                    <DropdownComponent placeholder={'Make'} data={makeList} onChange={onTextChange} />
                    <DropdownComponent placeholder={'Model'} data={modelList} onChange={() => {}}/>
                    <Button title={'SAVE'} color={colors.primary} onPress={saveMachine} />
                </View>
            </View>
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