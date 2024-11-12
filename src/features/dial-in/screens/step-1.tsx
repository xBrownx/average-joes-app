import { Button, StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React, { useEffect } from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/custom-type-writer";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FadeUpText } from "@/components/text/fade-up-text";
import { ThemedText } from "@/components/text/themed-text";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";
import { useTextToSpeech } from '@/hooks/useTextToSpeech';



export function StepOne({onNext, onBack}: { onNext: () => void, onBack: () => void }) {
    const tts = useTextToSpeech();
    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1000,
        }).start()
    }

    const onShow = () => {
        tts.stop();
        setShow(true);
    };

    const onBackPressed = () => {
        tts.stop();
        onBack();
    };

    useEffect(() => {
        const thingToSay = [
            "Cool, lets begin.",
            "Step 1. Prepare your machine",
            "<speak><break time='0.2s'/>Turn it on and let it get to temp</speak>",
            "<speak><break time='0.2s'/>Then, Run a shot (of just hot water) through the portafilter to heat it up. We want it to be consistently hot all the time</speak>",
        ];
        tts.speak(thingToSay);
    }, []);

    return (
        <View>
            <DialInHeading
                onBack={onBackPressed}
                onShow={onShow}
                icon={'back'}
            />
            <View style={styles.container}>
                <CustomTypeWriter
                    text={["Cool lets begin.", "Step 1 - Prepare your machine"]}
                    type={'primaryBold'}
                    speed={20}
                    onComplete={fadeInNext}
                    isShow={show}
                >
                    <View style={styles.content}>
                        {CONSTANTS.qThreeSub.map((text, idx) => (
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

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 16,
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
