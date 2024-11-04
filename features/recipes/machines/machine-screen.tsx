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
import { ViewMachineModal } from "@/features/recipes/machines/view-machine-modal";
import { UserMachine } from "@/store/domain";

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
    isAddModalOpen: boolean,
    isViewModalOpen: boolean,
    selectedMachineView: UserMachine | null
    machineCards: MachineCard[]
}

const initialState = {
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedMachineView: null,
    machineCards: [],
}

type UpdateStateType = 'isAddModalOpen' | 'isViewModalOpen' | 'selectedMachineView' | 'machineCards';

export default function RecipeMachines({navBack}: RecipeMachinesProps) {
    const userMachines = useAppSelector(selectUserMachines);
    const [state, setState] = React.useState<RecipeMachinesState>(initialState)

    const updateState = (name: UpdateStateType, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const openViewModal = (id: string) => {
        updateState('selectedMachineView', userMachines.find((machine) => machine.id === id));
        updateState('isViewModalOpen', true);
    }

    const closeViewModal = () => {
        updateState('selectedMachineView', null);
        updateState('isViewModalOpen', false);
    }

    useEffect(() => {
        updateState('machineCards', userMachines.map((machine, idx) => (
            {key: machine.id, id: machine.id, make: machine.make, model: machine.model.name, image: ""})))
        console.log(state.machineCards)
    }, [userMachines])

    return (
        <>
            <AddMachineModal isOpen={state.isAddModalOpen} onClose={() => updateState('isAddModalOpen', false)} />
            <ViewMachineModal isOpen={state.isViewModalOpen} onClose={closeViewModal}
                              selectedMachine={state.selectedMachineView} />

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
                            YOUR MACHINES
                        </ThemedText>
                    </View>
                    <ThemedText type="default">Add, edit or delete your machine profiles here.</ThemedText>
                </View>
                <ThemedView style={styles.listContainer}>
                    {state.machineCards.map((card, idx) => (
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
                            <ThemedText type={'subtitle'}>{card.model.toUpperCase()}</ThemedText>
                            <ThemedText type={'default'}>{card.make}</ThemedText>
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
