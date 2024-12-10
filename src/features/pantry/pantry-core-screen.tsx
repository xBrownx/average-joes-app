import { View, StyleSheet, ImageBackground } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { PantryScreens } from "@/features/pantry/types";
import { PantryMain } from "@/features/pantry/screens/pantry-main";
import { PantryAddWithPhoto } from "@/features/pantry/screens/pantry-add-with-photo";
import { PantryAddManual } from "@/features/pantry/screens/pantry-add-manual";
import { PantryScreenContextProvider, usePantryScreenContext } from "@/features/pantry/context/pantry-screen-context";
import { ThemedScreen } from "@/components/layout/Themed-Screen";

export default function PantryCoreScreen() {
    return (
        <PantryScreenContextProvider>
            <PantryCore />
        </PantryScreenContextProvider>
    )
}

function PantryCore() {
    const { screen } = usePantryScreenContext();
    return (
        <ThemedScreen>
            <View style={styles.container}>
                {{
                    'main': <PantryMain />,
                    'add-with-photo': <PantryAddWithPhoto />,
                    'add-manual': <PantryAddManual />,
                }[screen]}
            </View>
        </ThemedScreen>
    );
}

const styles = StyleSheet.create({
    container: {},
})