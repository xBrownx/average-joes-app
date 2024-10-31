import { View, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import React from "react";
import colors from "@/components/colors";

type CardViewProps = ViewProps & {
    id: string;
    onPress?: () => void;
}

export default function CardView({id, onPress ,...otherProps}: CardViewProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content} {...otherProps} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        borderRadius: 10,
        backgroundColor: colors.backgroundSecondary,
        paddingTop: 8,
        flexDirection: 'column',
        width: 150,
        height: 150,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
    },
    content: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        gap: 4

    }
});