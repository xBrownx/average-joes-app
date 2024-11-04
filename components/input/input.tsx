import { TextInput, StyleSheet } from "react-native";
import React from "react";

type ThemedInputProps = {
    type?: 'single-line' | 'multi-line';
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
}

export function ThemedInput({type, placeholder, value, onValueChange}: ThemedInputProps) {
    return (
        <TextInput
            style={type ? styles[type] : styles["single-line"]}
            onChangeText={onValueChange}
            placeholder={placeholder}
            value={value}
        />
    );
}

const styles = StyleSheet.create({
    'single-line': {
        height: 50,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        paddingLeft: 8,
        paddingTop: 4,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Poppins',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'multi-line': {
        height: 120,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Poppins',
    },
})