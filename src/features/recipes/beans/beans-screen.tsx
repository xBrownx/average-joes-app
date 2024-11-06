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
    userBeans: UserBean[];
    isAddModalOpen: boolean;
    isViewModalOpen: boolean;
    selectedBeanView: UserBean | null;
    beanCards: BeanCard[];
};

type UpdateStateAction =
    | 'isAddModalOpen'
    | 'isViewModalOpen'
    | 'selectedBeanView'
    | 'beanCards';

const initialState = {
    userBeans: [],
    isAddModalOpen: false,
    isViewModalOpen: false,
    selectedBeanView: null,
    beanCards: [],
};

export function RecipeBeans({ navBack }: RecipeBeansProps) {
    const { state, updateState } = useCustomState<RecipeBeansState, UpdateStateAction>({
        ...initialState,
        userBeans: useAppSelector(selectUserBeans)
    })

    const openViewModal = (id: string) => {
        updateState({'selectedBeanView': state.userBeans.find((bean) => bean.id === id), 'isViewModalOpen': true});
        // updateState('isViewModalOpen', true);
    };

    const closeViewModal = () => {
        updateState({'selectedBeanView': null, 'isViewModalOpen': false});
    };

    useEffect(() => {
        // updateState(
        //     'beanCards',
        //     state.userBeans.map((bean) => ({
        //         id: bean.id,
        //         blendName: bean.blendName,
        //         roaster: bean.roasterName,
        //         image: '',
        //     })),
        // );
    }, [state.userBeans]);

    return (
        <>
            <BeanModal
                isOpen={state.isAddModalOpen}
                onClose={() => updateState({'isAddModalOpen': false})}
            />
            <ViewBeanModal
                isOpen={state.isViewModalOpen}
                onClose={closeViewModal}
                selectedBean={state.selectedBeanView}
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
                        <ThemedText type="title">YOUR BEANS</ThemedText>
                    </View>
                    <ThemedText type="default">
                        View your recipes or add a new one.
                    </ThemedText>
                </View>

                <ThemedView style={styles.listContainer}>
                    {state.beanCards.map((card) => (
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
                        onPress={() => updateState({'isAddModalOpen': true})}
                    >
                        <ThemedText type={'subtitle'}>ADD NEW</ThemedText>
                    </ThemedCardView>
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
