import { View, StyleSheet } from "react-native";
import React from "react";
import { PantryMain } from "@/features/pantry/screens/pantry-main";
import { PantryAddWithPhoto } from "@/features/pantry/screens/pantry-add-with-photo";
import { PantryAddManual } from "@/features/pantry/screens/pantry-add-manual";
import { PantryScreenContextProvider, usePantryScreenContext } from "@/features/pantry/context/pantry-screen-context";
import { ThemedScreen } from "@/components/layout/themed-screen";

export default function PantryCoreScreen({ route }) {
    return (
        <PantryScreenContextProvider>
            <PantryCore route={route}/>
        </PantryScreenContextProvider>
    )
}

function PantryCore({ route }) {
    const { screen } = usePantryScreenContext();
    const { enterDir } = route.params;
    return (
        <ThemedScreen enterDir={enterDir}>
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