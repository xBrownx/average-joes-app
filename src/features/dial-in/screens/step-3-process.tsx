import { Button, StyleSheet, View, Animated } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React, { useEffect } from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/custom-type-writer";

import { ThemedText } from "@/components/text/themed-text";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";
import { AnimatedTabs } from "@/components/tabs/animated-tabs";
import { FadeInText } from "@/features/dial-in/components/fade-in-text";
import { DialInScreenProps } from "@/features/dial-in/types";

export function DialInProcess({onNext, onBack, onExit, onShow, speak}: DialInScreenProps) {

    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);

    function onShowPressed() {
        setShow(true);
        onShow();
    }

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1500,
        }).start()
    }

    useEffect(() => {
        const thingsToSay = [
            "The Process",
            "Next, lets learn about the process for each step. Tap below to view each step and watch the videos if needed."
        ];
        speak(thingsToSay);
    },[]);

    return (
        <View>
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />
            <View style={styles.container}>
                <CustomTypeWriter
                    text={["The Process"]}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                    <CustomTypeWriter
                        text={["Next, lets learn about the process for each step. Tap below to view each step and watch the videos if needed:"]}
                        type={'default'}
                        speed={20}
                        onComplete={fadeInNext}
                        isShow={show}
                    >
                        <View style={styles.content}>
                            <AnimatedTabs tabs={['DOSE', 'YIELD', 'TIME']} contents={[
                                <>
                                    <FadeInText>
                                        -Remove your warm portafilter from the grouphead and dry the basket with a dry
                                        cloth.
                                    </FadeInText>
                                    <FadeInText>
                                        -Place the group handle on the scales and tare to 0.00.
                                    </FadeInText>
                                    <FadeInText>
                                        -Grind 18g of coffee into you basket settling the coffee as you go so it doesnt
                                        spill everywhere. if you have dosed too much use a spoon to remove the excess
                                        coffee.
                                    </FadeInText>
                                    <FadeInText>
                                        -Use your wdt tool to distribute (if you have one) and Tamp your coffee
                                    </FadeInText>
                                    <FadeInText>
                                        -Insert portafilter into your grouphead
                                    </FadeInText>
                                    <View style={styles.watchVideo}>
                                        <FadeInText>
                                            Tap <ThemedText type={'defaultSemiBold'}>here</ThemedText> to watch video.
                                        </FadeInText>
                                    </View>
                                </>,
                                <>
                                    <FadeInText>
                                        -Grab your scales and place them on your drip tray.
                                    </FadeInText>
                                    <FadeInText>
                                        -Grab a cup and place it on your scales.
                                    </FadeInText>
                                    <FadeInText>
                                        -Tare the scales to 0.
                                    </FadeInText>
                                    <View style={styles.watchVideo}>
                                        <FadeInText>
                                            Tap <ThemedText type={'defaultSemiBold'}>here</ThemedText> to watch video.
                                        </FadeInText>
                                    </View>
                                </>,
                                <>
                                    <FadeInText>
                                        -Run a manual shot on your machine (you may have to look up how to do this).
                                    </FadeInText>
                                    <FadeInText>
                                        -You want to stat the time when you start the shot.
                                    </FadeInText>
                                    <FadeInText>
                                        -You want to manually stop the shot when your scales it 33g and let it drip out
                                        to 36g ( if it over or under by less than 10% that is okay. it is almost
                                        impossible to get it bang on. Chill).
                                    </FadeInText>
                                    <View style={styles.watchVideo}>
                                        <FadeInText>
                                            Tap <ThemedText type={'defaultSemiBold'}>here</ThemedText> to watch video.
                                        </FadeInText>
                                    </View>
                                </>,
                            ]} />
                        </View>
                    </CustomTypeWriter>
                    <Animated.View
                        style={[{opacity}, styles.buttonWrapper]}
                    >
                        <Button title={'Next'} color={themedColors.primary} onPress={onNext} />
                    </Animated.View>
                </CustomTypeWriter>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: themedColors.background,
    },
    content: {
        flex: 1,
        gap: 4,
        marginTop: 8,
        overflow: 'hidden',
    },
    buttonWrapper: {
        marginTop: 16,
    },
    watchVideo: {
      marginTop: 8,
    },
});
