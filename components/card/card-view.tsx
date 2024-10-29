import { View, StyleSheet, TouchableOpacity, useColorScheme, ViewProps } from 'react-native';
import React from "react";
import colors from "@/components/colors";

type CardViewProps = ViewProps & {
    id: string;
    onPress?: () => void;
}

export default function CardView({id, onPress ,...otherProps}: CardViewProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View  {...otherProps} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        borderRadius: 10,
        backgroundColor: colors.backgroundSecondary,
        padding: 10,
        flexDirection: 'column',
        width: '100%',
        height: 150,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});