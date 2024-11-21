import { Button, StyleSheet } from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React, { useEffect } from 'react';
import { CustomTypeWriter } from '@/features/dial-in/components/custom-type-writer';
import { ThemedText } from '@/components/text/themed-text';
import { DialInHeading } from '@/features/dial-in/components/dial-in-heading';
import { AddMachineModal } from '@/features/kitchen/machines/modal-base';
import { DropdownData, ThemedDropdown } from '@/components/dropdown';
import { selectUserMachines, useAppSelector } from '@/store';
import { useCustomState } from '@/hooks';
import { userMachinesToDropdown } from '@/usecase';
import Animated, { LinearTransition, StretchOutY } from 'react-native-reanimated';
import { DialInScreenProps } from "@/features/dial-in/types";


interface GetMachineState {
    isShow?: boolean;
    isMuted?: boolean;
    userMachinesDropdown?: DropdownData[];
    selectedMachine?: string | null;
    isAddModalOpen?: boolean;

}

export function GetMachineScreen({ onNext, onBack, onExit, onShow, speak }: DialInScreenProps) {
    const userMachines = useAppSelector(selectUserMachines);

    const { state, updateState } = useCustomState<GetMachineState>({
        isShow: false,
        userMachinesDropdown: userMachinesToDropdown(userMachines),
        selectedMachine: null,
        isAddModalOpen: false,
    });

    const onSelectUserMachine = (id: string) => {
        updateState({ selectedMachine: id });
    };

    const onShowPressed = () => {
        updateState({ isShow: true });
        onShow();
    };

    useEffect(() => {
        const thingToSay = [
            'Okay, great!',
            'Next, we need to know what type of portafilter your machine has. Pick from your saved machines, or add a new one below.',
        ];
        speak(thingToSay);
    }, []);

    return (
        <Animated.View >
            <AddMachineModal
                isOpen={state.isAddModalOpen ?? false}
                onClose={() => updateState({ isAddModalOpen: false })}
                onSaveCallback={onSelectUserMachine}
            />
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />

            <Animated.View style={styles.content} >
                <CustomTypeWriter
                    text={[
                        'Okay great.',
                        'Next, we need to know what type of portafilter your machine has. Pick from your saved machines, or add a new one below.',
                    ]}
                    type={'default'}
                    speed={30}
                    isShow={state.isShow}
                >
                    <Animated.View
                        style={styles.stepContainer}
                        layout={LinearTransition}
                    >
                        <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                            <ThemedDropdown
                                placeholder={'Search Machines'}
                                data={state.userMachinesDropdown}
                                value={state.selectedMachine ?? null}
                                onChange={onSelectUserMachine}
                            />
                        </Animated.View >

                        {!state.selectedMachine &&
                            <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                                <ThemedText style={styles.orText} type={'defaultSemiBold'} >
                                    - OR -
                                </ThemedText >
                            </Animated.View >
                        }

                        <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                            <Button
                                color={themedColors.primary}
                                title={state.selectedMachine
                                    ? 'NEXT'
                                    : 'ADD NEW'
                                }
                                onPress={state.selectedMachine
                                    ? onNext
                                    : () => updateState({ isAddModalOpen: true })
                                }
                            />
                        </Animated.View >
                    </Animated.View >
                </CustomTypeWriter >
            </Animated.View >
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 16,
        marginVertical: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 32,
        gap: 16,
        overflow: 'hidden',
    },
    orText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: themedColors.tertiary,
    },
});
