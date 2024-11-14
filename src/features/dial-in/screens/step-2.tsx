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
import { AnimatedTabs } from "@/components/tabs/animated-tabs";

export function StepTwo({onNext, onBack}: { onNext: () => void, onBack: () => void }) {
    const tts = useTextToSpeech();
    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1500,
        }).start()
    }

    function onShow() {
        tts.stop();
        setShow(true);
    }

    const onBackPressed = () => {
        tts.stop();
        onBack();
    };

    useEffect(() => {
        const thingToSay = [
            "The Recipe",
            "I am going to give you a quick lesson on the fundamentals of dialing in coffee and then we are going to run a shot using these fundamentals - there are 3 variables you need to remember when making coffee:"
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
                    text={["The Recipe"]}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                <CustomTypeWriter
                    text={CONSTANTS.recipe}
                    type={'default'}
                    speed={20}
                    onComplete={fadeInNext}
                    isShow={show}
                >
                    <AnimatedTabs tabs={['DOSE', 'YIELD', 'TIME']} contents={[
                        <ThemedText>HELLO</ThemedText>,
                        <ThemedText>IS IT ME</ThemedText>,
                        <ThemedText>HELLO</ThemedText>,
                    ]} />
                    {/*<View style={styles.content}>*/}
                    {/*    {CONSTANTS.recipeSub.map((text, idx) => (*/}
                    {/*        <FadeUpText*/}
                    {/*            key={idx}*/}
                    {/*            text={text}*/}
                    {/*            type={'default'}*/}
                    {/*            delay={idx * 500}*/}
                    {/*        />*/}
                    {/*    ))}*/}

                    {/*</View>*/}
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
