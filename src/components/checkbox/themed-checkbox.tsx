import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME_COLOURS } from "@/constants/theme-colors";
import { ThemedText } from "@/components/text/themed-text";

export function ThemedCheckbox({checked, setChecked, label}: {
    checked: boolean,
    setChecked: () => void,
    label?: string
}) {

    return (
        <View style={styles.checkboxContainer}>
            <Pressable
                role="checkbox"
                aria-checked={checked}
                style={[styles.checkboxBase, checked && styles.checkboxChecked]}
                onPress={setChecked}
            >
                {checked && <Ionicons name="checkmark" size={20} color={THEME_COLOURS.white} />}
            </Pressable >
            <ThemedText type={'default'} style={styles.checkboxLabel} >
                {label}
            </ThemedText >
        </View >
    );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: THEME_COLOURS.tertiary,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: THEME_COLOURS.primary,
    },
    checkboxLabel: {
        paddingTop: 2,
        marginLeft: 8,
    },
});
