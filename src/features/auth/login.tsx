import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { setUserName, useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { ThemedButton } from "@/components/button";
import * as Google from "expo-auth-session/providers/google";

const androidClientId = "575775045423-qls1t2boshhl4bhba2sueg6ti6pibk4p.apps.googleusercontent.com";

export const Login = () => {
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

    const [userInfo, setUserInfo] = React.useState<any>(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
    })

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
            <ThemedButton title={'Sign In with Google'} onPress={promptAsync} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    linkText: {}
});