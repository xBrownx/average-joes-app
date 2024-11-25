import { selectUser, useAppSelector } from '@/store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { useCustomState } from '@/hooks';
import { AboutModal } from '@/features/home/components/about-modal';
import { ContactModal } from '@/features/home/components/contact-modal';
import { RateModal } from '@/features/home/components/rate-modal';
import { TypeWriterText } from '@/components/typewriter';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedButton } from '@/components/button';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ParallaxScrollView from '@/components/parallax-scroll-view';

type HomeScreenState = {
    focused?: boolean;
    username?: string;
    isAboutModalOpen?: boolean;
    isContactModalOpen?: boolean;
    isRateModalOpen?: boolean;
    wave?: boolean;
}

export default function HomeCoreScreen() {

    const navigation = useNavigation<DrawerNavigationProp<any>>();

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
        <>
            {focused &&
                <ParallaxScrollView
                    headerImage={
                        <Image
                            source={require('@/assets/images/small-logo.png')}
                            style={styles.headerImage}
                        />
                    } >
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
                                title={'DIAL IN'}
                                onPress={() => navigation.navigate('dial-in' as never)}
                            />
                            <ThemedButton
                                title={'SHOP'}
                                onPress={() => navigation.navigate('shop' as never)}
                            />
                            <ThemedButton
                                title={'CHAT'}
                                onPress={() => updateState({ isContactModalOpen: true })}
                            />
                            <ThemedButton
                                title={'RATE US'}
                                onPress={() => updateState({ isRateModalOpen: true })}
                            />
                        </View >
                    </View >
                </ParallaxScrollView >
            }
        </>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: '70%',
        width: '60%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 16,
        marginBottom: 8,
    },
    content: {
        backgroundColor: '#1A1313',
        height: '100%',
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
