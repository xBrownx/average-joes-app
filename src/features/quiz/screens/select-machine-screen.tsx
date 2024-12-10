import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from "react-native";
import Logo from "@/assets/svg/bb-logo.svg";
import { ThemedButton } from "@/components/button";
import { MachineCameraOverlay } from "@/features/quiz/components/machine-camera-overlay";
import { useQuizScreenContext } from "@/features/quiz/context/quiz-screen-context";

export function SelectMachineScreen() {
    const { setScreen } = useQuizScreenContext();

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Logo width={133} height={64} />
            </View>
            <Text style={{
                color: 'white',
                fontSize: 22.06
            }}>
                SELECT YOUR MACHINE
            </Text>
            <View style={styles.cameraContainer}>
                <CameraView style={styles.camera} facing={facing}>
                    <MachineCameraOverlay />
                </CameraView>
            </View>
            <View style={styles.footerContainer}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 18, opacity: 0.7}}>
                    Line up your espresso machine and take a photo!
                </Text>
                <ThemedButton textType={'small'}>
                    MANUALLY ENTER MACHINE
                </ThemedButton>
                <ThemedButton textType={'small'} onPress={() => setScreen('select-grinder')}>
                    ADD MACHINE LATER
                </ThemedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 53,
        paddingHorizontal: 41,
        gap: 20,
    },
    imageContainer: {
        width: 133,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    cameraContainer: {
        width: '100%',
        height: 434,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        width: '100%',
        height: 434,
        overflow: 'hidden',
    },
    cameraOverlay: {
        width: '100%',
        height: '100%',
        borderWidth: 4,
        borderColor: '#FFF',
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 26,
        gap: 9,
    },
});

