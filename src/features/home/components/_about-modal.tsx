import { ModalProps as RNModalProps, StyleSheet, View } from 'react-native';
import React from "react";
import { ThemedText } from "@/components/text/themed-text";
import { THEME_COLOURS } from "@/constants/theme-colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { _themedModal } from "@/components/modal";
import { globalStyles } from "@/styles/global-styles";
import { ThemedModalProps } from "@/components/modal/types";

export function AboutModal({isOpen, onClose }: ThemedModalProps) {

    return (
        <_themedModal isOpen={isOpen} onClose={onClose} >
            <View style={globalStyles.innerModal}>
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        WHO IS JOE?
                    </ThemedText >
                    <Ionicons name={'close'} size={30} color={THEME_COLOURS.tertiary} onPress={onClose} />
                </View >
                <ThemedText type={'default'} >
                    Average Joe's is just a couple of industry guys trying to help as many people as we can bring cafe
                    quality coffee into their home.
                </ThemedText >
            </View >
        </_themedModal >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
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
        height: 120,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        borderRadius: 8,
    },
});