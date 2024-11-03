import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import SlideForwardView from "@/components/anim/slide-forward";
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import { AddMachineModal } from "@/features/recipes/machines/add-machine-modal";
import { useAppSelector } from "@/store/store";
import { selectAppData, selectUserMachines } from "@/store/slice/local-data-slice";

type RecipeMachinesProps = {
    navBack: () => void;
};

type MachineCard = {
    id: string;
    make: string;
    model: string;
    image: string;
}

type RecipeMachinesState = {
    isModalOpen: boolean,
    machineCards: MachineCard[]
}

const initialState = {
    isModalOpen: false,
    machineCards: [],
}

type UpdateStateType = 'isModalOpen' | 'machineCards';

export default function RecipeMachines({navBack}: RecipeMachinesProps) {
    const userMachines = useAppSelector(selectUserMachines);

    const [state, setState] = React.useState<RecipeMachinesState>(initialState)

    const updateState = (name: UpdateStateType, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    useEffect(() => {
        updateState('machineCards', userMachines.map((machine, idx) => (
            {key: machine.id, id: machine.id, make: machine.make, model: machine.model.name, image: ""})))
        console.log(state.machineCards)
    }, [userMachines])

    return (
        <>
            <AddMachineModal isOpen={state.isModalOpen} onClose={() => updateState('isModalOpen', false)} />
            <ThemedView >
                <ThemedView style={styles.headingContainer} >
                    <ThemedView style={styles.titleContainer} >
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.primary}
                            onPress={navBack}
                        />
                        <ThemedText type="title" >
                            MACHINES
                        </ThemedText >

                    </ThemedView >
                    <ThemedView >
                        <ThemedText type="default" >Add, edit or delete your machines here.</ThemedText >
                    </ThemedView >
                </ThemedView >
                <ThemedView style={styles.listContainer}>
                    {state.machineCards.map((card, idx) => (
                        <CardView key={card.id + idx} id={card.id} onPress={() => {}} >
                            <View style={styles.cardContents}>
                                <ThemedText
                                    style={styles.cardTitle}
                                    type={'title'}
                                >
                                    {card.make}
                                </ThemedText >
                                <ThemedText
                                    style={styles.cardText}
                                    type={'defaultSemiBold'}
                                >
                                    {card.model}
                                </ThemedText >
                                <Image
                                    source={require('@/assets/images/machines_2.png')}
                                    style={styles.cardImage}
                                />
                            </View>
                        </CardView >
                    ))}
                    <TouchableOpacity
                        style={styles.cardContainer}
                        onPress={() => updateState('isModalOpen', true)}
                    >
                        <View style={styles.addCardContent}>
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
                        </View>
                    </TouchableOpacity>
                </ThemedView >
            </ThemedView >
        </>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        gap: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    listContainer: {
        gap: 8,
        flexDirection: 'column',
    },
    cardTitle: {
        alignSelf: "center",
        color: colors.primary,
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
        gap: 16,
    },
    cardImage: {
        objectFit: 'scale-down',
        width: 'auto',
        height: '60%',
    },
    addCardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    addCardText: {
        alignSelf: "center",
        color: colors.tertiary,
        fontSize: 18,
    },
});
