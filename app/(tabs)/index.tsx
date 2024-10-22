import { Image, StyleSheet, Platform, View, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Footer from "@/components/Footer";
import React from "react";
import TypeWriter from "@/components/TypeWriter";

export default function HomeScreen() {
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
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.reactLogo}
                />
            } >

            <ThemedView style={styles.titleContainer} >
                <TypeWriter textArr={["WELCOME!"]} onComplete={() => fadeInWave()}/>
                {/*<ThemedText type="title" style={{color: '#ce2127'}}>WELCOME!</ThemedText >*/}
                <Animated.View style={[{opacity}]}>
                    {wave && <HelloWave />}
                </Animated.View>

            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText type="subtitle" >Step 1: Try it</ThemedText >
                <ThemedText >
                    Edit <ThemedText type="defaultSemiBold" >app/(tabs)/index.tsx</ThemedText > to see changes.
                    Press{' '}
                    <ThemedText type="defaultSemiBold" >
                        {Platform.select({ios: 'cmd + d', android: 'cmd + m'})}
                    </ThemedText >{' '}
                    to open developer tools.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText type="subtitle" >Step 2: Explore</ThemedText >
                <ThemedText >
                    Tap the Explore tab to learn more about what's included in this starter app.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText type="subtitle" >Step 3: Get a fresh start</ThemedText >
                <ThemedText >
                    When you're ready, run{' '}
                    <ThemedText type="defaultSemiBold"  >npm run reset-project</ThemedText > to get a fresh{' '}
                    <ThemedText type="defaultSemiBold" >app</ThemedText > directory. This will move the current{' '}
                    <ThemedText type="defaultSemiBold" >app</ThemedText > to{' '}
                    <ThemedText type="defaultSemiBold" >app-example</ThemedText >.
                </ThemedText >
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
        width: "60%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});
