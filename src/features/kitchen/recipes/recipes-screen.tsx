import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ThemedCardView } from '@/components/card';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import { themedColors } from '@/constants/themed-colors';
import { UserRecipe } from '@/domain';
import { AddRecipeModal } from '@/features/kitchen/recipes/modal-recipe-base';
import { ViewRecipeModal } from '@/features/kitchen/recipes/modal-view-recipe';
import { selectUserRecipes, useAppSelector } from '@/store';
import { useCustomState } from '@/hooks/useCustomState';
import { findUserRecipeWithId } from "@/features/kitchen/recipes/usecase";
import { globalStyles } from "@/styles/global-styles";
import { TypeWriterText } from "@/components/typewriter";
import { KitchenChildProps } from "@/features/kitchen/types";

type RecipeCard = {
    id: string;
    blendName: string;
    roaster: string;
    image: string;
};

type KitchenRecipeState = {
    isAddModalOpen?: boolean;
    isViewModalOpen?: boolean;
    selectedRecipeView?: UserRecipe | null;
    recipeCards?: RecipeCard[];
};


export function KitchenRecipes({navBack}: KitchenChildProps) {
    const userRecipes = useAppSelector(selectUserRecipes)
    const {state, updateState} = useCustomState<KitchenRecipeState>({
        isAddModalOpen: false,
        isViewModalOpen: false,
        selectedRecipeView: null,
        recipeCards: [],
    })

    const openViewModal = (id: string) => {
        updateState({
            selectedRecipeView: findUserRecipeWithId(id, userRecipes ?? []),
            isViewModalOpen: true
        });
    };

    const closeViewModal = () => {
        updateState({
            selectedRecipeView: null,
            isViewModalOpen: false
        });
    };

    const openAddModal = () => {
        updateState({isAddModalOpen: true});
    };

    const closeAddModal = () => {
        updateState({
            isAddModalOpen: false
        });
    }

    useEffect(() => {
        updateState({
            recipeCards:
                userRecipes!.map((recipe) => ({
                    id: recipe.id,
                    blendName: recipe.blendName,
                    roaster: recipe.roasterName,
                    image: '',
                })),
        });
    }, [userRecipes]);

    return (
        <>
            <AddRecipeModal
                isOpen={state.isAddModalOpen!}
                onClose={closeAddModal}
            />
            <ViewRecipeModal
                isOpen={state.isViewModalOpen!}
                onClose={closeViewModal}
                selectedRecipe={state.selectedRecipeView!}
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
                        <TypeWriterText type="title" textArr={["YOUR RECIPES"]} />
                    </View>
                    <ThemedText type="default">
                        View your recipes or add a new one.
                    </ThemedText>
                </View>

                <ThemedView style={globalStyles.listContainer}>
                    {state.recipeCards!.map((card) => (
                        <ThemedCardView
                            key={card.id}
                            id={card.id}
                            icon={
                                <Ionicons
                                    name={'information-circle-outline'}
                                    size={32}
                                    color={themedColors.tertiary}
                                />
                            }
                            onPress={() => openViewModal(card.id)}
                        >
                            <ThemedText type={'subtitle'}>
                                {card.blendName.toUpperCase()}
                            </ThemedText>
                            <ThemedText type={'default'}>
                                {card.roaster}
                            </ThemedText>
                        </ThemedCardView>
                    ))}
                    <ThemedCardView
                        id={'add'}
                        icon={
                            <Ionicons
                                name={'add'}
                                size={32}
                                color={themedColors.tertiary}
                            />
                        }
                        style={{paddingVertical: 16}}
                        onPress={openAddModal}
                    >
                        <ThemedText type={'subtitle'}>ADD NEW</ThemedText>
                    </ThemedCardView>
                </ThemedView>
            </View>
        </>
    );
}
