import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text/themed-text";
import { themedColors } from "@/constants/themed-colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TypeWriterText } from "@/components/typewriter";
import { useIsFocused } from "@react-navigation/native";

const videoList = [
    {
        index: '1',
        videoTitle: 'WHAT\'S TO COME',
        videoId: 'ruZFxIWyzlY'
    },
    {
        index: '2',
        videoTitle: 'THE GEAR YOU NEED',
        videoId: '_1iLqkSPnso'
    },
    {
        index: '3',
        videoTitle: 'THE PERFECT SHOT - \nDIALING IN',
        videoId: 'ZYeDds-IHDU'
    },
    {
        index: '4',
        videoTitle: 'THE ‘RIP, DIP ‘N’ WHIP’ TECHNIQUE',
        videoId: 'Sv2OlBPKoxM'
    },
    {
        index: '5',
        videoTitle: 'MAKE IT PRETTY, LATTE\nART THE HEART',
        videoId: 'kKlPdbixeBM'
    },
    {
        index: '6',
        videoTitle: 'UPKEEP - IT’S NO JOKE!',
        videoId: 'bejf9JIqgrs'
    },
]

export function LearnLandingPage({navToVideo}: {
    navToVideo: (videoTitle: string, videoId: string) => void
}) {
    const focused = useIsFocused();
    return (
        <>{focused &&
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <TypeWriterText type={'title'} textArr={["LEARNING CENTRE"]} />
                </View>
                <View style={styles.titleContainer}>
                    <ThemedText type="default">Learn like a pro with Joe's step by step tutorial videos.</ThemedText>
                </View>
                {videoList.map(video => (
                    <TouchableOpacity
                        key={video.videoId}
                        style={styles.cardContainer}
                        onPress={() => navToVideo(video.videoTitle, video.videoId)}
                    >
                        <View style={styles.cardContents}>
                            <ThemedText
                                style={styles.cardText}
                                type={'defaultSemiBold'}
                            >
                                {video.index}: {video.videoTitle}
                            </ThemedText>
                            <Ionicons.Button
                                name="arrow-forward"
                                size={24}
                                backgroundColor={'transparent'}
                                color={themedColors.tertiary}
                            />
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        }</>
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

    cardContainer: {
        elevation: 1,
        borderRadius: 10,
        backgroundColor: themedColors.backgroundSecondary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
    },
    cardContents: {
        width: '100%',
        padding: 16,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    cardText: {
        color: themedColors.tertiary,
        fontSize: 18
    },
});


