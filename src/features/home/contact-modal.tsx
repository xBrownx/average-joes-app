import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TextInput, View } from 'react-native';
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import { themedColors } from "@/constants/themed-colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type ContactModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
}

export function ContactModal({isOpen, onClose, withInput, children, ...rest}: ContactModalProps) {

    const handleClose = () => {
        onClose();
    }

    const handleOk = () => {
        onClose()
        handleClose()
    }

    const onTextChange = (text: string) => {

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
                    <View>
                        <View style={styles.titleContainer}>
                            <ThemedText type={'subtitle'}>
                                GET IN TOUCH
                            </ThemedText>
                            <Ionicons name={'close'} size={30} color={themedColors.tertiary} onPress={handleClose} />
                        </View>
                        <ThemedText type={'default'}>
                            Need extra help, or just want to say g'day? Shoot us an email and we'll get back to you
                            ASAP.
                        </ThemedText>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onTextChange}
                        placeholder="Name"
                        value={''}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onTextChange}
                        placeholder="Email"
                        value={''}
                    />
                    <TextInput
                        style={styles.largeInput}
                        onChangeText={onTextChange}
                        placeholder="Message"
                        value={''}
                        multiline={true}
                    />
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'SEND'} color={themedColors.primary} onPress={handleOk} />
                    </ThemedView>
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
        justifyContent: 'space-between',
    },
    stepContainer: {
        gap: 16,
        marginBottom: 16,
    },
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        gap: 16,
        width: '100%'
    },
    input: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 40,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        borderRadius: 8,
    },
    largeInput: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 120,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        borderRadius: 8,
    },
});