import YoutubePlayer from "react-native-youtube-iframe";
import React from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import SlideBackView from "@/components/anim/slide-back";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SlideView } from "@/components/anim/slide-forward";

const {width} = Dimensions.get('window');

function VideoLink({title, navigateToVideo}: { title: string, navigateToVideo: () => void }) {
    return (
        <TouchableOpacity
            style={styles.heading}
            onPress={navigateToVideo}
        >
            <ThemedText
                type={'defaultSemiBold'}
                style={{color: colors.tertiary, fontSize: 14}}
            >
                {title}
            </ThemedText>
            <Ionicons
                name={'chevron-forward-outline'}
                size={18}
                color={colors.tertiary}
            />
        </TouchableOpacity>
    );
}

export default function LearnLandingPage({navToVideo}: {
    navToVideo: (videoTitle: string, videoId: string) => void
}) {
    return (
        <ThemedView style={styles.content}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Joe's Learning Centre</ThemedText>
            </ThemedView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="default">Learn like a pro with Joe's step by step tutorial videos.</ThemedText>
            </ThemedView>

            <VideoLink
                title={'1: WHAT\'S TO COME'}
                navigateToVideo={() => navToVideo('WHAT\'S TO COME', 'ruZFxIWyzlY')}
            />

            <VideoLink
                title={'2: THE GEAR YOU NEED'}
                navigateToVideo={() => navToVideo('THE GEAR YOU NEED', '_1iLqkSPnso')}
            />

            <VideoLink
                title={'3: THE PERFECT SHOT - DIALING IN'}
                navigateToVideo={() => navToVideo('THE PERFECT SHOT - DIALING IN', 'ZYeDds-IHDU')}
            />

            <VideoLink
                title={'4: THE ‘RIP, DIP ‘N’ WHIP’ TECHNIQUE'}
                navigateToVideo={() => navToVideo('THE ‘RIP, DIP ‘N’ WHIP’ TECHNIQUE', 'Sv2OlBPKoxM')}
            />

            <VideoLink
                title={'5: MAKE IT PRETTY, LATTE ART - THE HEART'}
                navigateToVideo={() => navToVideo('MAKE IT PRETTY, LATTE ART \nTHE HEART', 'kKlPdbixeBM')}
            />

            <VideoLink
                title={'6: UPKEEP - IT’S NO JOKE!'}
                navigateToVideo={() => navToVideo('UPKEEP - IT’S NO JOKE!', 'bejf9JIqgrs')}
            />

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "70%",
        width: "60%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
    },
});


