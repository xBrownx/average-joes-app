import { ThemedView } from "@/components/ThemedView";
import TypeWriter from "@/components/text/typewriter-text";
import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, View } from "react-native";
import React from "react";


type PantryLandingProps = {

}

export default function PantryLanding() {
    return (
        <View style={styles.content}>
            <ThemedView style={styles.titleContainer}>
                <TypeWriter textStyle={'title'} textArr={["PANTRY"]} onComplete={() => {
                }} />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText>
                    Keep track of what's in your pantry and always have a fresh bean ready to roast.
                </ThemedText>
            </ThemedView>
        </View>
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