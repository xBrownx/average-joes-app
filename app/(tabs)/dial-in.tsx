import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from "react";
import { Modal } from "@/features/dial-in/modal";
import { DialInLanding, StepOne, StepThree, StepTwo } from "../../features/dial-in";

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
                        '0': <DialInLanding setModalOpen={setModalOpen} />,
                        '1': <StepOne setStep={setStep} />,
                        '2': <StepTwo setStep={setStep} />,
                        '3': <StepThree setStep={setStep} />,
                        '4': <DialInLanding setModalOpen={setModalOpen} />,
                    }[step]
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


