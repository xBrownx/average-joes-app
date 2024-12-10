import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";


export function Rewards() {
    return (
        <View style={styles.container}>
            <ThemedText
                type={'subtitle'}
                color={'light'}
                style={styles.title}
            >
                REWARDS
            </ThemedText>
            <View style={styles.boxContainer}>
                <Image source={require('../assets/rating.png')} />
                <ThemedText type={'defaultSemiBold'} style={styles.text}>
                    You're 1 start away from unlocking 40% off!
                </ThemedText>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 16,
    },
    title: {
        textAlign: "center",
    },
    boxContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: THEME_COLOURS.tertiary,
        height: 68,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 13,
        borderWidth: 2,
        borderColor: 'white',
    },
    rating: {},
    text: {
        fontSize: 12,
        lineHeight: 18,
    }
})