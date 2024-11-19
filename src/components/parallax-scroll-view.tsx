import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';
import { themedColors } from '@/constants/themed-colors';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView(
    {
        children,
        headerImage,
    }: Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (

        <View style={styles.container} >
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} >
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: themedColors.backgroundSecondary },
                        headerAnimatedStyle,
                    ]} >
                    {headerImage}
                </Animated.View >
                <View style={{ height: '100%', backgroundColor: themedColors.background }} >
                    {children}
                </View >
            </Animated.ScrollView >
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themedColors.background,
    },
    header: {
        height: 250,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
