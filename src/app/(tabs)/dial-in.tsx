import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useEffect, useState } from "react";
import { Modal } from "@/features/dial-in/components";
import { useIsFocused } from "@react-navigation/native";
import {
    DialInLanding,
    GetCoffeeScreen,
    GetMachineScreen, StepFour,
    StepOne,
    StepThree,
    StepTwo
} from "@/features/dial-in/screens";

interface DialInState {
    isStartModalOpen: boolean;
    currentStep: 'landing' | 'coffee-select' | 'portafilter-select' | 'step-1' | 'step-2' | 'step-3' | 'step-4';
}

const initialState: DialInState = {
    isStartModalOpen: false,
    currentStep: 'landing',
}

type DialInAction = 'isStartModalOpen' | 'currentStep';

export default function DialIn() {
    const focused = useIsFocused()
    const [state, setState] = useState<DialInState>(initialState);
    const updateState = (name: DialInAction, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    const closeModal = () => {
        updateState('isStartModalOpen', false);
        updateState('currentStep', 'coffee-select');
    }

    const navTo = (page: string) => {
        updateState('currentStep', page);
    }

    useEffect(() => {
        // if(!focused) navTo('landing');
    }, [focused]);

    return (
            <ParallaxScrollView
                headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
                headerImage={
                    <Image
                        source={require('@/assets/images/dial-in-2.png')}
                        style={styles.reactLogo}
                    />
                }>
                <Modal isOpen={state.isStartModalOpen} onClose={closeModal} />
                {
                    {
                        'landing': <DialInLanding onStart={() => updateState('isStartModalOpen', true)} onSkip={() => navTo('step-1')}/>,
                        'coffee-select': <GetCoffeeScreen onNext={() => navTo('portafilter-select')} onBack={() => navTo('landing')} />,
                        'portafilter-select': <GetMachineScreen onNext={() => navTo('step-1')} onBack={() => navTo('coffee-select')} />,
                        'step-1': <StepOne onNext={() => navTo('step-2')} onBack={() => navTo('portafilter-select')} />,
                        'step-2': <StepTwo onNext={() => navTo('step-3')} onBack={() => navTo('step-1')} />,
                        'step-3': <StepThree onNext={() => navTo('step-4')} onBack={() => navTo('step-2')}></StepThree>,
                        'step-4': <StepFour onNext={() => navTo('step-4')} onBack={() => navTo('step-3')}></StepFour>,
                    }[state.currentStep]
                }


            </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
    reactLogo: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});


