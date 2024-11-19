import { selectUser, useAppSelector } from "@/store";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useCustomState } from "@/hooks";
import { AboutModal } from "@/features/home/components/about-modal";
import { ContactModal } from "@/features/home/components/contact-modal";
import { RateModal } from "@/features/home/components/rate-modal";
import { TypeWriterText } from "@/components/typewriter";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/text/themed-text";
import { ThemedButton } from "@/components/button";
import { openExternalUrl } from "@/util/open-url";

type HomeScreenState = {
    focused?: boolean;
    username?: string;
    isAboutModalOpen?: boolean;
    isContactModalOpen?: boolean;
    isRateModalOpen?: boolean;
    wave?: boolean;
}

export function HomeCore() {
    const username = useAppSelector(selectUser).toUpperCase();
    const focused = useIsFocused();
    const opacity = React.useState(new Animated.Value(0))[0];
    const {state, updateState} = useCustomState<HomeScreenState>({
        username: username,
        isAboutModalOpen: false,
        isContactModalOpen: false,
        isRateModalOpen: false,
        wave: false,
    });

    function fadeInWave() {
        updateState({wave: true});
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        if (!focused) {
            updateState({wave: false});
        }
    }, [focused]);

    return (
        <>
            {focused &&
                <View style={styles.content}>
                    <AboutModal
                        isOpen={state.isAboutModalOpen ?? false}
                        onClose={() => updateState({isAboutModalOpen: false})}
                    />
                    <ContactModal
                        isOpen={state.isContactModalOpen ?? false}
                        onClose={() => updateState({isContactModalOpen: false})}
                    />
                    <RateModal
                        isOpen={state.isRateModalOpen ?? false}
                        onClose={() => updateState({isRateModalOpen: false})}
                    />
                    <View style={styles.titleContainer}>
                        <TypeWriterText type={'title'} textArr={[`HELLO ${state.username?.toUpperCase() ?? ''}!`]}
                                        onComplete={() => fadeInWave()} />
                        <Animated.View style={[{opacity}]}>
                            {state.wave && <HelloWave />}
                        </Animated.View>
                    </View>

                    <View style={styles.stepContainer}>
                        <ThemedText type="subtitle">Average Joe's Barista Bonanza</ThemedText>
                        <ThemedText>
                            Let us help you dial in, save your setups and teach you some other handy skills.{' '}
                        </ThemedText>
                        <ThemedText>
                            Check out more here:{' '}
                        </ThemedText>
                    </View>
                    <View style={styles.stepContainer}>
                        <ThemedButton
                            title={'ABOUT'}
                            onPress={() => updateState({isAboutModalOpen: true})}
                        />
                        <ThemedButton
                            title={'SHOP'}
                            onPress={() => openExternalUrl('https://averagejoescoffee.com.au/')}
                        />
                        <ThemedButton
                            title={'CONTACT'}
                            onPress={() => updateState({isContactModalOpen: true})}
                        />
                        <ThemedButton
                            title={'RATE US'}
                            onPress={() => updateState({isRateModalOpen: true})}
                        />
                    </View>
                </View>
            }
        </>
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
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
