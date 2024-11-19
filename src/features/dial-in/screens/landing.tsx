import { TypeWriterText } from "@/components/typewriter";
import { ThemedText } from "@/components/text/themed-text";
import { StyleSheet, View } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { ThemedButton } from "@/components/button";

export function DialInLanding({onStart, onSkip}: { onStart: () => void, onSkip: () => void }) {

    const isFocused = useIsFocused();

    return (
        <>
            {isFocused &&
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <TypeWriterText type={'title'} textArr={["DIAL IN"]} />
                </View>
                <View style={styles.stepContainer}>
                    <ThemedText>
                        I am{' '}
                        <ThemedText type={"defaultSemiBold"}>
                            Joe. {' '}
                        </ThemedText>
                        I am here to help you dial in those beans on this machine.
                    </ThemedText>
                </View>
                <View style={styles.stepContainer}>
                    <ThemedText>
                        Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we
                        are
                        done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                    </ThemedText>
                </View>
                <View style={styles.stepContainer}>
                    <ThemedButton title={'Let\'s go'} onPress={onStart} />
                </View>
                <View style={styles.stepContainer}>
                    <ThemedButton title={'I\'ve been here before'} onPress={onSkip} />
                </View>
            </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
});