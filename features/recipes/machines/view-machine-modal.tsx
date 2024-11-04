import {
    Button, Linking,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "@/components/colors";
import React from "react";

import { UserBean, UserMachine } from "../../../domain";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rating } from "react-native-ratings";


type ViewMachineModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    selectedMachine: UserMachine | null,
    withInput?: boolean;
};

function FieldValue({name, value}: { name: string, value?: string }) {
    return (
        <View style={{marginTop: 8}}>
            <ThemedText type={'defaultSemiBold'} style={{color: colors.tertiary}}>
                {name}:
            </ThemedText>
            {value && <ThemedText type={'default'}>
                {value}
            </ThemedText>}
        </View>
    );
}

export const ViewMachineModal = ({isOpen, onClose, selectedMachine, withInput, children, ...rest}: ViewMachineModalProps) => {
    if (!selectedMachine) return

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
                            <ThemedText type={'subtitle'}>
                                Machine Details
                            </ThemedText>
                            <Ionicons.Button
                                name="close"
                                size={24}
                                backgroundColor={'transparent'}
                                color={colors.tertiary}
                                onPress={onClose}
                            />
                        </View>
                        <FieldValue name={'Make'} value={selectedMachine.make} />
                        <FieldValue name={'Model'} value={selectedMachine.model.name} />
                        <FieldValue name={'Portafilter Size'} value={selectedMachine.model.portafilterSize} />
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
        gap: 8,
    },
    input: {
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
    },
});
