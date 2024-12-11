import { selectUser, useAppSelector } from '@/store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCustomState } from '@/hooks';
import { TypeWriterText } from '@/components/typewriter';
import { Rewards } from "@/features/home/components/rewards";
import { ThemedScreen } from "@/components/layout/themed-screen";
import { Menu } from "@/features/home/components/menu";
import { FeaturedBeans } from "@/features/home/components/featured-beans";
import { HomeProps } from "@/navigation/types";

type HomeScreenState = {
    focused?: boolean;
    isAboutModalOpen?: boolean;
    isContactModalOpen?: boolean;
    isRateModalOpen?: boolean;
    wave?: boolean;
}

export default function HomeCoreScreen({ route, navigation }: HomeProps) {
    const username = useAppSelector(selectUser).toUpperCase();
    const { enterDir } = route.params;
    const {state, updateState} = useCustomState<HomeScreenState>({
        isAboutModalOpen: false,
        isContactModalOpen: false,
        isRateModalOpen: false,
        wave: false,
    });

    return (
        <ThemedScreen enterDir={enterDir} >
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
