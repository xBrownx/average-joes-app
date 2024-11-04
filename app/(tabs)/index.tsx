import { Image, StyleSheet, View, Animated, Button, Linking } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from "react";
import TypeWriter from "@/components/text/typewriter-text";
import colors from "@/components/colors";
import { selectUser, useAppSelector } from "../../store";
import { useIsFocused } from "@react-navigation/native";
import { ContactModal } from "@/features/home/contact-modal";
import { RateModal } from "@/features/home/rate-modal";
import { AboutModal } from "@/features/home/about-modal";

type HomeScreenState = {
    username: string;
    isAboutModalOpen: boolean;
    isContactModalOpen: boolean;
    isRateModalOpen: boolean;
    wave: boolean;
}
type HomeScreenAction = 'isAboutModalOpen' | 'username' | 'isContactModalOpen' | 'isRateModalOpen' | 'wave' | 'opacity';

const initState = {
    username: '',
    isAboutModalOpen: false,
    isContactModalOpen: false,
    isRateModalOpen: false,
    wave: false,
}


export default function HomeScreen() {
    const focused = useIsFocused();
    const opacity = React.useState(new Animated.Value(0))[0];
    const [state, setState] = React.useState<HomeScreenState>(initState)
    state.username = useAppSelector(selectUser).toUpperCase();

    const updateState = (name: HomeScreenAction, value: any) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    function fadeInWave() {
        updateState('wave', true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    const openExternalUrl = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    useEffect(() => {
        if (!focused) {
            updateState('wave', false);
        }
    }, [focused]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: colors.background, dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            {focused &&
                <View style={styles.content}>
                    <AboutModal
                        isOpen={state.isAboutModalOpen}
                        onClose={() => updateState('isAboutModalOpen', false)}
                    />
                    <ContactModal
                        isOpen={state.isContactModalOpen}
                        onClose={() => updateState('isContactModalOpen', false)}
                    />
                    <RateModal
                        isOpen={state.isRateModalOpen}
                        onClose={() => updateState('isRateModalOpen', false)}
                    />
                    <ThemedView style={styles.titleContainer}>
                        <TypeWriter textStyle={'title'} textArr={[`HELLO ${state.username.toUpperCase()}!`]}
                                    onComplete={() => fadeInWave()} />
                        <Animated.View style={[{opacity}]}>
                            {state.wave && <HelloWave />}
                        </Animated.View>
                    </ThemedView>

                    <ThemedView style={styles.stepContainer}>
                        <ThemedText type="subtitle">Average Joe's Barista Bonanza</ThemedText>
                        <ThemedText>
                            Let us help you dial in, save your setups and teach you some other handy skills.{' '}
                        </ThemedText>
                        <ThemedText>
                            Check out more here:{' '}
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'ABOUT'} color={colors.primary} onPress={() => updateState('isAboutModalOpen', true)} />
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'SHOP'} color={colors.primary}
                                onPress={() => openExternalUrl('https://averagejoescoffee.com.au/')} />
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'CONTACT'} color={colors.primary} onPress={() => updateState('isContactModalOpen', true)} />
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'RATE US'} color={colors.primary} onPress={() => updateState('isRateModalOpen', true)} />
                    </ThemedView>
                </View>
            }
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: "70%",
        width: "60%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
