import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const menuItems = [
    {
        id: "beans",
        title: "BEANS",
    },
    {
        id: "machines",
        title: "MACHINES",
    },
];

type RecipeLandingProps = {
    navForward: (screen: string) => void;
}


export default function RecipeLanding({navForward}: RecipeLandingProps) {

    return (
        <View style={styles.container}>
            <ThemedView style={styles.container} >
                <ThemedView style={styles.titleContainer} >
                    <ThemedText type="title" >RECIPES</ThemedText >
                </ThemedView >
                <ThemedView >
                    <ThemedText type="default" >Checkout your saved beans or add/edit your machine
                        profiles.</ThemedText >
                </ThemedView >
            </ThemedView >
            {menuItems.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.cardContainer}
                    onPress={() => navForward(item.id)}
                >
                    <View style={styles.cardContents}>
                        <ThemedText
                            style={styles.cardText}
                            type={'defaultSemiBold'}
                        >
                            {item.title}
                        </ThemedText >
                        <Ionicons.Button
                            name="arrow-forward"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.tertiary}
                        />
                    </View>
                </TouchableOpacity>

            ))}
        </View >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1,
        gap: 16,
        backgroundColor: 'transparent',
        marginBottom: 16,
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
    },
    cardContents: {
        width: '100%',
        padding: 16,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    cardText: {
        color: colors.tertiary,
        fontSize: 18
    },
});