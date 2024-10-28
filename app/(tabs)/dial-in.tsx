import { Image, StyleSheet, Platform, View, Animated, Button } from 'react-native';
import 'react-native-gesture-handler';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";
import TypeWriter from "@/components/TypeWriter";
import colors from "@/components/colors";

export default function DialIn() {
    const [wave, setWave] = React.useState(false);
    const opacity = React.useState(new Animated.Value(0))[0];
    function fadeInWave() {
        setWave(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/dial-in-2.png')}
                    style={styles.reactLogo}
                />
            } >
            <ThemedView style={styles.titleContainer} >
                <TypeWriter textArr={["WELCOME xxx"]} onComplete={() => fadeInWave()}/>
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText >
                    I am{' '}
                    <ThemedText type={"defaultSemiBold"}>
                        Joe. {' '}
                    </ThemedText >
                    I am here to help you dial in those beans on this machine.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText >
                    Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we are done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <Button title={'Let\'s go'} color={colors.primary} onPress={() => {}} />
            </ThemedView >
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});
