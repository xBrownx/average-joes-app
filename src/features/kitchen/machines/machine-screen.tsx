import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedCardView } from '@/components/card';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserMachine } from '@/domain';
import { AddMachineModal } from '@/features/kitchen/machines/modal-base';
import { ViewMachineModal } from '@/features/kitchen/machines/modal-view-machine';
import { selectUserMachines } from '@/store/slice/local-data-slice';
import { useAppSelector } from '@/store/store';
import { TypeWriterText } from "@/components/typewriter";
import { KitchenChildProps } from "@/features/kitchen/types";
import { useCustomState } from "@/hooks/useCustomState";
import { globalStyles } from '@/styles/global-styles';

type MachineCard = {
    id: string;
    make: string;
    model: string;
    image: string;
};

type KitchenMachineState = {
    isAddModalOpen?: boolean;
    isViewModalOpen?: boolean;
    selectedMachineView?: UserMachine | null;
    machineCards?: MachineCard[];
};

export function KitchenMachines({navBack}: KitchenChildProps) {
    const userMachines = useAppSelector(selectUserMachines);
    const {state, updateState} = useCustomState<KitchenMachineState>({
        isAddModalOpen: false,
        isViewModalOpen: false,
        selectedMachineView: null,
        machineCards: [],
    });

    const openViewModal = (id: string) => {
        updateState({
            selectedMachineView: userMachines.find((machine) => machine.id === id),
            isViewModalOpen: true,
        });
    };

    const closeViewModal = () => {
        updateState({
            selectedMachineView: null,
            isViewModalOpen: false,
        });
    };

    useEffect(() => {
        updateState({
            machineCards:
                userMachines.map((machine, idx) => ({
                    key: machine.id,
                    id: machine.id,
                    make: machine.make,
                    model: machine.model.name,
                    image: '',
                })),
        });
    }, [userMachines]);

    return (
        <>
            <AddMachineModal
                isOpen={state.isAddModalOpen!}
                onClose={() => updateState({isAddModalOpen: false})}
            />
            <ViewMachineModal
                isOpen={state.isViewModalOpen!}
                onClose={closeViewModal}
                selectedMachine={state.selectedMachineView!}
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
                        <TypeWriterText type="title" textArr={["YOUR MACHINES"]} />
                    </View>
                    <ThemedText type="default">
                        Add, edit or delete your machine profiles here.
                    </ThemedText>
                </View>
                <View style={styles.listContainer}>
                    {state.machineCards!.map((card, idx) => (
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
                        onPress={() => updateState({isAddModalOpen: true})}
                        style={{paddingVertical: 16}}
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
