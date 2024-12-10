import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { ReactNode, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { MachineCameraOverlay } from "@/features/quiz/components/machine-camera-overlay";

export function Camera({children}: { children?: ReactNode }) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
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

    return (
        <CameraView style={styles.camera} facing={facing}>
            {children}
        </CameraView>
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
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    cameraContainer: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    camera: {

        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    cameraOverlay: {
        width: '100%',
        height: '100%',
        borderWidth: 4,
        borderColor: '#FFF',
    },

});