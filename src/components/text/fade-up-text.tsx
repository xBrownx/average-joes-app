import { Animated, StyleSheet, Text, View } from "react-native";
import { THEME_COLOURS } from "@/constants/theme-colors";
import React, { useEffect, useRef, useState } from "react";

type FadeUpTextProps = {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    text: string;
    delay?: number;
    children?: React.ReactNode;
    fontSize?: number;
}

export function FadeUpText({type, text, delay, children, fontSize}: FadeUpTextProps) {
    const opacity = React.useState(new Animated.Value(0))[0];
    const slideUp = React.useState(new Animated.Value(50))[0];
    const childOpacity = React.useState(new Animated.Value(0))[0];
    const [childrenVisible, setChildrenVisible] = React.useState(false);

    function fadeInSelf() {
        Animated.timing(opacity, {
            delay: delay,
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    function slideUpSelf() {
        Animated.timing(slideUp, {
            delay: delay,
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    function fadeInChildren() {
        setChildrenVisible(true);
        Animated.timing(childOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: delay,
        }).start()
    }

    useEffect(() => {
        fadeInSelf();
        slideUpSelf();
        setTimeout(() => fadeInChildren, 500)
    }, []);

    return (
        <View style={styles.container} >
            <Animated.View style={{opacity}} >
                <Animated.Text style={[
                    type === 'default' ? styles.default : undefined,
                    type === 'title' ? styles.title : undefined,
                    type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                    type === 'subtitle' ? styles.subtitle : undefined,
                    type === 'link' ? styles.link : undefined,
                    {transform: [{translateY: slideUp}]},
                ]} >
                    {text}
                </Animated.Text >
            </Animated.View >

            <Animated.View style={{opacity: childOpacity}} >
                {childrenVisible && children}
            </Animated.View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        marginBottom: 0,
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins'
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'PoppinsSemiBold',
        color: THEME_COLOURS.primary
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
        fontFamily: 'PoppinsBold',
        color: THEME_COLOURS.primary
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: THEME_COLOURS.tertiary
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: THEME_COLOURS.primary,
        fontFamily: 'Poppins'
    },
});