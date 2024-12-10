import { StyleSheet, View } from 'react-native';
import { THEME_COLOURS } from '@/constants/theme-colors';
import React from 'react';
import { ThemedText } from '@/components/text/themed-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedModal } from '@/components/modal';
import { PantryItem } from '@/domain';
import { ThemedModalProps } from "@/components/modal/types";
import { globalStyles } from "@/styles/global-styles";

type ViewBeanModalProps = ThemedModalProps & {
    selectedPantryItem: PantryItem | null,
};

function FieldValue({ name, value }: { name: string, value?: string }) {
    return (
        <View style={{ marginTop: 8 }} >
            <ThemedText type={'defaultSemiBold'} style={{ color: THEME_COLOURS.tertiary }} >
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
        <ThemedModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <View style={globalStyles.innerModal} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >
                        Blend Details
                    </ThemedText >
                    <Ionicons.Button
                        name="close"
                        size={24}
                        backgroundColor={'transparent'}
                        color={THEME_COLOURS.tertiary}
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
