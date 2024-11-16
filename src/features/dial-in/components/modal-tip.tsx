import { Button, ModalProps as RNModalProps, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { ThemedModal } from '@/components/modal';
import { globalStyles } from '@/styles/global-styles';
import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from "@expo/vector-icons";

type ModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export function ModalTip({ isOpen, onClose }: ModalProps) {
    return (
        <ThemedModal isOpen={isOpen} close={onClose} >
            <View style={styles.innerModal} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        HOT TIP 🔥
                    </ThemedText >
                    <Ionicons name={'arrow-forward'} size={28} color={themedColors.tertiary} onPress={onClose} style={styles.closeIcon}/>
                </View >
                <View style={styles.contentContainer} >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'}>DOSE</ThemedText> and <ThemedText type={'defaultSemiBold'}>YIELD</ThemedText> are constant. They always remain the same. <ThemedText type={'defaultSemiBold'}>TIME</ThemedText> is what we adjust.
                    </ThemedText >
                    <ThemedText >
                        <ThemedText type={'defaultSemiBold'}>BORING COFFEE FACT</ThemedText> - Espresso works on a 1:2 brew ratio. This means one part ground coffee to 2 parts espresso in the cup, hence 18g to 36g.
                    </ThemedText >
                    <ThemedText >
                       Confused? Great, me too after that. Lets make some coffee and it will start to make sense.
                    </ThemedText >
                </View >
            </View >
        </ThemedModal >
    );
}

const styles = StyleSheet.create({
    innerModal: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        gap: 8,

    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themedColors.backgroundSecondary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        elevation: 5,
    },
    closeIcon: {
        margin: 0,
        padding: 0,
    },
    contentContainer: {
        gap: 16,
        marginBottom: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
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