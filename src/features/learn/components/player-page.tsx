import YoutubePlayer from "react-native-youtube-iframe";
import React, { useState } from "react";
import { Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themedColors } from "@/constants/themed-colors";
import { ThemedText } from "@/components/text/themed-text";

const {width} = Dimensions.get('window');

export function LearnPlayerPage({title, videoId, navBack}: {
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
                    color={themedColors.primary}
                    onPress={navigateBack}
                />
                <ThemedText type="subtitle">
                    {title}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.content}>
                {videoLoading && <ActivityIndicator style={styles.spinner} size="large" color={themedColors.primary} />}
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


