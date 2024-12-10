import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";

export function BrewTimer() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.timer}>
                <ThemedText type={'subtitle'} style={styles.innerTimerText}>
                    START
                </ThemedText>
            </TouchableOpacity>
            <ThemedText type={'subtitle'} style={styles.timerText}>
                00:00
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        gap: 16,
        alignItems: "center",
    },
    timer: {
        width: 250,
        height: 250,
        backgroundColor: "#D92A2A",
        borderRadius: 125,
        borderWidth: 8,
        borderColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
    },
    innerTimerText: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    timerText: {
        fontSize: 50,
    },
})