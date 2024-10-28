import { Image, StyleSheet, Platform, View, Animated, Button } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";
import TypeWriter from "@/components/TypeWriter";
import colors from "@/components/colors";
import { Modal } from "@/app/dial-in/modal";

function DialInStepOne({setModalOpen}: { setModalOpen: (open: boolean) => void }) {
    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <TypeWriter textArr={["WELCOME xxx"]} onComplete={() => {
                }} />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText>
                    I am{' '}
                    <ThemedText type={"defaultSemiBold"}>
                        Joe. {' '}
                    </ThemedText>
                    I am here to help you dial in those beans on this machine.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText>
                    Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we are
                    done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Button title={'Let\'s go'} color={colors.primary} onPress={() => setModalOpen(true)} />
            </ThemedView>
        </>
    );
}


export default function DialIn() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [step, setStep] = React.useState('0');
    const closeModal = () => {
        setModalOpen(false);
        setStep('1');
    }
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/dial-in-2.png')}
                    style={styles.reactLogo}
                />
            }>
            <Modal isOpen={modalOpen} onClose={closeModal} />
            {
                {
                    '0': <DialInStepOne setModalOpen={setModalOpen} />,
                    '1': <StepOne setStep={setStep} />,
                    '2': <StepTwo setStep={setStep} />,
                }[step]
            }


        </ParallaxScrollView>
    );
}

const StepOne = ({setStep}: { setStep: (step: string) => void }) => {
    return (
        <>
            <TypeWriter
                textArr={["Firstly, I need to know what coffee you are using. You can type below or take a photo and upload the bag."]}
                onComplete={() => {}}
            />
            <ThemedView style={styles.stepContainer}>
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('2')} />
            </ThemedView>
        </>
    );
}

const StepTwo = ({setStep}: { setStep: (step: string) => void }) => {
    return (
        <>
            <TypeWriter
                textArr={["Okay great. Next, what type portafilter does your machine have?"]}
                onComplete={() => {}}
            />
            <ThemedView style={styles.stepContainer}>
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('2')} />
            </ThemedView>
        </>
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


