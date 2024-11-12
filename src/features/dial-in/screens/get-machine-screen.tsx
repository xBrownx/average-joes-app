import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React, { useEffect } from 'react';
import { CustomTypeWriter } from '@/features/dial-in/components/custom-type-writer';
import { ThemedText } from '@/components/text/themed-text';
import { DialInHeading } from '@/features/dial-in/components/dial-in-heading';
import { AddMachineModal } from '@/features/kitchen/machines/modal-base';
import { DropdownData, ThemedDropdown } from '@/components/dropdown';
import { selectMuted, selectUserMachines, useAppSelector } from '@/store';
import { useCustomState } from '@/hooks/useCustomState';
import { userMachinesToDropdown } from '@/usecase';
import Animated, { LinearTransition, StretchOutY } from 'react-native-reanimated';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';


interface GetMachineState {
    isShow?: boolean;
    isMuted?: boolean;
    userMachinesDropdown?: DropdownData[];
    selectedMachine?: string | null;
    isAddModalOpen?: boolean;

}

export function GetMachineScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const userMachines = useAppSelector(selectUserMachines);
    const tts = useTextToSpeech();

    const { state, updateState } = useCustomState<GetMachineState>({
        isShow: false,
        userMachinesDropdown: userMachinesToDropdown(userMachines),
        selectedMachine: null,
        isAddModalOpen: false,
    });

    const onSelectUserMachine = (id: string) => {
        updateState({ selectedMachine: id });
    };

    const onShow = () => {
        tts.stop();
        updateState({ isShow: true });
    };

    const onBackPressed = () => {
        tts.stop();
        onBack();
    };

    useEffect(() => {
        const thingToSay = [
            'Okay, great!',
            'Next, we need to know what type of portafilter your machine has. Pick from your saved machines, or add a new one below.',
        ];
        tts.speak(thingToSay);
    }, []);

    return (
        <Animated.View >
            <AddMachineModal
                isOpen={state.isAddModalOpen ?? false}
                onClose={() => updateState({ isAddModalOpen: false })}
                onSaveCallback={onSelectUserMachine}
            />
            <DialInHeading
                onBack={onBackPressed}
                onShow={onShow}
                icon={'back'}
            />

            <Animated.View style={styles.content} >
                <CustomTypeWriter
                    text={[
                        'Okay great.',
                        'Next, we need to know what type of portafilter your machine has. Pick from your saved machines, or add a new one below.',
                    ]}
                    type={'primaryBold'}
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
        paddingVertical: 16,
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
