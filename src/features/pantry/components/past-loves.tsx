import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/text";

export function PastLoves() {
    return (
        <View style={styles.container}>
            <ThemedText type={'subtitle'}>PAST LOVES</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})