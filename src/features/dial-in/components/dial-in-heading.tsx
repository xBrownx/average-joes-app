import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themedColors } from "@/constants/themed-colors";
import { ThemedText } from "@/components/text/themed-text";
import React from "react";

interface DialInHeadingProps {
    onBack: () => void;
    onShow: () => void;
    icon: 'back' | 'exit';
    heading?: string;
}

export function DialInHeading({onBack, onShow, icon, heading}: DialInHeadingProps) {
    return (
        <View style={styles.header}>

            <Ionicons.Button
                name={icon === 'back' ? "arrow-back" : "close"}
                size={24}
                backgroundColor={'transparent'}
                color={themedColors.primary}
                style={{padding: 0, margin: 0}}
                onPress={onBack}
            />

            {heading && <ThemedText type={'title'}>{heading}</ThemedText>}
            <TouchableOpacity onPress={onShow}>
                <ThemedText
                    type="default"
                    style={{color: themedColors.primary}}
                >
                    SHOW
                </ThemedText>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: themedColors.background,
    },

});