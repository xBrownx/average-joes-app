import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store';
import { setUserName } from '@/store';
import auth from '@react-native-firebase/auth';
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";


interface SignUpState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type SignUpProps = {
    setScreen: (screen: 'main' | 'sign-in-with-email' | 'sign-up') => void
}

export const SignUp = ({setScreen}: SignUpProps) => {
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
                const user = {
                    email: result.user.email,
                    firstName: state.firstName,
                    lastName: state.lastName,
                }
                dispatch(setUserName(state.firstName));
            })
            .catch((error: any) => {
                console.log('Error:', error, 'with code', error.code);
            })
    }

    return (

            <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
                <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    SIGN IN WITH YOUR EMAIL
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => onTextChange('email', value)}
                    placeholder={"First Name"}
                    value={state.firstName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => onTextChange('lastName', value)}
                    placeholder={"Last Name"}
                    value={state.lastName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => onTextChange('email', value)}
                    placeholder={"Email"}
                    value={state.email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => onTextChange('password', value)}
                    placeholder={"Password"}
                    value={state.password}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => onTextChange('confirmPassword', value)}
                    placeholder={"Confirm Password"}
                    value={state.confirmPassword}
                />

                <Button
                    title={'SIGN UP' +
                        ''}
                    color={themedColors.primary}
                    onPress={onSignUp}
                />

            </View>
            </Animated.View>
    );
};

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
        fontFamily: 'Poppins_700Bold',
        color: themedColors.primary
    },
    inputContainer: {
        margin: 32,
        gap: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 3,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});