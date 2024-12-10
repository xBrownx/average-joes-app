import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";

export function FeaturedBeans() {
    return (
        <View style={styles.container}>
            <ThemedText
                type={'subtitle'}
                color={'light'}
                style={styles.title}
            >
                FEATURED BEANS
            </ThemedText>
            <View style={styles.boxContainer}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 16,
        height: "100%",
    },
    title: {
        textAlign: "center",
    },
    boxContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: THEME_COLOURS.tertiary,
        borderBottomColor: THEME_COLOURS.tertiary,
        backgroundColor: THEME_COLOURS.tertiaryBlack,
        height: 120,
    },
})