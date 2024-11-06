import { ThemedView } from "@/components/ThemedView";
import { TypeWriterText } from "@/components/typewriter";
import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, View } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React from "react";
import { useIsFocused } from "@react-navigation/native";

export function DialInLanding({onStart, onSkip}: { onStart: () => void, onSkip: () => void }) {

    const isFocused = useIsFocused();

    return (
        <>
            {isFocused &&
            <View style={styles.content}>
                <ThemedView style={styles.titleContainer}>
                    <TypeWriterText textStyle={'title'} textArr={["DIAL IN"]} />
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText>
                        I am{' '}
                        <ThemedText type={"defaultSemiBold"}>
                            Joe. {' '}
                        </ThemedText>
                        I am here to help you dial in those beans on this machine.
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText>
                        Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we
                        are
                        done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                    </ThemedText>
                </ThemedView>
                <View style={styles.stepContainer}>
                    <Button title={'Let\'s go'} color={themedColors.primary} onPress={onStart} />
                </View>
                <View style={styles.stepContainer}>
                    <Button title={'I\'ve been here before'} color={themedColors.primary} onPress={onSkip} />
                </View>
            </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
    reactLogo: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});