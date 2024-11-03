import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import colors from "@/components/colors";
import TypeWriter from "@/components/text/typewriter-text";
import { ThemedText } from "@/components/text/themed-text";
import { Stack } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

export default function Pantry() {
    const [screenNav, setScreenNav] = React.useState('landing');
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log(isFocused);
    }, [isFocused])

    return (
        <ThemedView style={styles.container}>
            <Animated.View>
                <Animated.View
                    style={[
                        styles.header,
                        {backgroundColor: colors.backgroundSecondary},
                    ]}>
                    <Image
                        source={require('@/assets/images/small-logo.png')}
                        style={styles.reactLogo}
                    />
                </Animated.View>
                <View style={styles.content}>
                    {isFocused && <ThemedView>
                        <TypeWriter textStyle={'title'} textArr={["PANTRY"]} />
                    </ThemedView> }
                    <ThemedView>
                        <ThemedText>
                            Keep track of what's in your pantry and always have a fresh bean ready to roast.
                        </ThemedText>
                    </ThemedView>
                </View>
                <ThemedView>
                    <ThemedView style={styles.content}>
                        <Animated.View
                            entering={SlideInLeft}
                            exiting={SlideOutLeft}
                        >

                        </Animated.View>
                    </ThemedView>
                </ThemedView>
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
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
