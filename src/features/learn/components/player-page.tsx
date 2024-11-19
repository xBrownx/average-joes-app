import YoutubePlayer from "react-native-youtube-iframe";
import React, { useState } from "react";
import { Dimensions, StyleSheet, ActivityIndicator, View } from "react-native";
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
        <View>
            <View style={styles.titleContainer}>
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
            </View>
            <View style={styles.content}>
                {videoLoading &&
                    <ActivityIndicator
                        style={styles.spinner}
                        size="large"
                        color={themedColors.primary}
                    />
                }
                <YoutubePlayer
                    height={200}
                    width={width - 64}
                    videoId={videoId}
                    onReady={() => setVideoLoading(false)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
    },
    spinner: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 75,
        width: '100%',
    }
});


