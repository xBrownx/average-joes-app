import { StyleSheet, View } from "react-native";
import { THEME_COLOURS } from "@/constants";
import { ThemedText } from "@/components/text";

export function TargetYield() {
    return (
        <View style={styles.container}>
            <ThemedText
                type={'subtitle'}
                style={styles.text}
            >
                TARGET YIELD
            </ThemedText>
            <ThemedText
                type={'subtitle'}
                style={styles.text}
            >
                -
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        borderRadius: 25,
        backgroundColor: THEME_COLOURS.tertiaryBlack,
        paddingVertical: 36,
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 22,
    },
})