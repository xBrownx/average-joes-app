import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";
import { PropsWithChildren } from "react";

type MenuItemProps = PropsWithChildren & {
    heading?: string;
    onPress?: () => void;
}

export function MenuItem({heading, onPress, children}: MenuItemProps) {
    return (
        <View style={styles.container}>
            {heading &&
                <ThemedText
                    type={'subtitle'}
                    color={'light'}
                    style={styles.title}
                >
                    {heading.toUpperCase()}
                </ThemedText>
            }
            <TouchableOpacity style={styles.boxContainer} onPress={onPress ?? undefined}>
                {children}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        width: 120,
    },
    title: {
        textAlign: "center",
    },
    boxContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: THEME_COLOURS.tertiary,
        height: 120,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        borderWidth: 2,
        borderColor: 'white',
    },

})