import { Button, StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React, { useEffect } from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/custom-type-writer";
import { FadeUpText } from "@/components/text/fade-up-text";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";
import { DialInScreenProps } from "@/features/dial-in/types";

export function DialInPrepare({onNext, onBack, onExit, onShow, speak}: DialInScreenProps) {

    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);

    const onShowPressed = () => {
        setShow(true);
        onShow();
    }

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1000,
        }).start()
    }

    useEffect(() => {
        const thingToSay = [
            "Cool, lets begin.",
            "Step 1. Prepare your machine",
            "Turn it on and let it get to temp",
            "Then, Run a shot (of just hot water) through the portafilter to heat it up. We want it to be consistently hot all the time",
        ];
        speak(thingToSay)
    }, []);
    //
    return (
        <View>
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />
            <View style={styles.container}>
                <CustomTypeWriter
                    text={["Cool lets begin."]}
                    type={'default'}
                    speed={20}
                    onComplete={fadeInNext}
                    isShow={show}
                >
                    <CustomTypeWriter
                        text={["Step 1 - Prepare your machine"]}
                        type={'primaryBold'}
                        speed={20}
                        onComplete={fadeInNext}
                        isShow={show}
                    >

                        <View style={styles.content}>
                            {[
                                "- Turn it on and let it get to temp",
                                "- Run a shot (of just hot water) through the portafilter to heat it up. We want it to be consistently hot all the time."
                            ].map((text, idx) => (
                                <FadeUpText
                                    key={idx}
                                    text={text}
                                    type={'default'}
                                    delay={idx * 500}
                                />
                            ))}
                            <Animated.View
                                style={[{opacity}, styles.buttonWrapper]}
                            >
                                <Button title={'Next'} color={themedColors.primary} onPress={onNext} />
                            </Animated.View>
                        </View>
                    </CustomTypeWriter>
                </CustomTypeWriter>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 32,
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
});
