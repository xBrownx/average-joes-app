import { StyleSheet, Image, View } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React from "react";
import { LearnLandingPage } from "@/features/learn/components/landing-page";
import { LearnPlayerPage } from "@/features/learn/components/player-page";
import Animated, {
    LayoutAnimationConfig,
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight
} from 'react-native-reanimated';

export default function Learn() {
    const [videoScreen, setVideoScreen] = React.useState(false);
    const [videoTitle, setVideoTitle] = React.useState('');
    const [videoId, setVideoId] = React.useState('');
    const navToVideo = (title: string, videoId: string) => {
        setVideoScreen(true);
        setVideoTitle(title);
        setVideoId(videoId);
    }

    const navBack = () => {
        setVideoScreen(false);
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#353636'}}
            headerImage={<Image
                source={require('@/assets/images/avatar.png')}
                style={styles.headerImage}
            />}>
            <View style={styles.container} >
                <LayoutAnimationConfig skipEntering>
                {!videoScreen &&
                    <Animated.View id={'1'} entering={SlideInLeft} exiting={SlideOutLeft}>
                        <LearnLandingPage navToVideo={navToVideo} />
                    </Animated.View>
                }
                {videoScreen &&
                    <Animated.View id={'2'} entering={SlideInRight} exiting={SlideOutRight}>
                        <LearnPlayerPage title={videoTitle} videoId={videoId} navBack={navBack} />
                    </Animated.View>
                }
                </LayoutAnimationConfig>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
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
