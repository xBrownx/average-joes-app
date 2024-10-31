import YoutubePlayer from "react-native-youtube-iframe";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, ActivityIndicator, Animated, Easing } from "react-native";
import { AddMachineModal } from "@/features/recipes/components/add-machine-modal";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/components/colors";
import { ThemedText } from "@/components/text/themed-text";
import CardView from "@/components/card/card-view";
import SlideForwardView, { SlideView } from "@/components/anim/slide-forward";

const {width} = Dimensions.get('window');

export default function LearnPlayerPage({title, videoId, navBack}: {
    title: string,
    videoId: string,
    navBack: () => void
}) {
    const [videoLoading, setVideoLoading] = useState(false);
    React.useEffect(() => {
        setVideoLoading(true)
    }, [videoId])

    const navigateBack = () => {
        navBack()
    }

    return (
        <ThemedView>
            <ThemedView style={styles.titleContainer}>
                <Ionicons.Button
                    name="arrow-back"
                    size={24}
                    backgroundColor={'transparent'}
                    color={colors.primary}
                    onPress={navigateBack}
                />
                <ThemedText type="subtitle">
                    {title}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.content}>
                {videoLoading && <ActivityIndicator style={styles.spinner} size="large" color={colors.primary} />}
                <YoutubePlayer
                    height={200}
                    width={width - 64}
                    videoId={videoId}
                    onReady={() => setVideoLoading(false)}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 32,
        gap: 16,
        overflow: 'hidden',
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    spinner: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 75,
        width: '100%',
    }
});


