import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "@/assets/svg/bb-logo.svg";
import React from "react";
import { ThemedText } from "@/components/text";
import Slider from '@react-native-community/slider';
import { RoastSlider } from "@/features/quiz/components/roast-slider";


export function SelectRoastScreen() {
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Logo width={133} height={64} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>
                    HOW DO YOU LIKE YOUR COFFEE?
                </Text>
                <ThemedText style={styles.subheading}>
                    We'll recommend beans based on your flavour profile
                </ThemedText>
            </View>
            <View style={styles.sliderContainer}>
                <RoastSlider
                    heading={'ROAST'}
                    options={['LIGHT', 'MEDIUM', 'DARK']}
                />
                <RoastSlider
                    heading={'FLAVOUR'}
                    options={['FRUITY', 'BALANCED', 'DARK CHOC']}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 53,
        gap: 20,
    },
    imageContainer: {
        width: 133,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingHorizontal: 54,
    },
    heading: {
        color: 'white',
        fontSize: 22.06,
        paddingHorizontal: 40,
        textAlign: 'center',
    },
    subheading: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    sliderContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        height: 500
    },
    footerContainer: {
        width: '100%',
        paddingHorizontal: 26,
        gap: 9,
    },
});