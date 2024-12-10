import { View, StyleSheet, ImageBackground } from "react-native";
import Logo from "@/assets/svg/bb-logo.svg";
import React, { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export function ThemedScreen({children}: PropsWithChildren) {
    return (
        <ImageBackground style={styles.container} source={require('@/assets/images/background.png')} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
})