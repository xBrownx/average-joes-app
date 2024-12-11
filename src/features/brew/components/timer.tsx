import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import { useRef, useState } from "react";
import AnimateNumber from 'react-native-animate-number'
import { setValue } from "reselect/src/autotrackMemoize/autotracking";

const timerOptions = [
    ['UNDER EXTRACTED', '(SOUR)'],
    ['GETTING CLOSER', '(SOUR)'],
    ['DRINKABLE', null],
    ['PERFECT!', null],
    ['OVER EXTRACTED', '(BITTER)'],
    ['OH NO!', null],
    ["OOPS! YOU/'VE OVERCOOKED THIS ONE", null],
]

export function BrewTimer() {
    const [time, setTime] = useState(0);
    const [millis, setMillis] = useState(0);
    const [stopMillis, setStopMillis] = useState(0);
    const [isTimerRunning, setTimerRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval>>();
    const startTimeRef = useRef(0);

    const [timerText, setTimerText] = useState<string | null>(null);
    const [timerSubtitle, setTimerSubtitle] = useState<string | null>(null);

    const startTimer = () => {
        setMillis(1000);
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setMillis(1000);
            setTime(Math.floor((Date.now() -
            startTimeRef.current) / 1000));
        }, 1000);
        setTimerRunning(true);
    }
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setTimerRunning(false);
    };


    const onStart = () => {
        if(isTimerRunning) {
            resetTimer();
        } else {
            startTimer();
        }
        setTimerText(timerOptions[0][0] as string);
        setTimerSubtitle(timerOptions[0][1] as string);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onStart}
                style={styles.timer}
            >
                {!isTimerRunning ?
                    <ThemedText
                    type={'subtitle'}
                    style={styles.start}
                >
                    START
                </ThemedText>
                : <View style={styles.descriptionContainer}>
                    <ThemedText
                        type={'subtitle'}
                        style={styles.descriptionText}
                    >
                        {timerText}
                    </ThemedText>
                    {timerSubtitle &&
                        <ThemedText
                            type={'subtitle'}
                            style={styles.descriptionSubtext}
                        >
                            {timerSubtitle}
                        </ThemedText>
                    }
                </View>
                }
            </TouchableOpacity>
            <ThemedText type={'subtitle'} style={styles.timerText}>
                {time.toString().padStart(2, '0')}:
                {isTimerRunning ? <AnimateNumber
                    key={time}
                    value={millis}
                    startFrom={0}
                    interval={10}
                    formatter={(value: number) => {
                        return (value / 10)
                            .toFixed(0)
                            .toString()
                            .padStart(2, '0')
                    }
                }
                /> :
                    '00'
                }
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        gap: 16,
        alignItems: "center",
    },
    timer: {
        width: 250,
        height: 250,
        backgroundColor: "#D92A2A",
        borderRadius: 125,
        borderWidth: 8,
        borderColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
    },
    start: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descriptionSubtext: {
        fontSize: 18,
        fontWeight: 'light',
    },
    timerText: {
        fontSize: 50,
    },
})