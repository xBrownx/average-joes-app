 import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from "react-redux";
import store, { useAppDispatch, useAppSelector } from "@/store/store";
import { loadRemoteData } from "@/store/slice/remote-data-slice";
import { selectUser } from "@/store";
import { LoginModal } from "@/features/auth";

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
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme} >
            <Provider store={store} >
                <App />
            </Provider >
        </ThemeProvider >
    );
}

function App() {
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectUser);
    const [isLoginModal, setLoginModal] = useState(true);
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    });

    useEffect(() => {
        console.log('App() useEffect()')
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
            {username === '' ? <LoginModal isOpen={isLoginModal} close={() => setLoginModal(false)} /> :
                <Stack >
                    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
                    <Stack.Screen name="+not-found" />
                </Stack >
            }
        </>
    );
}

