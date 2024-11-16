import { Button, ModalProps as RNModalProps, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { ThemedModal } from '@/components/modal';
import { globalStyles } from '@/styles/global-styles';
import { ExternalLink } from '@/components/ExternalLink';

type ModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: (isExit: boolean) => void;
};

export function ModalConfirmExit({ isOpen, onClose }: ModalProps) {

    const onCloseCustom = () => {
        onClose(false);
    }

    return (
        <ThemedModal isOpen={isOpen} close={onCloseCustom} >
            <View style={globalStyles.innerModal} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        Are you sure you want to exit?
                    </ThemedText >
                </View >

                <View style={styles.stepContainer} >
                    <Button title={'NOPE'} color={themedColors.primary} onPress={() => onClose(false)} />
                    <Button title={'YEP'} color={themedColors.primary} onPress={() => onClose(true)} />
                </View >
            </View >
        </ThemedModal >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    reactLogo: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
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
});