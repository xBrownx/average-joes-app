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
import { FadeIn, LinearTransition } from "react-native-reanimated";
import { FadeInText } from "@/features/dial-in/components/fade-in-text";
import Anim from "react-native-reanimated";
import { ModalTip } from "@/features/dial-in/components/modal-tip";
import { DialInScreenProps } from "@/features/dial-in/types";

export function DialInRecipe({onNext, onBack, onExit, onShow, speak}: DialInScreenProps) {
    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);
    const [tipModalOpen, setTipModalOpen] = React.useState(false);

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1500,
        }).start()
    }

    function onShowPressed() {
        setShow(true);
        onShow();
    }

    const onNextPressed = () => {
        setTipModalOpen(true);
    };

    const onTipModalClose = () => {
        onNext();
    }

    useEffect(() => {
        const thingToSay = [
            "The Recipe",
            "I am going to give you a quick lesson on the fundamentals of dialing in coffee and then we are going to run a shot using these fundamentals. There are 3 variables you need to remember when making coffee. Tap below to learn about each."
        ];
        speak(thingToSay);
    }, []);

    return (
        <View>
            <ModalTip isOpen={tipModalOpen} onClose={onTipModalClose} />
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />
            <View style={styles.container}>
                <CustomTypeWriter
                    text={["The Recipe"]}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                    <Anim.View layout={LinearTransition}>
                        <CustomTypeWriter
                            text={["I am going to give you a quick lesson on the fundamentals of dialing in coffee and then we are going to run a shot using these fundamentals - there are 3 variables you need to remember when making coffee. Tap below to learn about each:"]}
                            type={'default'}
                            speed={20}
                            onComplete={fadeInNext}
                            isShow={show}
                        >
                            <View style={styles.content}>
                                <AnimatedTabs tabs={['DOSE', 'YIELD', 'TIME']} contents={[
                                    <FadeInText>The amount of ground coffee that goes IN to the basket (18g on your
                                        Machine).</FadeInText>,
                                    <FadeInText>The amount of espresso that comes OUT into your cup (36g on your
                                        Machine).</FadeInText>,
                                    <FadeInText>The TIME it takes to achieve the desired YIELD. 25-30 Seconds. We adjust
                                        the
                                        grind to get the time into this window.</FadeInText>,
                                ]} />
                            </View>
                        </CustomTypeWriter>
                        <Anim.View layout={LinearTransition}>
                            <Animated.View
                                style={[{opacity}, styles.buttonWrapper]}
                            >
                                <Button title={'Next'} color={themedColors.primary} onPress={onNextPressed} />
                            </Animated.View>
                        </Anim.View>
                    </Anim.View>
                </CustomTypeWriter>
            </View>
        </View>
    )
        ;
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
