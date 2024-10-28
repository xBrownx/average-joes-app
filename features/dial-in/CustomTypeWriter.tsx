import React from "react";
import { Animated, StyleSheet } from "react-native";
import TypeWriter from "@/components/TypeWriter";
import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";

type CustomTypeWriterProps = {
    text: string;
    speed?: number;
    children: React.ReactNode;
}

export function CustomTypeWriter({text, speed, children}: CustomTypeWriterProps) {
    const [childrenVisible, setChildrenVisible] = React.useState(false);
    const opacity = React.useState(new Animated.Value(0))[0];

    function fadeInChildren() {
        setChildrenVisible(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    return (
        <ThemedView style={styles.stepContainer} >
            <TypeWriter textArr={[text]} speed={speed} onComplete={fadeInChildren}/>
            <Animated.View style={[{opacity}]}>
                {childrenVisible && children}
            </Animated.View>
        </ThemedView >
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