import { Button, StyleSheet, View, Animated } from 'react-native';
import { THEME_COLOURS } from '@/constants/theme-colors';
import React, { useEffect } from 'react';
import { CustomTypeWriter } from '@/features/dial-in/components/custom-type-writer';
import { ThemedText } from '@/components/text/themed-text';
import { DialInHeading } from '@/features/dial-in/components/dial-in-heading';
import { AnimatedTabs } from '@/components/tabs/animated-tabs';
import { LinearTransition } from 'react-native-reanimated';
import { FadeInText } from '@/features/dial-in/components/fade-in-text';
import Anim from 'react-native-reanimated';
import { DialInScreenProps } from '@/features/dial-in/types';
import { TipModal } from '@/components/modal';

export function DialInRecipe({ onNext, onBack, onExit, onShow, speak }: DialInScreenProps) {
    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);
    const [tipModalOpen, setTipModalOpen] = React.useState(false);

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1500,
        }).start();
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
    };

    useEffect(() => {
        const thingToSay = [
            'The Recipe',
            'I am going to give you a quick lesson on the fundamentals of dialing in coffee and then we are going to run a shot using these fundamentals. There are 3 variables you need to remember when making coffee. Tap below to learn about each.',
        ];
        speak(thingToSay);
    }, []);

    return (
        <View >
            <TipModal
                isOpen={tipModalOpen}
                onClose={onTipModalClose}
                content={
                    <>
                        <ThemedText >
                            <ThemedText type={'defaultSemiBold'} >DOSE</ThemedText > and <ThemedText
                            type={'defaultSemiBold'} >YIELD</ThemedText > are constant. They always remain the
                            same. <ThemedText type={'defaultSemiBold'} >TIME</ThemedText > is what we adjust.
                        </ThemedText >
                        <ThemedText >
                            <ThemedText type={'defaultSemiBold'} >BORING COFFEE FACT</ThemedText > - Espresso works on a
                            1:2 brew ratio. This means one part ground coffee to 2 parts espresso in the cup, hence 18g
                            to 36g.
                        </ThemedText >
                        <ThemedText >
                            Confused? Great, me too after that. Lets make some coffee and it will start to make sense.
                        </ThemedText >
                    </>
                }
            />
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />
            <View style={styles.container} >
                <CustomTypeWriter
                    text={['The Recipe']}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                    <Anim.View layout={LinearTransition} >
                        <CustomTypeWriter
                            text={['I am going to give you a quick lesson on the fundamentals of dialing in coffee and then we are going to run a shot using these fundamentals - there are 3 variables you need to remember when making coffee. Tap below to learn about each:']}
                            type={'default'}
                            speed={20}
                            onComplete={fadeInNext}
                            isShow={show}
                        >
                            <View style={styles.content} >
                                <AnimatedTabs tabs={['DOSE', 'YIELD', 'TIME']} contents={[
                                    <FadeInText >The amount of ground coffee that goes IN to the basket (18g on your
                                        Machine).</FadeInText >,
                                    <FadeInText >The amount of espresso that comes OUT into your cup (36g on your
                                        Machine).</FadeInText >,
                                    <FadeInText >The TIME it takes to achieve the desired YIELD. 25-30 Seconds. We
                                        adjust
                                        the
                                        grind to get the time into this window.</FadeInText >,
                                ]} />
                            </View >
                        </CustomTypeWriter >
                        <Anim.View layout={LinearTransition} >
                            <Animated.View
                                style={[{ opacity }, styles.buttonWrapper]}
                            >
                                <Button title={'Next'} color={THEME_COLOURS.primary} onPress={onNextPressed} />
                            </Animated.View >
                        </Anim.View >
                    </Anim.View >
                </CustomTypeWriter >
            </View >
        </View >
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
