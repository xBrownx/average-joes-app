import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedCardView } from '@/components/card';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import { themedColors } from '@/constants/themed-colors';
import { UserBean } from '@/domain';
import { BeanModal } from '@/features/recipes/beans/modal-base';
import { ViewBeanModal } from '@/features/recipes/beans/modal-view-bean';
import { selectUserBeans, useAppSelector } from '@/store';
import { useCustomState } from '@/hooks/useCustomState';
import { findUserBean } from "@/features/recipes/beans/usecase";
import { globalStyles } from "@/styles/global-styles";
import { TypeWriterText } from "@/components/typewriter";

type RecipeBeansProps = {
    navBack: () => void;
};

type BeanCard = {
    id: string;
    blendName: string;
    roaster: string;
    image: string;
};

type RecipeBeansState = {
    isAddModalOpen?: boolean;
    isViewModalOpen?: boolean;
    selectedBeanView?: UserBean | null;
    beanCards?: BeanCard[];
};

const initialState = {

    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedBeanView: null,
    beanCards: [],
};

export function RecipeBeans({navBack}: RecipeBeansProps) {
    const userBeans = useAppSelector(selectUserBeans)
    const {state, updateState} = useCustomState<RecipeBeansState>({
        ...initialState,
    })

    const openViewModal = (id: string) => {
        updateState({
            selectedBeanView: findUserBean(id, userBeans ?? []),
            isViewModalOpen: true
        });
    };

    const closeViewModal = () => {
        updateState({
            selectedBeanView: null,
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
            <BeanModal
                isOpen={state.isAddModalOpen!}
                onClose={closeAddModal}
            />
            <ViewBeanModal
                isOpen={state.isViewModalOpen!}
                onClose={closeViewModal}
                selectedBean={state.selectedBeanView!}
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

                <ThemedView style={globalStyles.listContainer}>
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
