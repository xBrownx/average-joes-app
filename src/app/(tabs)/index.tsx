import { Image, StyleSheet, View, Animated, Button, Linking } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/text/themed-text';
import React, { useEffect } from 'react';
import { TypeWriterText } from '@/components/typewriter';
import { themedColors } from '@/constants/themed-colors';
import { selectUser, useAppSelector } from '@/store';
import { useIsFocused } from '@react-navigation/native';
import { ContactModal } from '@/features/home/contact-modal';
import { RateModal } from '@/features/home/rate-modal';
import { AboutModal } from '@/features/home/about-modal';
import { useCustomState } from '@/hooks/useCustomState';
import { openExternalUrl } from '@/util/open-url';
import { ThemedButton } from '@/components/button';

type HomeScreenState = {
    focused?: boolean;
    username?: string;
    isAboutModalOpen?: boolean;
    isContactModalOpen?: boolean;
    isRateModalOpen?: boolean;
    wave?: boolean;
}


export default function HomeScreen() {

    const username = useAppSelector(selectUser).toUpperCase();
    const focused = useIsFocused();
    const opacity = React.useState(new Animated.Value(0))[0];
    const { state, updateState } = useCustomState<HomeScreenState>({
        username: username,
        isAboutModalOpen: false,
        isContactModalOpen: false,
        isRateModalOpen: false,
        wave: false,
    });

    function fadeInWave() {
        updateState({ wave: true });
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        if (!focused) {
            updateState({ wave: false });
        }
    }, [focused]);

    return (
        <ParallaxScrollView
            headerImage={
                <Image
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.reactLogo}
                />
            } >
            {focused &&
                <View style={styles.content} >
                    <AboutModal
                        isOpen={state.isAboutModalOpen ?? false}
                        onClose={() => updateState({ isAboutModalOpen: false })}
                    />
                    <ContactModal
                        isOpen={state.isContactModalOpen ?? false}
                        onClose={() => updateState({ isContactModalOpen: false })}
                    />
                    <RateModal
                        isOpen={state.isRateModalOpen ?? false}
                        onClose={() => updateState({ isRateModalOpen: false })}
                    />
                    <View style={styles.titleContainer} >
                        <TypeWriterText type={'title'} textArr={[`HELLO ${state.username?.toUpperCase() ?? ''}!`]}
                                        onComplete={() => fadeInWave()} />
                        <Animated.View style={[{ opacity }]} >
                            {state.wave && <HelloWave />}
                        </Animated.View >
                    </View >

                    <View style={styles.stepContainer} >
                        <ThemedText type="subtitle" >Average Joe's Barista Bonanza</ThemedText >
                        <ThemedText >
                            Let us help you dial in, save your setups and teach you some other handy skills.{' '}
                        </ThemedText >
                        <ThemedText >
                            Check out more here:{' '}
                        </ThemedText >
                    </View >
                    <View style={styles.stepContainer} >
                        <ThemedButton
                            title={'ABOUT'}
                            onPress={() => updateState({ isAboutModalOpen: true })}
                        />
                        <ThemedButton
                            title={'SHOP'}
                            onPress={() => openExternalUrl('https://averagejoescoffee.com.au/')}
                        />
                        <ThemedButton
                            title={'CONTACT'}
                            onPress={() => updateState({ isContactModalOpen: true })}
                        />
                        <ThemedButton
                            title={'RATE US'}
                            onPress={() => updateState({ isRateModalOpen: true })}
                        />
                    </View >
                </View >
            }
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 16,
        marginBottom: 8,
    },
    reactLogo: {
        height: '70%',
        width: '60%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
