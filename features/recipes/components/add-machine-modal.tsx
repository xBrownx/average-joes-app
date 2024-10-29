import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from "@/components/text/themed-text";
import { ThemedView } from "@/components/ThemedView";
import colors from "@/components/colors";
import React from "react";
import { setCoffeeBeans } from "@/features/dial-in/store/dial-in-slice";
import { storeDataString } from "@/util/local-storage";

type AddMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const AddMachineModal = ({isOpen, onClose, withInput, children, ...rest}: AddMachineModalProps) => {
    const [machineName, setMachineName] = React.useState<string>("");
    const onTextChange = (text: string) => {
        setMachineName(text);
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
            {...rest}
        >
            <View style={styles.modalOuter}>
                <View style={styles.modalInner}>
                <TextInput
                    style={styles.input}
                    onChangeText={onTextChange}
                    placeholder="Machine Name"
                    value={machineName}
                />
                    <TextInput
                    style={styles.input}
                    onChangeText={onTextChange}
                    placeholder="Machine Name"
                    value={machineName}
                />
                <Button title={'SAVE'} color={colors.primary} onPress={saveMachine} />
                    </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
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