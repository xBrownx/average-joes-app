import { View, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import React from "react";
import { themedColors } from "@/constants/themed-colors";
type CardViewProps = ViewProps & {
    id: string;
    onPress?: () => void;
    icon?: React.ReactNode;
}

export function ThemedCardView({id, onPress, icon, children, ...otherProps}: CardViewProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            {icon}
            <View style={styles.content}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        borderRadius: 10,
        backgroundColor: themedColors.backgroundSecondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        flex: 1,
        zIndex: 2,
        gap: 16,
    },
    content: {
        width: '100%',
        padding: 8,
        margin: 0,
        flex: 1,
        flexDirection: 'column',
    },

});