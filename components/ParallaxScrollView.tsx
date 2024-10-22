import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import Footer from "@/components/Footer";
import colors from "@/components/colors";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
                                               children,
                                               headerImage,
                                               headerBackgroundColor,
                                           }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <Footer >
            <ThemedView style={styles.container} >
                <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} >
                    <Animated.View
                        style={[
                            styles.header,
                            {backgroundColor: colors.backgroundSecondary},
                            headerAnimatedStyle,
                        ]} >
                        {headerImage}
                    </Animated.View >

                    <ThemedView style={styles.content} >
                        {children}</ThemedView >

                </Animated.ScrollView >
            </ThemedView >
        </Footer >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
        justifyContent: "center"
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
