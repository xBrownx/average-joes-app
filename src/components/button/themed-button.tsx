import { themedColors } from '@/constants/themed-colors';import { Button, ButtonProps, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';import React from 'react';import { ThemedText } from '@/components/text/themed-text';type ThemedButtonProps = {    title: string;    onPress: () => void;    color?: string;}export function ThemedButton({ title, color, onPress }: ThemedButtonProps) {    return (        <TouchableOpacity            style={styles.buttonContainer}            onPress={onPress}        >            <ThemedText style={styles.buttonText}>                {title.toUpperCase()}            </ThemedText>        </TouchableOpacity >    );}const styles = StyleSheet.create({    buttonContainer: {        elevation: 4,        borderRadius: 10,        backgroundColor: themedColors.primary,        justifyContent: 'center',        alignItems: 'center',        flex: 1,        zIndex: 2,        paddingVertical: 16,    },    buttonText: {        marginBottom: -3,        color: 'white',        fontSize: 20,        fontWeight: 'bold'    }});