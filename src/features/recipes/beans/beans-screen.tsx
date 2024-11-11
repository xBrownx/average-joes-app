import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ThemedCardView } from '@/components/card';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import { themedColors } from '@/constants/themed-colors';
import { UserRecipe } from '@/domain';
import { RecipeModal } from '@/features/recipes/beans/modal-base';
import { ViewBeanModal } from '@/features/recipes/beans/modal-view-bean';
import { selectUserRecipes, useAppSelector } from '@/store';
import { useCustomState } from '@/hooks/useCustomState';
import { findUserBean } from "@/features/recipes/beans/usecase";
import { globalStyles } from "@/styles/global-styles";
import { TypeWriterText } from "@/components/typewriter";
import { kitchenStyles } from '@/features/styles/kitchen-styles';

type KitchenRecipesProps = {
    navBack: () => void;
};

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
    beanCards?: RecipeCard[];
};

const initialState = {
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedRecipeView: null,
    beanCards: [],
};

export function KitchenRecipes({navBack}: KitchenRecipesProps) {
    const userBeans = useAppSelector(selectUserRecipes)
    const {state, updateState} = useCustomState<KitchenRecipeState>({
        ...initialState,
    })

    const openViewModal = (id: string) => {
        updateState({
            selectedRecipeView: findUserBean(id, userBeans ?? []),
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
        refresh();
    }

    const refresh = () => {

    }

    useEffect(() => {
        console.log('userBeans updated')
        updateState({
            beanCards:
                userBeans!.map((bean) => ({
                    id: bean.id,
                    blendName: bean.blendName,
                    roaster: bean.roasterName,
                    image: '',
                })),
        });
    }, [userBeans]);

    return (
        <>
            <RecipeModal
                isOpen={state.isAddModalOpen!}
                onClose={closeAddModal}
            />
            <ViewBeanModal
                isOpen={state.isViewModalOpen!}
                onClose={closeViewModal}
                selectedBean={state.selectedRecipeView!}
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
                        <TypeWriterText type="title" textArr={["YOUR BEANS"]} />
                    </View>
                    <ThemedText type="default">
                        View your recipes or add a new one.
                    </ThemedText>
                </View>

                <ThemedView style={kitchenStyles.listContainer}>
                    {state.beanCards!.map((card) => (
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
                        style={kitchenStyles.cardContainer}
                        onPress={openAddModal}
                    >
                        <ThemedText type={'subtitle'}>ADD NEW</ThemedText>
                    </ThemedCardView>
                </ThemedView>
            </View>
        </>
    );
}
