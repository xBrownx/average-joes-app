import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import React from "react";
import { themedColors } from "@/constants";
import Logo from "@/assets/svg/bb-logo.svg";
import { useQuizScreenContext } from "@/features/quiz/context/quiz-screen-context";
import { ThemedButton } from "@/components/button";

export function WelcomeScreen() {
    const { setScreen } = useQuizScreenContext();
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Logo />
            </View>
            <View style={styles.content}>
                <View style={{alignItems: 'center', gap: 0}}>
                    <ThemedText type={'title'}>
                        WELCOME MARK!
                    </ThemedText>
                    <ThemedText type={'default'}>
                        Let’s build your custom interface.
                    </ThemedText>
                </View>
                <ThemedButton onPress={() => setScreen('select-machine')}>
                    LET'S JOE!
                </ThemedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        gap: 16,
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
    buttonContainer: {
        width: 273,
        height: 33,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themedColors.tertiary,
        borderRadius: 4,
        borderColor: '#FFF',
        borderWidth: 1,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        lineHeight: 36,
        fontFamily: 'Kalam_700Bold'
    },

});