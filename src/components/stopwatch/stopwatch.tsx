import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { ThemedText } from "@/components/text/themed-text";
import { useCustomState } from "@/hooks/useCustomState";
import { themedColors } from "@/constants/themed-colors";

type CF = ({0: `#${string}`; } & {1: `#${string}`; } & `#${string}`[])
type Colour = `#${string}`
type TimeColour = { 0: number; } & { 1: number; } & number[];

const red: Colour = '#ce2127';
const orange: Colour = '#F7B801';
const yellow: Colour = '#EEFF00';
const green: Colour = '#00FF00';



const underColours:CF = [red, red, orange, yellow, green];
const overColours: CF = ['#0000ff', '#0000ff', '#ffffff', '#ff00ff', red];

const underTimeColours: TimeColour = [30, 15, 10, 5, 0];

interface StopWatchState {
    key?: number;
    isPlaying?: boolean;
    isPause?: boolean;
    isGrowing?: boolean;
    rotation?: 'clockwise' | 'counterclockwise'
    colours?: CF;
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
        isGrowing: false,
        rotation: 'clockwise',
        colours: underColours,
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
            rotation: 'clockwise',
            isGrowing: false,
            isPlaying: false,
            isPause: false,
            colours: underColours,
            key: Math.random()
        });
    }

    const onOvertime = () => {
        console.log()
        updateState({
            isGrowing: !state.isGrowing,
            rotation: !state.isGrowing ? 'counterclockwise' : 'clockwise',
            colours: !state.isGrowing ? underColours : underColours,
            key: Math.random(),
        });

    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                key={state.key}
                isPlaying={state.isPlaying?? false}
                duration={30}
                colors={state.colours!}
                colorsTime={underTimeColours}
                isGrowing={state.isGrowing!}
                rotation={state.rotation!}
                isSmoothColorTransition
                onComplete={() => {
                    onOvertime()
                }}
            >
                {({remainingTime}) => <ThemedText type='subtitle'>{state.isGrowing ? `${30 + remainingTime}` : remainingTime}</ThemedText>}
            </CountdownCircleTimer>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, state.isPlaying ? styles.buttonPause : state.isPause ? styles.buttonReset : styles.buttonPlay ]}
                    onPress={state.isPlaying ? pauseStopwatch : (state.isPause ? resetStopwatch : startStopwatch)}
                >
                    <ThemedText
                        type='primaryBold'
                        style={styles.buttonText}
                    >
                        {state.isPlaying ? 'STOP' : (state.isPause ? 'RESET' : 'START')}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        backgroundColor: themedColors.secondary
    },
    buttonPause: {
        backgroundColor: themedColors.primary
    },
    buttonReset: {
        backgroundColor: themedColors.tertiary
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});