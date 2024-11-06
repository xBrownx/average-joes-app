import {
    Linking,
    ModalProps as RNModalProps,
    StyleSheet,
    View,
} from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { ThemedText } from '@/components/text/themed-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedModal } from '@/components/modal';
import { PantryItem } from '@/domain';


type ViewBeanModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    selectedPantryItem: PantryItem | null,
    withInput?: boolean;
};

function FieldValue({ name, value }: { name: string, value?: string }) {
    return (
        <View style={{ marginTop: 8 }} >
            <ThemedText type={'defaultSemiBold'} style={{ color: themedColors.tertiary }} >
                {name}:
            </ThemedText >
            {value && <ThemedText type={'default'} >
                {value}
            </ThemedText >}
        </View >
    );
}

export function ViewPantryModal({
     isOpen,
     onClose,
     selectedPantryItem,
}: ViewBeanModalProps) {
    if (!selectedPantryItem) return;
    return (
        <ThemedModal isOpen={isOpen} close={onClose} >
            <View style={styles.modalInner} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        Blend Details
                    </ThemedText >
                    <Ionicons.Button
                        name="close"
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.tertiary}
                        onPress={onClose}
                    />
                </View >
                <FieldValue name={'Blend Name'} value={selectedPantryItem.blendName} />
                <FieldValue name={'Roaster'} value={selectedPantryItem.roasterName ?? 'unknown'} />
                <FieldValue name={'Roast Date'} value={selectedPantryItem.roastDate ?? 'unknown'} />
                <FieldValue name={'Expiry Date'} value={selectedPantryItem.expiryDate ?? 'unknown'} />
            </View >
        </ThemedModal >

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
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
