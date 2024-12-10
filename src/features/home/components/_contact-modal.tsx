import { Button, StyleSheet, TextInput, View } from 'react-native';
import React from "react";
import { ThemedText } from "@/components/text/themed-text";
import { THEME_COLOURS } from "@/constants/theme-colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedModalProps } from "@/components/modal/types";
import { ThemedModal } from "@/components/modal";
import { globalStyles } from "@/styles/global-styles";


export function ContactModal({isOpen, onClose}: ThemedModalProps) {

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
        <ThemedModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <View style={globalStyles.innerModal}>
                <View>
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>
                            GET IN TOUCH
                        </ThemedText>
                        <Ionicons name={'close'} size={30} color={THEME_COLOURS.tertiary} onPress={handleClose} />
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
                <View >
                    <Button title={'SEND'} color={THEME_COLOURS.primary} onPress={handleOk} />
                </View>
            </View>

        </ThemedModal>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
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