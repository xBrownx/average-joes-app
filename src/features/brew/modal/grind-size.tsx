import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import { ThemedButton } from "@/components/button";
import Animated, { FadeIn, FadeOut, SlideInRight } from "react-native-reanimated";

export function GrindSize({_continue}: { _continue: () => void }) {
    return (
        <View style={styles.container}>
            <Animated.View
                entering={SlideInRight} style={styles.textWrapper}>
                <ThemedText style={styles.allText}>
                    With your machine we recommend starting with a grind size of XXXX.
                </ThemedText>
                <ThemedText style={styles.allText}>
                    Remember every bag of beans is different & will need adjustments throughout the ‘life’ of the beans.
                </ThemedText>
            </Animated.View>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.buttonContainer}
            >
                <ThemedButton
                    type={'variant'}
                    style={styles.button}
                    onPress={_continue}
                >
                    LETS BREW!
                </ThemedButton>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textWrapper: {
        gap: 24,
        paddingHorizontal: 32,
    },
    allText: {
        color: '#111111',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 18,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    button: {
        flex: 1
    },
})