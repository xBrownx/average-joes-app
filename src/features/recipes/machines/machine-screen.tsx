import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedCardView } from '@/components/card';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserMachine } from '@/domain';
import { MachineModal } from '@/features/recipes/machines/modal-base';
import { ViewMachineModal } from '@/features/recipes/machines/modal-view-machine';
import { selectUserMachines } from '@/store/slice/local-data-slice';
import { useAppSelector } from '@/store/store';
type RecipeMachinesProps = {
    navBack: () => void;
};

type MachineCard = {
    id: string;
    make: string;
    model: string;
    image: string;
};

type RecipeMachinesState = {
    isAddModalOpen: boolean;
    isViewModalOpen: boolean;
    selectedMachineView: UserMachine | null;
    machineCards: MachineCard[];
};

const initialState = {
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedMachineView: null,
    machineCards: [],
};

type UpdateStateType =
    | 'isAddModalOpen'
    | 'isViewModalOpen'
    | 'selectedMachineView'
    | 'machineCards';

export function RecipeMachines({ navBack }: RecipeMachinesProps) {
    const userMachines = useAppSelector(selectUserMachines);
    const [state, setState] = React.useState<RecipeMachinesState>(initialState);

    const updateState = (name: UpdateStateType, value: any) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const openViewModal = (id: string) => {
        updateState(
            'selectedMachineView',
            userMachines.find((machine) => machine.id === id),
        );
        updateState('isViewModalOpen', true);
    };

    const closeViewModal = () => {
        updateState('selectedMachineView', null);
        updateState('isViewModalOpen', false);
    };

    useEffect(() => {
        updateState(
            'machineCards',
            userMachines.map((machine, idx) => ({
                key: machine.id,
                id: machine.id,
                make: machine.make,
                model: machine.model.name,
                image: '',
            })),
        );
        console.log(state.machineCards);
    }, [userMachines]);

    return (
        <>
            <MachineModal
                isOpen={state.isAddModalOpen}
                onClose={() => updateState('isAddModalOpen', false)}
            />
            <ViewMachineModal
                isOpen={state.isViewModalOpen}
                onClose={closeViewModal}
                selectedMachine={state.selectedMachineView}
            />

            <View style={styles.mainContainer}>
                <View style={styles.headingContainer}>
                    <View style={styles.titleContainer}>
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={themedColors.primary}
                            onPress={navBack}
                        />
                        <ThemedText type="title">YOUR MACHINES</ThemedText>
                    </View>
                    <ThemedText type="default">
                        Add, edit or delete your machine profiles here.
                    </ThemedText>
                </View>
                <View style={styles.listContainer}>
                    {state.machineCards.map((card, idx) => (
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
                                {card.model.toUpperCase()}
                            </ThemedText>
                            <ThemedText type={'default'}>
                                {card.make}
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
                        onPress={() => updateState('isAddModalOpen', true)}
                    >
                        <ThemedText type={'subtitle'}>ADD NEW</ThemedText>
                    </ThemedCardView>
                </View>
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