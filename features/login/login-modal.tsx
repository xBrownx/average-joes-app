import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, View } from 'react-native';
import { ThemedText } from "@/components/text/themed-text";
import { ThemedView } from "@/components/ThemedView";
import colors from "@/components/colors";
import React from "react";

type LoginModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const LoginModal = ({isOpen, onClose, withInput, children, ...rest}: LoginModalProps) => {
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
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type={'title'}>
                            WELCOME TO JOE'S!
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                       <ThemedText type={'subtitle'}>
                           Before we get started, lets grab your name so we can be a bit more personal:
                       </ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.stepContainer}>
                        <Button title={'OK I\'m Ready'} color={colors.primary} onPress={onClose} />
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
    }
});