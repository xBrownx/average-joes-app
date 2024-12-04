import { Text, View, StyleSheet } from "react-native";
import { SignInButton } from "@/features/auth/sign-in-with-button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import { setUserName, useAppDispatch } from "@/store";
import { myGoogleSignIn } from "@/features/auth/sign-in-with-google";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { themedColors } from "@/constants";

type SignInMainProps = {
    setScreen: (screen: 'main' | 'sign-in-with-email' | 'sign-up') => void
}

export function SignInMain({setScreen}: SignInMainProps) {

    const dispatch = useAppDispatch();

    function onGoogleSignIn() {
        myGoogleSignIn().then((value) => {
            onGoogleSignInResult(value);
        })
    }

    function onGoogleSignInResult(credentials: FirebaseAuthTypes.UserCredential | undefined) {
        if (!credentials || !credentials.user || !credentials.user.displayName) {
            alert('Failed to sign in with Google');
            return;
        }
        const firstName = credentials.user.displayName.split(' ')[0];
        dispatch(setUserName(firstName));
    }

    return (
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    WELCOME TO JOE'S!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <SignInButton
                    title={'Continue with Email'}
                    icon={
                        <Ionicons name={'mail'} size={24} color={'black'} />
                    }
                    onPress={() => setScreen('sign-in-with-email')}
                />
                <SignInButton
                    title={'Sign in with Google'}
                    icon={
                        <Ionicons name={'logo-google'} size={24} />
                    }
                    onPress={onGoogleSignIn}
                />
                <SignInButton
                    title={'Sign in with Apple'}
                    icon={
                        <Ionicons name={'logo-apple'} size={24} />
                    }
                    onPress={undefined}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
        titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: themedColors.primary,
        marginHorizontal: 32,
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'Kalam_700Bold',
        color: themedColors.primary
    },
    buttonContainer: {
        margin: 32,
        gap: 16,
    },
})