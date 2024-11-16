 import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from "react-redux";
import store, { useAppDispatch, useAppSelector } from "@/store/store";
import { loadRemoteData } from "@/store/slice/remote-data-slice";
import { selectUser } from "@/store";
import { AuthModal } from "@/features/auth/auth-modal";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <RootLayoutNav />
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    return (
            <Provider store={store} >
                <App />
            </Provider >
    );
}

function App() {
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectUser);
    const [isLoginModal, setLoginModal] = useState(username !== null);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        dispatch(loadRemoteData())
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <>
            {username === '' ? <AuthModal isOpen={isLoginModal} close={() => setLoginModal(false)} /> :
                <Stack >
                    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
                    <Stack.Screen name="+not-found" />
                </Stack >
            }
        </>
    );
}

