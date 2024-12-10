import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft, SlideOutRight, useSharedValue } from "react-native-reanimated";
import { SignInButton } from "@/features/auth/sign-in-with-button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { THEME_COLOURS } from "@/constants";
import { useAppDispatch } from "@/store";
import auth from "@react-native-firebase/auth";
import { ThemedInput } from "@/components/input";

type SignInMainProps = {
    setScreen: (screen: 'main' | 'sign-in-with-email' | 'sign-up') => void
}

const slideOutLeftAnimation = new SlideOutLeft().build();
const slideOutRightAnimation = new SlideOutRight().build();

export function SignInWithEmail({setScreen}: SignInMainProps) {

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const exitDirection = useSharedValue<'left' | 'right'>('right');

    const onEmailChange = (text: string) => {
        setEmail(text);
    };

    const onPasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleOk = () => {
        if (email !== '' && email !== null) {
            auth().signInWithEmailAndPassword(email, password).then((result) => {

            })
        }
    };

    const CustomExitingAnimation = (values: any) => {
        'worklet';
        return exitDirection.value === 'left'
            ? slideOutLeftAnimation(values)
            : slideOutRightAnimation(values);
    };

    const signUp = () => {
        exitDirection.value = 'left'
        setScreen("sign-up");
    }

    return (
        <Animated.View entering={SlideInRight} exiting={CustomExitingAnimation}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    SIGN IN WITH YOUR EMAIL
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onEmailChange}
                    placeholder={"Email"}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onPasswordChange}
                    placeholder={"Password"}
                    value={password}
                />

                <Button
                    title={'SIGN IN' +
                        ''}
                    color={THEME_COLOURS.primary}
                    onPress={handleOk}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? Sign up{' '}</Text>
                    <TouchableOpacity onPress={signUp}>
                        <Text style={styles.footerLink}>here.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: THEME_COLOURS.primary,
        marginHorizontal: 32,
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: THEME_COLOURS.primary
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
    footer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: 'white'
    },
    footerLink: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: THEME_COLOURS.primary
    },
})