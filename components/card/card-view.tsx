import { View, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import React from "react";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/text/themed-text";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
type CardViewProps = ViewProps & {
    id: string;
    onPress?: () => void;
    icon?: React.ReactNode;
}

export default function CardView({id, onPress, icon, children, ...otherProps}: CardViewProps) {
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
        backgroundColor: colors.backgroundSecondary,
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