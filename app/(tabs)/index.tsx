import { Image, StyleSheet, Platform, View, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Footer from "@/components/Footer";
import React from "react";
import TypeWriter from "@/components/TypeWriter";
import colors from "@/components/colors";

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
            headerBackgroundColor={{light: colors.background, dark: '#ce2127'}}
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
                <ThemedText type="subtitle" >Step 1: Dial in</ThemedText >
                <ThemedText >
                    Follow the prompts to dial in your perfect cup of{' '}
                    <ThemedText type="defaultSemiBold" >
                        Joe.
                    </ThemedText >{' '}
                    Save your settings for different setups and beans and view them in the{' '}
                    <ThemedText type="defaultSemiBold" >
                        recipe book.
                    </ThemedText >{' '}
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText type="subtitle" >Step 2: Learn</ThemedText >
                <ThemedText >
                    Visit{' '}
                    <ThemedText type="defaultSemiBold" >
                        Joe's Learning Center
                    </ThemedText >{' '}
                    and see what else it takes to make that perfect cup through video tutorials.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText type="subtitle" >Step 3: Shop</ThemedText >
                <ThemedText >
                    Checkout our online store for some delicious beans and find all the tools you need to become a master barista.
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
