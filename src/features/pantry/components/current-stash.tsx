import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/text";
import { ThemedButton } from "@/components/button";
import { usePantryScreenContext } from "@/features/pantry/context/pantry-screen-context";

export function CurrentStash() {
    const { setScreen } = usePantryScreenContext();
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
            <ThemedText type={'subtitle'} style={styles.mainText}>
                YOU'RE ALL OUT
            </ThemedText>
            <ThemedText style={styles.subText}>
                ADD BEANS TO YOUR STASH TO TRACK FRESHNESS, RECIPE’S AND TAKE NOTES.
            </ThemedText>
                </View>
            <View style={styles.addBeans}>
                <ThemedButton
                    textType={'small'}
                    onPress={() => setScreen('add-with-photo')}
                >
                    ADD BEANS
                </ThemedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        justifyContent: "center",
        height: '100%'
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8
    },
    mainText: {},
    subText: {
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
    },
    addBeans: {
        width: "100%",
        paddingHorizontal: 100,
    },
})