import { Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { globalStyles } from '@/styles/global-styles';
import auth from '@react-native-firebase/auth';
import Animated, { LinearTransition, SlideInRight, SlideOutRight } from "react-native-reanimated";


interface SignUpState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export const SignUp = ({setSignIn}: { setSignIn: () => void }) => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<SignUpState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const onTextChange = (field: keyof SignUpState, value: string) => {
        setState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    function onSignUp() {
        auth().createUserWithEmailAndPassword(state.email, state.password)
            .then((result) => {

            })
    }

    return (
        <TouchableWithoutFeedback>
            <Animated.View
                entering={SlideInRight.delay(50)}
                exiting={SlideOutRight}
                layout={LinearTransition}
                style={[globalStyles.innerModal, styles.container]}
            >
                <View>
                    <ThemedText type={'default'}>
                        Sign Up
                    </ThemedText>
                </View>
                <ThemedInput
                    onValueChange={(value) => onTextChange("firstName", value)}
                    placeholder="First Name"
                    value={state.firstName}
                />
                <ThemedInput
                    onValueChange={(value) => onTextChange("lastName", value)}
                    placeholder="Last Name"
                    value={state.lastName}
                />
                <ThemedInput
                    onValueChange={(value) => onTextChange("email", value)}
                    placeholder="Email"
                    value={state.email}
                />
                <ThemedInput
                    onValueChange={(value) => onTextChange("password", value)}
                    placeholder="Password"
                    value={state.password}
                />
                <ThemedInput
                    onValueChange={(value) => onTextChange("confirmPassword", value)}
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                />

                <Button
                    title={'SIGN UP'}
                    color={themedColors.primary}
                    onPress={onSignUp}
                />
                <ThemedText type={'default'}>
                    Already have an account? Sign in{' '}
                    <ThemedText type={'defaultSemiBold'} onPress={setSignIn}>
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
    linkText: {}
});