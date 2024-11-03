import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import colors from "@/components/colors";
import TypeWriter from "@/components/text/typewriter-text";
import { ThemedText } from "@/components/text/themed-text";
import { Stack } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import PantryLanding from "@/features/pantry/pantry-landing";
export default function Pantry() {
    const [screenNav, setScreenNav] = React.useState('landing');
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log(isFocused);
    }, [isFocused])

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#353636'}}
            headerImage={<Image
                source={require('@/assets/images/avatar.png')}
                style={styles.headerImage}
            />}>
            <PantryLanding />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "70%",
        width: "60%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
    content: {
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
        justifyContent: "center"
    },
    contentUpper: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
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
