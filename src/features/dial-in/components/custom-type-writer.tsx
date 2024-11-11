import React, { useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { TypeWriterText } from "@/components/typewriter";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";

type CustomTypeWriterProps = {
    text: string[];
    type?: 'default' | 'title' | 'defaultSemiBold' | 'primaryBold' | 'subtitle' | 'link';
    speed?: number;
    children?: React.ReactNode;
    onComplete?: () => void;
    isShow?: boolean;
}

export function CustomTypeWriter({text, type, speed, children, onComplete, isShow}: CustomTypeWriterProps) {
    const [childrenVisible, setChildrenVisible] = React.useState(false);
    const opacity = React.useState(new Animated.Value(0))[0];

    function fadeInChildren() {
        setChildrenVisible(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
        if(onComplete) onComplete();
    }

    useEffect(() => {
        if(isShow) {
            fadeInChildren();
        }
    }, [isShow])

    return (
        <ThemedView style={styles.stepContainer} >
            {isShow
                ? text.map(t => (<ThemedText key={t} type={type}>{t}</ThemedText>))
                : <TypeWriterText textArr={text} speed={speed} onComplete={fadeInChildren} type={type} />
            }
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