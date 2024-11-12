import { ThemedText } from "@/components/text/themed-text";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themedColors } from "@/constants/themed-colors";
import { PantryItem } from "@/domain";
import { ThemedCardView } from "@/components/card";
import { AddPantryModal } from "@/features/kitchen/pantry/modal-add-pantry-item";
import { TabHeading } from "@/components/tab-heading/tab-heading";
import { selectUserPantryItems, useAppSelector } from "@/store";
import { ViewPantryModal } from "@/features/kitchen/pantry/modal-view-pantry-item";
import { name } from "ts-interface-checker";
import { useCustomState } from '@/hooks/useCustomState';
import { KitchenChildProps } from "@/features/kitchen/types";
import { kitchenStyles } from "@/features/kitchen/styles";
import { TypeWriterText } from "@/components/typewriter";
import { globalStyles } from '@/styles/global-styles';

interface KitchenPantryState {
    isAddModalOpen?: boolean;
    isViewModalOpen?: boolean;
    pantryItems?: PantryItem[];
    selectedPantryItem?: PantryItem | null
}


export function KitchenPantry({navBack}: KitchenChildProps) {
    const pantryItems = useAppSelector(selectUserPantryItems);

    const {state, updateState} = useCustomState<KitchenPantryState>({
        isAddModalOpen: false,
        isViewModalOpen: false,
        selectedPantryItem: null,
        pantryItems: pantryItems,
    })

    const onItemSelect = (itemId: string) => {
        updateState({
            selectedPantryItem: state.pantryItems!.find(pantryItem => pantryItem.id === itemId),
            isViewModalOpen: true
        });
    }

    useEffect(() => {
        updateState({pantryItems: pantryItems});
    }, [pantryItems]);

    return (
        <>
            <AddPantryModal
                isOpen={state.isAddModalOpen!}
                onClose={() => updateState({isAddModalOpen: false})}
            />
            <ViewPantryModal
                isOpen={state.isViewModalOpen!}
                onClose={() => updateState({isViewModalOpen: false})}
                selectedPantryItem={state.selectedPantryItem!}
            />

            <View style={globalStyles.column}>
                <View style={globalStyles.column}>
                    <View style={globalStyles.row}>
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={themedColors.primary}
                            onPress={navBack}
                        />
                        <TypeWriterText type="title" textArr={["PANTRY"]} />
                    </View>
                    <ThemedText type="default">
                        Keep track of your stock, or order more here.
                    </ThemedText>
                </View>
                <View style={kitchenStyles.listContainer} >
                    {state.pantryItems!.map(pantryItem => (
                        <ThemedCardView
                            key={pantryItem.id}
                            id={pantryItem.id}
                            onPress={() => onItemSelect(pantryItem.id)}
                        >
                            <View style={styles.cardRow} >
                                <View style={styles.cardCol} >
                                    <ThemedText type={'subtitle'} >
                                        {pantryItem.blendName}
                                    </ThemedText >
                                    <ThemedText type={'default'} >
                                        {pantryItem.roasterName}
                                    </ThemedText >
                                </View >
                                <View style={styles.cardCol} >
                                    <ThemedText style={styles.roastText} type={'defaultSemiBold'} >
                                        RD: {pantryItem.roastDate}
                                    </ThemedText >
                                    <ThemedText style={styles.expiryText} type={'defaultSemiBold'} >
                                        ED: {pantryItem.expiryDate}
                                    </ThemedText >
                                </View >
                            </View >

                        </ThemedCardView >
                    ))
                    }
                    <ThemedCardView
                        id={'add'}
                        icon={
                            <Ionicons.Button
                                name="add"
                                size={32}
                                backgroundColor={'transparent'}
                                color={themedColors.tertiary}
                            />
                        }
                        style={{ paddingVertical: 16 }}
                        onPress={() => updateState({ 'isAddModalOpen': true })}
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
    );
}

const styles = StyleSheet.create({
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