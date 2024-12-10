import { selectUser, useAppSelector } from '@/store';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Animated, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useCustomState } from '@/hooks';
import { AboutModal } from '@/features/home/components/_about-modal';
import { ContactModal } from '@/features/home/components/_contact-modal';
import { RateModal } from '@/features/home/components/_rate-modal';
import { TypeWriterText } from '@/components/typewriter';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedButton } from '@/components/button';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { THEME_COLOURS } from "@/constants";
import { AutoScaledImage } from "@/components/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Rewards } from "@/features/home/components/rewards";
import { ThemedScreen } from "@/components/layout/Themed-Screen";
import { Menu } from "@/features/home/components/menu";
import { FeaturedBeans } from "@/features/home/components/featured-beans";

type HomeScreenState = {
    focused?: boolean;
    isAboutModalOpen?: boolean;
    isContactModalOpen?: boolean;
    isRateModalOpen?: boolean;
    wave?: boolean;
}

export default function HomeCoreScreen() {


    const username = useAppSelector(selectUser).toUpperCase();

    const {state, updateState} = useCustomState<HomeScreenState>({
        isAboutModalOpen: false,
        isContactModalOpen: false,
        isRateModalOpen: false,
        wave: false,
    });

    return (
        <ThemedScreen>
            <View style={styles.container}>
                <View style={styles.title}>
                    <TypeWriterText type={'title'} textArr={[`WELCOME ${username?.toUpperCase() ?? 'STRANGER'}!`]} />
                </View>

                <View style={styles.rewards}>
                    <Rewards />
                </View>

                <View style={styles.menu}>
                    <Menu />
                </View>

                <View style={styles.featuredBeans}>
                    <FeaturedBeans />
                </View>
            </View>
        </ThemedScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 25,
    },
    title: {
        alignItems: "center",
        paddingHorizontal: 60,
    },
    rewards: {
        paddingHorizontal: 60,
    },
    menu: {
        paddingHorizontal: 60,
    },
    featuredBeans: {},
});
