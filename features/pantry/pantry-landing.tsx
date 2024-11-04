import { ThemedView } from "@/components/ThemedView";
import TypeWriter from "@/components/text/typewriter-text";
import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/components/colors";
import { PantryItem } from "@/domain";
import ThemedCardView from "@/components/card/card-view";
import { AddPantryModal } from "@/features/pantry/pantry-add-modal";
import { TabHeading } from "@/components/tab-heading/tab-heading";

interface PantryLandingState {
    isFocused: boolean
    isAddModalOpen: boolean;
    isViewModalOpen: boolean;
    selectedPantryItem: PantryItem | null
}

type PantryLandingAction = 'isFocused' | 'isAddModalOpen' | 'isViewModalOpen' | 'selectedPantryItem';

const initialState: PantryLandingState = {
    isFocused: false,
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedPantryItem: null,
}

export default function PantryLanding() {
    const [state, setState] = useState<PantryLandingState>(initialState);
    state.isFocused = useIsFocused()
    const updateState = (name: PantryLandingAction, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            {state.isFocused &&
                <>
                    <AddPantryModal
                        isOpen={state.isAddModalOpen}
                        onClose={() => updateState('isAddModalOpen', false)} />

                    <View style={styles.content} >
                        <TabHeading title={"Pantry"} />
                        <View style={styles.titleContainer} >
                            <ThemedText >
                                Keep track of what's in your pantry and always have a fresh bean ready to roast.
                            </ThemedText >
                        </View >
                        <View style={styles.listContainer} >

                            <ThemedCardView
                                id={"add"}
                                icon={
                                    <Ionicons.Button
                                        name="add"
                                        size={32}
                                        backgroundColor={'transparent'}
                                        color={colors.tertiary}
                                    />
                                }
                                onPress={() => updateState('isAddModalOpen', true)}
                            >
                                <ThemedText
                                    type={'subtitle'}
                                >
                                    ADD BAG
                                </ThemedText >
                            </ThemedCardView >
                        </View >
                    </View >
                </>
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
});