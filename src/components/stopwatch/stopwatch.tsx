import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { ThemedText } from "@/components/text/themed-text";
import { useCustomState } from "@/hooks";
import { THEME_COLOURS } from "@/constants/theme-colors";

type CF = ({ 0: `#${string}`; } & { 1: `#${string}`; } & `#${string}`[])
type Colour = `#${string}`
type TimeColour = { 0: number; } & { 1: number; } & number[];

const red: Colour = '#ce2127';
const orange: Colour = '#F7B801';
const yellow: Colour = '#EEFF00';
const green: Colour = '#00FF00';


const TIME_LIMIT = 45;

interface StopWatchState {
    key?: number;
    isPlaying?: boolean;
    isPause?: boolean;
    remainingTime?: number;
}

type StopwatchProps = {
    onStart: () => void;
    onStop: () => void
}

export function Stopwatch({onStart, onStop}: StopwatchProps) {
    const {state, updateState} = useCustomState<StopWatchState>({
        key: 0,
        isPlaying: false,
        isPause: false,
        remainingTime: 45,
    });

    const startStopwatch = () => {
        updateState({
            isPlaying: true,
            isPause: false,
        });
        onStart();
    }

    const pauseStopwatch = () => {
        updateState({
            isPlaying: false,
            isPause: true,
        });
        onStop();
    }

    const resetStopwatch = () => {
        updateState({
            isPlaying: false,
            isPause: false,
            key: Math.random(),
            remainingTime: 45,
        });
    }

    const onOvertime = () => {
        console.log()
    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                key={state.key}
                isPlaying={state.isPlaying ?? false}
                duration={TIME_LIMIT}
                colors={[red, orange, green, yellow, orange, red]}
                colorsTime={[45, 22, 20, 15, 10, 0]}  // 0 20 25 30 35 45
                initialRemainingTime={state.remainingTime}
                onUpdate={(remainingTime: number) => {updateState({remainingTime: remainingTime})}}
            >
                {() => {
                    return (
                        <TouchableOpacity
                            style={[styles.button, state.isPlaying ? styles.buttonPause : state.isPause ? styles.buttonReset : styles.buttonPlay]}
                            onPress={state.isPlaying ? pauseStopwatch : (state.isPause ? resetStopwatch : startStopwatch)}
                        >
                            <ThemedText
                                type='primaryBold'
                                style={styles.buttonText}
                            >
                                {state.isPlaying ? 'STOP' : (state.isPause ? 'RESET' : 'START')}
                            </ThemedText>
                        </TouchableOpacity>
                    );
                }}
            </CountdownCircleTimer>

            <View style={styles.buttonContainer}>
                <ThemedText type='subtitle'>
                    {TIME_LIMIT - state.remainingTime!}
                </ThemedText>
            </View>
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: "green",
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
        color: "blue",
    },
    timeText: {
        fontSize: 48,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonPlay: {
        backgroundColor: THEME_COLOURS.secondary
    },
    buttonPause: {
        backgroundColor: THEME_COLOURS.primary
    },
    buttonReset: {
        backgroundColor: THEME_COLOURS.tertiary
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});