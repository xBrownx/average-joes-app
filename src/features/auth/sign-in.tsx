import { Button, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import React from 'react';
import { setUserName, useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { ThemedButton } from "@/components/button";
import { CustomGoogleSignIn } from "@/features/auth/sign-in-google";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { themedColors } from "@/constants/themed-colors";
import Animated, {
    LinearTransition,
    SlideInLeft,
    SlideOutLeft,
} from "react-native-reanimated";
import { globalStyles } from "@/styles/global-styles";

export const SignIn = ({setSignUp}: { setSignUp: () => void }) => {
    const dispatch = useAppDispatch();

    const [name, setName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

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

    function onGoogleSignInResult(credentials: FirebaseAuthTypes.UserCredential | undefined) {
        if (!credentials || !credentials.user || !credentials.user.displayName) {
            alert("Failed to sign in with Google")
            return;
        }
        const firstName = credentials.user.displayName.split(' ')[0];
        dispatch(setUserName(firstName));
    }

    return (
        <TouchableWithoutFeedback>
            <Animated.View
                entering={SlideInLeft.delay(50)}
                exiting={SlideOutLeft}
                style={[globalStyles.innerModal, styles.container]}
                layout={LinearTransition.delay(200)}
            >
                <ThemedText type={'title'}>
                    WELCOME TO JOE'S!
                </ThemedText>
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
                <Button
                    title={'SIGN IN' +
                        ''}
                    color={themedColors.primary}
                    onPress={handleOk}
                />
                <ThemedText type={'default'} style={styles.orText}>
                        OR SIGN IN WITH
                </ThemedText>

                <CustomGoogleSignIn
                    setSignInResult={onGoogleSignInResult}
                />


                <ThemedText type={'default'} style={styles.footerText}>
                    Create an account{' '}
                    <ThemedText type={'defaultSemiBold'} onPress={setSignUp}>
                        here.
                    </ThemedText>
                </ThemedText>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    orText: {
        textAlign: 'center',
    },
    footerText: {
        textAlign: 'center',
    }
});