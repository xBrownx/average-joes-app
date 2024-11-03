import { ThemedView } from "@/components/ThemedView";
import TypeWriter from "@/components/text/typewriter-text";
import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/components/colors";


type PantryLandingProps = {}

export default function PantryLanding() {
    const focused = useIsFocused();
    return (
        <>{focused &&
            <ThemedView style={styles.content} >
                <ThemedView style={styles.titleContainer} >
                    <TypeWriter textStyle={'title'} textArr={["PANTRY"]}    />
                </ThemedView >
                <ThemedView style={styles.titleContainer} >
                    <ThemedText >
                        Keep track of what's in your pantry and always have a fresh bean ready to roast.
                    </ThemedText >
                </ThemedView >
                <ThemedView style={styles.listContainer}>
                    <TouchableOpacity
                        style={styles.cardContainer}
                        onPress={() => {}}
                    >
                        <View style={styles.addCardContent}>
                            <Ionicons.Button
                                name="add"
                                size={32}
                                backgroundColor={'transparent'}
                                color={colors.tertiary}
                            />
                            <ThemedText
                                style={styles.addCardText}
                                type={'defaultSemiBold'}
                            >
                                ADD BAG
                            </ThemedText >
                        </View>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView >
        }</>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    listContainer: {
        gap: 8,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    cardContainer: {
        elevation: 1,
        borderRadius: 10,
        backgroundColor: colors.backgroundSecondary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
        paddingTop: 4,
        paddingBottom: 8,
    },
    addCardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    addCardText: {
        alignSelf: "center",
        color: colors.tertiary,
        fontSize: 18,
    },
});