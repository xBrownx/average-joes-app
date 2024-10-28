import { ThemedView } from "@/components/ThemedView";
import TypeWriter from "@/components/TypeWriter";
import { ThemedText } from "@/components/ThemedText";
import { Button, StyleSheet } from "react-native";
import colors from "@/components/colors";
import React from "react";

export default function DialInLanding({setModalOpen}: { setModalOpen: (open: boolean) => void }) {
    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <TypeWriter textArr={["WELCOME ANDY"]} onComplete={() => {
                }} />
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
                    Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we are
                    done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Button title={'Let\'s go'} color={colors.primary} onPress={() => setModalOpen(true)} />
            </ThemedView>
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
});