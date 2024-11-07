import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themedColors } from "@/constants/themed-colors";
import { PantryItem } from "@/domain";
import { ThemedCardView } from "@/components/card";
import { AddPantryModal } from "@/features/pantry/pantry-add-modal";
import { TabHeading } from "@/components/tab-heading/tab-heading";
import { selectUserPantryItem, useAppSelector } from "@/store";
import { ViewPantryModal } from "@/features/pantry/pantry-view-modal";
import { name } from "ts-interface-checker";
import { useCustomState } from '@/hooks/useCustomState';

interface PantryLandingState {
    isFocused?: boolean
    isAddModalOpen?: boolean;
    isViewModalOpen?: boolean;
    pantryItems?: PantryItem[];
    selectedPantryItem?: PantryItem | null
}


const initialState: PantryLandingState = {
    isFocused: false,
    isAddModalOpen: false,
    isViewModalOpen: false,
    pantryItems: [],
    selectedPantryItem: null,

}

export default function PantryLanding() {
    const pantryItems = useAppSelector(selectUserPantryItem);

    const {state, updateState} = useCustomState<PantryLandingState>({
        ...initialState,
        isFocused: useIsFocused(),
        pantryItems: useAppSelector(selectUserPantryItem),
    })

    const onItemSelect = (itemId: string) => {
        updateState({
            'selectedPantryItem': state.pantryItems!.find(pantryItem => pantryItem.id === itemId),
            'isViewModalOpen': true
        });
    }

    useEffect(() => {
        updateState({pantryItems: pantryItems});
    }, [pantryItems]);

    return (
        <>
            {state.isFocused &&
                <>
                    <AddPantryModal
                        isOpen={state.isAddModalOpen!}
                        onClose={() => updateState({'isAddModalOpen': false})}
                    />
                    <ViewPantryModal
                        isOpen={state.isViewModalOpen!}
                        onClose={() => updateState({'isViewModalOpen': false})}
                        selectedPantryItem={state.selectedPantryItem!}
                    />

                    <View style={styles.content} >
                        <TabHeading title={"Pantry"} />
                        <View style={styles.titleContainer} >
                            <ThemedText >
                                Keep track of what's in your pantry and always have a fresh bean ready to roast.
                            </ThemedText >
                        </View >
                        <View style={styles.listContainer} >
                            {state.pantryItems!.map(pantryItem => (
                                <ThemedCardView
                                    key={pantryItem.id}
                                    id={pantryItem.id}
                                    onPress={() => onItemSelect(pantryItem.id)}
                                >
                                    <View style={styles.cardRow}>
                                        <View style={styles.cardCol}>
                                            <ThemedText type={'subtitle'}>
                                                {pantryItem.blendName}
                                            </ThemedText>
                                            <ThemedText type={'default'}>
                                                {pantryItem.roasterName}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.cardCol}>
                                            <ThemedText style={styles.roastText} type={'defaultSemiBold'}>
                                                RD: {pantryItem.roastDate}
                                            </ThemedText>
                                            <ThemedText style={styles.expiryText} type={'defaultSemiBold'}>
                                                ED: {pantryItem.expiryDate}
                                            </ThemedText>
                                        </View>
                                    </View>

                                </ThemedCardView>
                                ))
                            }
                            <ThemedCardView
                                id={"add"}
                                icon={
                                    <Ionicons.Button
                                        name="add"
                                        size={32}
                                        backgroundColor={'transparent'}
                                        color={themedColors.tertiary}
                                    />
                                }
                                style={{paddingVertical: 16}}
                                onPress={() => updateState({'isAddModalOpen': true})}
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
    cardRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardCol: {
        flexDirection: 'column',
    },
    roastText: {
        fontSize: 12,
        lineHeight: 14,
        color: 'black'
    },
    expiryText: {
        fontSize: 12,
        lineHeight: 14,
        color: themedColors.tertiary,
    }
});