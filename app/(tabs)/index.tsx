import { Image, StyleSheet, Platform, View, Animated, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import Footer from "@/components/Footer";
import React from "react";
import TypeWriter from "@/components/text/typewriter-text";
import colors from "@/components/colors";
import { appDataTemplate, getAppData, storeAppData } from "@/util/local-storage";

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

    const createAppData = () => {
        storeAppData(appDataTemplate);
    }

    React.useEffect(() => {
        getAppData().then((data) => {
            if(data === null) {
                console.log("No data");
                createAppData();
            } else {
                console.log(data);
            }
        })
    }, [])

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: colors.background, dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.reactLogo}
                />
            } >
            <View style={styles.content} >
                <ThemedView style={styles.titleContainer} >
                    <TypeWriter textArr={["HELLO!"]} onComplete={() => fadeInWave()} />
                    <Animated.View style={[{opacity}]} >
                        {wave && <HelloWave />}
                    </Animated.View >
                </ThemedView >
                <ThemedView style={styles.stepContainer} >
                    <ThemedText type="subtitle" >Average Joe's Barista Bonanza</ThemedText >
                    <ThemedText >
                        Let us help you dial in, save your setups and teach you some other handy skills.{' '}
                    </ThemedText >
                    <ThemedText >
                        Check out more here:{' '}
                    </ThemedText >
                </ThemedView >
                <ThemedView style={styles.stepContainer} >
                    <Button title={'ABOUT'} color={colors.primary} onPress={() => {
                    }} />
                </ThemedView >
                <ThemedView style={styles.stepContainer} >
                    <Button title={'SHOP'} color={colors.primary} onPress={() => {
                    }} />
                </ThemedView >
                <ThemedView style={styles.stepContainer} >
                    <Button title={'CONTACT'} color={colors.primary} onPress={() => {
                    }} />
                </ThemedView >

            </View >
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
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
