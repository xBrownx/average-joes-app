import { ModalBegin } from '@/features/dial-in/components';
import {
    DialInLanding,
    DialInPrepare, DialInProcess, DialInPullShot,
    DialInRecipe,
    GetCoffeeScreen,
    GetMachineScreen,
} from '@/features/dial-in/screens';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useCustomState, useTextToSpeech } from '@/hooks';
import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { DialInProps } from "@/navigation/types";

type CurrentStep =
    'landing'
    | 'coffee-select'
    | 'portafilter-select'
    | 'prepare'
    | 'recipe'
    | 'process'
    | 'pull-shot'
    | '';

interface DialInState {
    isStartModalOpen?: boolean;
    currentStep?: CurrentStep;
}

export default function DialInCoreScreen({route, navigation}: DialInProps) {
    const focused = useIsFocused();
    const tts = useTextToSpeech();
    const {state, updateState} = useCustomState<DialInState>({
        isStartModalOpen: false,
        currentStep: 'landing',
    });

    const closeModal = () => {
        updateState({
            isStartModalOpen: false,
            currentStep: 'coffee-select',
        });
    };

    const navTo = (page: CurrentStep) => {
        tts.stop();
        updateState({
            currentStep: page,
        });
    };

    const speak = (thingsToSay: string | string[]) => {
        tts.speak(thingsToSay);
    };

    useEffect(() => {
        if (!focused) navTo('landing');
    }, [focused]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/avatar.png')}
                    style={styles.headerImage}
                />
            }>
            <ModalBegin isOpen={state.isStartModalOpen ?? false} onClose={closeModal} />
            {
                {
                    'landing':
                        <DialInLanding
                            onStart={() => updateState({isStartModalOpen: true})}
                            onSkip={() => navTo('pull-shot')}
                        />,

                    'coffee-select':
                        <GetCoffeeScreen
                            onNext={() => navTo('portafilter-select')}
                            onBack={() => navTo('landing')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    'portafilter-select':
                        <GetMachineScreen
                            onNext={() => navTo('prepare')}
                            onBack={() => navTo('coffee-select')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    'prepare':
                        <DialInPrepare
                            onNext={() => navTo('recipe')}
                            onBack={() => navTo('portafilter-select')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    'recipe':
                        <DialInRecipe
                            onNext={() => navTo('process')}
                            onBack={() => navTo('prepare')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    'process':
                        <DialInProcess
                            onNext={() => navTo('pull-shot')}
                            onBack={() => navTo('recipe')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    'pull-shot':
                        <DialInPullShot
                            onNext={() => navTo('')}
                            onBack={() => navTo('process')}
                            onExit={() => navTo('landing')}
                            onShow={() => tts.stop()}
                            speak={speak}
                        />,
                    '': <></>,
                }[state.currentStep ?? 'landing']
            }
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
});