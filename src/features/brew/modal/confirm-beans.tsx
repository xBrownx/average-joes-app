import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import { ThemedButton } from "@/components/button";
import Animated, { FadeOut, SlideOutLeft } from "react-native-reanimated";

export function ConfirmBeans({_continue}: { _continue: () => void }) {
    return (
        <View style={styles.container}>
            <Animated.View
                exiting={SlideOutLeft}
                style={styles.container}
            >


                <ThemedText
                    type={'default'}
                    style={styles.roastName}
                >
                    AVERAGE JOE’S COFFEE
                </ThemedText>
                <ThemedText
                    type={'default'}
                    style={styles.roastName}
                >
                    MEDIUM ROAST
                </ThemedText>
                <Image
                    source={require('@/assets/images/coffee-bag-placeholder.png')}
                    style={styles.roastImage}
                />
                <View style={styles.notesContainer}>
                    <View style={styles.noteWrapper}>
                        <ThemedText style={[styles.tastingNote, {flex: 1, textAlign: 'right'}]}>
                            Tasting notes:
                        </ThemedText>
                        <ThemedText type={'defaultSemiBold'} style={[styles.tastingNote, {flex: 1, textAlign: 'left'}]}>
                            Chocolate & Caramel
                        </ThemedText>
                    </View>
                    <View style={styles.noteWrapper}>
                        <ThemedText style={[styles.tastingNote, {flex: 1, textAlign: 'right'}]}>
                            Origins:
                        </ThemedText>
                        <ThemedText type={'defaultSemiBold'} style={[styles.tastingNote, {flex: 1, textAlign: 'left'}]}>
                            PNG & Brazil
                        </ThemedText>
                    </View>
                </View>
            </Animated.View>
            <Animated.View
                exiting={FadeOut.duration(100)}
                style={styles.buttonContainer}
            >
                <ThemedButton type={'secondary'} style={styles.button}>
                    Change
                </ThemedButton>
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
    roastName: {
        color: '#111111',
        flexDirection: 'column',
        fontSize: 18,
    },
    roastImage: {},
    notesContainer: {
        width: '100%'
    },
    noteWrapper: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tastingNote: {
        color: '#111111',
        fontSize: 8,
        lineHeight: 16,
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