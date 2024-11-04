import { StyleSheet, FlatList, Animated, Easing, Dimensions, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import React, { useEffect, useLayoutEffect, useState } from "react";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDataString } from "@/util/local-storage";
import { selectUserBeans, selectUserMachines, useAppSelector } from "@/store";
import { AddBeanModal } from "@/features/recipes/beans/add-bean-modal";
import { ViewBeanModal } from "@/features/recipes/beans/view-bean-modal";
import { UserBean } from "@/store/domain";

type RecipeBeansProps = {
    navBack: () => void;
}

type BeanCard = {
    id: string;
    blendName: string;
    roaster: string;
    image: string;
}

type RecipeBeansState = {
    isAddModalOpen: boolean,
    isViewModalOpen: boolean,
    selectedBeanView: UserBean | null
    beanCards: BeanCard[]
}

const initialState = {
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedBeanView: null,
    beanCards: [],
}

type UpdateStateType = 'isAddModalOpen' | 'isViewModalOpen' | 'selectedBeanView' | 'beanCards'


export default function RecipeBeans({navBack}: RecipeBeansProps) {
    const userBeans = useAppSelector(selectUserBeans);
    const [state, setState] = React.useState<RecipeBeansState>(initialState)

    const updateState = (name: UpdateStateType, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const openViewModal = (id: string) => {
        updateState('selectedBeanView', userBeans.find((bean) => bean.id === id));
        updateState('isViewModalOpen', true);
    }

    const closeViewModal = () => {
        updateState('selectedBeanView', null);
        updateState('isViewModalOpen', false);
    }

    useEffect(() => {
        updateState('beanCards', userBeans.map((bean) => (
            {id: bean.id, blendName: bean.blendName, roaster: bean.roasterName, image: ""})))
    }, [userBeans])

    return (
        <>
            <AddBeanModal isOpen={state.isAddModalOpen} onClose={() => updateState('isAddModalOpen', false)} />
            <ViewBeanModal isOpen={state.isViewModalOpen} onClose={closeViewModal} selectedBean={state.selectedBeanView}/>
            <View style={styles.mainContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.titleContainer}>
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.primary}
                            onPress={navBack}
                        />
                        <ThemedText type="title">
                            YOUR BEANS
                        </ThemedText>
                    </View>
                    <ThemedText type="default">View your recipes or add a new one.</ThemedText>
                </View>

                <ThemedView style={styles.listContainer}>
                    {state.beanCards.map(card => (
                        <CardView
                            key={card.id}
                            id={card.id}
                            icon={
                                <Ionicons
                                    name={'information-circle-outline'} size={32}
                                    color={colors.tertiary}
                                />
                            }
                            onPress={() => openViewModal(card.id)}
                        >
                            <ThemedText type={'subtitle'}>{card.blendName.toUpperCase()}</ThemedText>
                            <ThemedText type={'default'}>{card.roaster}</ThemedText>
                        </CardView>

                    ))}
                    <CardView
                            id={'add'}
                            icon={
                                <Ionicons
                                    name={'add'} size={32}
                                    color={colors.tertiary}
                                />
                            }
                            onPress={() => updateState('isAddModalOpen', true)}
                        >
                            <ThemedText type={'subtitle'}>ADD NEW</ThemedText>
                        </CardView>
                </ThemedView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        gap: 16,
        flexDirection: 'column',
    },
    headingContainer: {
        gap: 16,
        flexDirection: 'column',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 1,
    },
    listContainer: {
        marginTop: 8,
        gap: 8,
        flexDirection: 'column',
    },
});
