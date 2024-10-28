import { Image, StyleSheet, Platform, View, Animated, Button } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";
import TypeWriter from "@/components/TypeWriter";
import colors from "@/components/colors";

function DialInStepOne() {
    return (
        <>
            <ThemedView style={styles.titleContainer} >
                <TypeWriter textArr={["WELCOME xxx"]} onComplete={() => {
                }} />
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText >
                    I am{' '}
                    <ThemedText type={"defaultSemiBold"} >
                        Joe. {' '}
                    </ThemedText >
                    I am here to help you dial in those beans on this machine.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <ThemedText >
                    Dialing in coffee can be tough, but not when I am here to help! The goal is that by the time we are
                    done your coffee tastes delicious and you have an understanding of how to dial in espresso.
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <Button title={'Let\'s go'} color={colors.primary} onPress={() => navigation.navigate('StepTwo')} />
            </ThemedView >
        </>
    );
}

function DialInStepTwo() {

    return (
        <>
            <ThemedText type={'subtitle'}>
                Before we start you'll need the following to dial in coffee.
            </ThemedText >
            <ThemedView style={styles.stepContainer} >
                <ThemedText style={{fontSize: 12}}>
                    1. The coffee you are using needs to be fresh, roasted less than 40 days ago. If its older than that chances are its going off, which makes dialing it in super hard. You can still try but im telling you now that it will be tough.{'\n'}
                </ThemedText >
                <ThemedText style={{fontSize: 12}}>
                    2. Freshly ground - If you are buying pre ground coffee, this is the reason your coffee isnt great.{'\n'}
                </ThemedText >
                <ThemedText style={{fontSize: 12}}>
                    3. Scales - Even kitchen scales will do for now but you should invest in some coffee scales.{'\n'}
                </ThemedText >
                <ThemedText style={{fontSize: 12}}>
                    4. a timer - Can use your phone (coffee scales will have then inbuilt).{'\n'}
                </ThemedText >
                <ThemedText style={{fontSize: 12}}>
                    5. We are going to use a double shot basket. 18g to 22g depending on your machine.{'\n'}
                </ThemedText >
            </ThemedView >
            <ThemedView style={styles.stepContainer} >
                <Button title={'Let\'s go'} color={colors.primary} onPress={() => {
                }} />
            </ThemedView >
        </>
    );
}


export default function DialIn() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
            headerImage={
                <Image
                    source={require('@/assets/images/dial-in-2.png')}
                    style={styles.reactLogo}
                />
            } >
            <DialInStepTwo />
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
        gap: 0,
        marginBottom: 2,
    },
    reactLogo: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});


