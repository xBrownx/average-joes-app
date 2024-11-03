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

type RecipeBeansProps = {
    navBack: () => void;
}

type BeanCard = {
    id: string;
    blendName: string;
    image: string;
}

type RecipeBeansState = {
    isModalOpen: boolean,
    beanCards: BeanCard[]
}

const initialState = {
    isModalOpen: false,
    beanCards: [],
}

type UpdateStateType = 'isModalOpen' | 'beanCards'


export default function RecipeBeans({navBack}: RecipeBeansProps) {
    const userBeans = useAppSelector(selectUserBeans);
    const [state, setState] = React.useState<RecipeBeansState>(initialState)

    const updateState = (name: UpdateStateType, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(() => {
        updateState('beanCards', userBeans.map((bean) => (
            {id: bean.id, make: bean.blendName, image: ""})))
    }, [userBeans])

    return (
        <>
            <AddBeanModal isOpen={state.isModalOpen} onClose={() => updateState('isModalOpen', false)} />
            <ThemedView >
                <ThemedView style={styles.titleContainer} >
                    <Ionicons.Button
                        name="arrow-back"
                        size={24}
                        backgroundColor={'transparent'}
                        color={colors.primary}
                        onPress={navBack}
                    />
                    <ThemedText type="title" >
                        BEANS
                    </ThemedText >
                </ThemedView >
                <ThemedView style={styles.listContainer} >
                    {state.beanCards.map(card => (
                        <CardView key={card.id} id={card.id} onPress={() => {}} >
                            <ThemedText >{card.blendName}</ThemedText >
                        </CardView >
                    ))}
                    <TouchableOpacity
                        style={styles.cardContainer}
                        onPress={() => updateState('isModalOpen', true)}
                    >
                        <View style={styles.cardContents} >
                            <Ionicons.Button
                                name="add"
                                size={32}
                                backgroundColor={'transparent'}
                                color={colors.tertiary}
                            />
                            <ThemedText
                                style={styles.addCardText}
                                type={'defaultSemiBold'}
                            >
                                ADD NEW
                            </ThemedText >
                        </View >
                    </TouchableOpacity >
                </ThemedView >
            </ThemedView >
        </>
    );
}

const styles = StyleSheet.create({

    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    listContainer: {
        gap: 8,
        flexDirection: 'column',
    },
    cardText: {
        alignSelf: "center",
        color: colors.tertiary
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addCardText: {
        alignSelf: "center",
        color: colors.tertiary,
        fontSize: 18,
    },
});
