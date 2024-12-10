import { ImageBackground, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '@/assets/svg/bb-logo.svg'
import React, { PropsWithChildren, useState } from "react";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";
import { SelectMachineScreen } from "@/features/quiz/screens/select-machine-screen";
import { QuizScreen } from "@/features/quiz/types/types";
import { WelcomeScreen } from "@/features/quiz/screens/welcome-screen";
import { QuizScreenContextProvider, useQuizScreenContext } from "@/features/quiz/context/quiz-screen-context";
import { SelectGrinderScreen } from "@/features/quiz/screens/select-grinder-screen";
import { SelectRoastScreen } from "@/features/quiz/screens/select-roast-screen";
import { SelectCoffeeScreen } from "@/features/quiz/screens/select-coffee-screen";
import { LoadingScreen } from "@/features/quiz/screens/loading-screen";
import { SelectHelpScreen } from "@/features/quiz/screens/select-help-screen";

function QuizCore() {
    const {screen} = useQuizScreenContext();
    return (
        <ImageBackground source={require('@/assets/images/background.png')} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                {{
                    'welcome': <WelcomeScreen />,
                    'select-machine': <SelectMachineScreen />,
                    'select-grinder': <SelectGrinderScreen />,
                    'select-roast': <SelectRoastScreen />,
                    'select-coffee': <SelectCoffeeScreen />,
                    'select-help': <SelectHelpScreen />,
                    'loading': <LoadingScreen />,
                }[screen]}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default function QuizCoreScreen() {

    return (
        <QuizScreenContextProvider>
            <QuizCore />
        </QuizScreenContextProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        padding: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
});