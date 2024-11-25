import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StyleSheet } from 'react-native';

export const configGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: '214804884671-nqe2q8li9mnqk5voj5o8miuamhj3kskq.apps.googleusercontent.com'
    });
};

export async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const signInResult = await GoogleSignin.signIn();
        let idToken = signInResult.data?.idToken ?? null;

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);

    } catch (error: any) {
        switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
                console.error("User Sign In is required");
                break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                console.error("Google Play Services are needed");
                break;
        }
        console.log("Error", error.code, error.toString());
    }
}

export async function checkIfUserIsValid() {
    const isValid = GoogleSignin.hasPreviousSignIn();
    if (isValid) {
        console.log("checkIfUserIsValid == true");
        // navigate to your main screens
    } else {
        try {
            await GoogleSignin.signInSilently();
        } catch (err: any) {
            console.log("Error", err.code);
        }
    }
}

type GoogleSignInProps = {
    setSignInResult: (credentials: FirebaseAuthTypes.UserCredential | undefined) => void;
}

export function CustomGoogleSignIn({setSignInResult}: GoogleSignInProps) {

    function signIn() {
        onGoogleButtonPress().then((value) => {
            setSignInResult(value)
        })
    }

    useEffect(() => {
        configGoogleSignIn();
    }, []);

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={false}
            style={styles.btn}

        />
    );
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 32,
        overflow: 'hidden',
    }
})