import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import React, { useEffect } from 'react';
import { setUserName, useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { ThemedButton } from "@/components/button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const Login = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const configGoogleSignIn = () => {
        GoogleSignin.configure();
    };

    const onEmailChange = (text: string) => {
        setName(text);
    };

    const onPasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleOk = () => {
        if (name !== '' && name !== null) {
            dispatch(setUserName(name));
        }
    };
    const signIn = async () => {
        console.log("sign in pressed")
        try {
            await GoogleSignin.hasPlayServices();
            const res = await GoogleSignin.signIn();
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
    };

    const checkIfUserIsValid = async () => {
        const isValid = GoogleSignin.hasPreviousSignIn();
        if (isValid) {
            // navigate to your main screens
        } else {
            try {
                await GoogleSignin.signInSilently();
            } catch (err: any) {
                console.log("Error", err.code);
            }
        }
    };

    useEffect(() => {
        configGoogleSignIn(); // will execute everytime the component mounts
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <ThemedText type={'default'}>
                    Login to get started:
                </ThemedText>
            </View>
            <ThemedInput
                onValueChange={onEmailChange}
                placeholder="Email"
                value={name}
            />
            <ThemedInput
                onValueChange={onPasswordChange}
                placeholder="Password"
                value={password}
            />
            <ThemedButton title={'GO'} onPress={handleOk} />
            <ThemedText type={'default'}>
                Don't have an account? Sign up{' '}
                <ThemedText type={'defaultSemiBold'} onPress={() => console.log('sign up')}>
                    here.
                </ThemedText>
            </ThemedText>
            <GoogleSigninButton
                style={{height: 100, width: '100%'}}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
});