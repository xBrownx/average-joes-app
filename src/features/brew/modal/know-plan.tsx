import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import { ThemedButton } from "@/components/button";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from "react-native-reanimated";

export function KnowPlan({_continue}: { _continue: () => void }) {
    return (
        <View style={styles.container}>
            <Animated.View
                entering={SlideInRight}
                exiting={SlideOutLeft}
                style={styles.container}
            >
                <ThemedText style={styles.allText}>
                    This roaster has suggested a
                </ThemedText>
                <ThemedText
                    type={'defaultSemiBold'}
                    style={styles.allText}
                >
                    brew ratio of XXXXX
                </ThemedText>
                <ThemedText style={styles.allText}>
                    meaning...
                </ThemedText>
                <ThemedText
                    type={'defaultSemiBold'}
                    style={styles.allText}
                >
                    38g of espresso
                </ThemedText>
                <ThemedText style={styles.allText}>
                    in the cup in
                </ThemedText>
                <ThemedText
                    type={'defaultSemiBold'}
                    style={styles.allText}
                >
                    XXX seconds.
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
                    Continue
                </ThemedButton>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    allText: {
        color: '#111111'
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