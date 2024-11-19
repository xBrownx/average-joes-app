import { StyleSheet, Animated } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React, { useEffect, useState } from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/custom-type-writer";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";
import { Stopwatch } from "@/components/stopwatch";
import { DialInScreenProps } from "@/features/dial-in/types";
import Anim, { FadeIn, FadeOut, LinearTransition, StretchOutY } from "react-native-reanimated"

export function DialInPullShot({onNext, onBack, onExit, onShow, speak}: DialInScreenProps) {
    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [textShow, setTextShow] = React.useState(true);
    const [showResult, setShowResult] = React.useState(false);

    const onShowPressed = () => {
        setShow(true);
        onShow();
    }

    const onStartStopwatch = () => {
        setTextShow(false);
        setShow(false);
    }

    const onStopStopwatch = () => {
        setShowResult(true);
        speak(["Holy fucking shit, that was mad! I have a raging robot boner right now. If I wasn't stuck in this shitty phone, I'd come over to your house and water your plants.", "I mean.. Good job"]);
    }

    useEffect(() => {
        const thingsToSay = [
            "okay! Looks like you're ready to pull your first shot.",
            "With your cup on the scales, lets time how long it takes to get to a 36 gram yield.",
            "Remember, we're aiming for between 25 and 30 seconds."
        ];
        speak(thingsToSay);
    }, []);

    return (
        <Anim.View layout={LinearTransition.delay(200)}>
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />
            <Anim.View
                style={styles.container}
                layout={LinearTransition.delay(0)}
            >
                {textShow &&
                    <Anim.View
                        exiting={StretchOutY.duration(100)}
                    >
                        <CustomTypeWriter
                            text={["Okay, looks like you're ready to pull your first shot! With your cup on the scales, lets time how long it takes to get to the a 36g yield.", "Remember, we're aiming for between 25 and 30 seconds."]}
                            type={'default'}
                            speed={30}
                            isShow={show}
                            onComplete={() => setShowStopwatch(true)}
                        />
                    </Anim.View>
                }
                {showStopwatch &&
                    <Anim.View
                        style={styles.stopwatchContainer}
                        entering={FadeIn.duration(500).delay(500)}
                        layout={LinearTransition.delay(0)}
                    >
                        <Stopwatch
                            onStart={onStartStopwatch}
                            onStop={onStopStopwatch}
                        />
                    </Anim.View>
                }
                {showResult &&
                    <Anim.View>
                        <CustomTypeWriter
                            text={["Holy fucking shit, that was mad! I have a raging robot boner right now. If I wasn't stuck in this shitty phone, I'd come over to your house and water your plants.", "I mean.. Good job"]}
                            type={'default'}
                            speed={30}
                            isShow={show}
                            onComplete={() => setShowStopwatch(true)}
                        />
                    </Anim.View>
                }
            </Anim.View>
        </Anim.View>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 32,
        backgroundColor: themedColors.background,
        gap: 32,
    },
    stopwatchContainer: {
        flex: 1,
        gap: 4,
        marginTop: 16,
        overflow: 'hidden',
    },
});
