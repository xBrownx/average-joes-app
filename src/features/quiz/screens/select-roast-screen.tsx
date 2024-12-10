import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '@/assets/svg/bb-logo.svg';
import React from 'react';
import { ThemedText } from '@/components/text';
import Slider from '@react-native-community/slider';
import { RoastSlider } from '@/features/quiz/components/roast-slider';
import { ThemedButton } from '@/components/button';
import { useQuizScreenContext } from '@/features/quiz/context/quiz-screen-context';


export function SelectRoastScreen() {
    const { setScreen } = useQuizScreenContext();
    return (
        <View style={styles.container} >
            <View style={styles.imageContainer} >
                <Logo width={133} height={64} />
            </View >
            <View style={styles.headerContainer} >
                <Text style={styles.heading} >
                    HOW DO YOU LIKE YOUR COFFEE?
                </Text >
                <ThemedText style={styles.subheading} >
                    We'll recommend beans based on your flavour profile
                </ThemedText >
            </View >
            <View style={styles.sliderContainer} >
                <RoastSlider
                    heading={'ROAST'}
                    options={['LIGHT', 'MEDIUM', 'DARK']}
                />
                <RoastSlider
                    heading={'FLAVOUR'}
                    options={['FRUITY', 'BALANCED', 'DARK CHOC']}
                />
            </View >
            <View style={styles.footerContainer} >
                <ThemedButton textType={'small'} >
                    CONTINUE
                </ThemedButton >
                <Text style={styles.footerLargeText} >
                    HAVE NO IDEA?
                </Text >
                <ThemedText color={'light'} style={styles.footerSmallText} >
                    You can change you preference at any time, based on your exploration and findings.
                </ThemedText >
                <ThemedButton textType={'small'} onPress={() => setScreen('select-coffee')} >
                    START WITH OUR SUGGESTION
                </ThemedButton >
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 53,
        gap: 12,
    },
    imageContainer: {
        width: 133,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingHorizontal: 54,
        gap: 12,
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
        height: 400,
    },
    footerContainer: {
        width: '100%',
        marginTop: 17,
        paddingHorizontal: 60,
        gap: 9,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLargeText: {
        fontSize: 18,
        color: 'white',
    },
    footerSmallText: {
        fontSize: 12,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
});