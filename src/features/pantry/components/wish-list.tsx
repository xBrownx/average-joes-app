import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/text";

export function WishList() {
    return (
        <View style={styles.container}>
            <ThemedText type={'subtitle'}>WISH LIST</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})