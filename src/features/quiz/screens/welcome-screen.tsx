import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/text';
import React from 'react';
import { themedColors } from '@/constants';
import Logo from '@/assets/svg/bb-logo.svg';
import { useQuizScreenContext } from '@/features/quiz/context/quiz-screen-context';
import { ThemedButton } from '@/components/button';

export function WelcomeScreen() {
    const { setScreen } = useQuizScreenContext();
    return (
        <View style={styles.container} >
            <View style={styles.imageContainer} >
                <Logo />
            </View >
            <View style={styles.content} >
                <View style={styles.textContainer} >
                    <ThemedText type={'title'} color={'light'}>
                        WELCOME MARK!
                    </ThemedText >
                    <ThemedText type={'default'} color={'light'}>
                        Let’s build your custom interface.
                    </ThemedText >
                </View >
                <View style={styles.buttonContainer} >
                    <ThemedButton onPress={() => setScreen('select-machine')} >
                        LET'S JOE!
                    </ThemedButton >
                </View >
            </View >
        </View >
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
    textContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 60,
    }

});