import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from '@/store/store';
import { loadRemoteData } from '@/store/slice/remote-data-slice';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomDrawerContent, SCREEN_OPTIONS } from '@/navigation/components';
import { createDrawerNavigator } from '@react-navigation/drawer';


import {
    Kalam_300Light,
    Kalam_400Regular,
    Kalam_700Bold,
    useFonts,
} from '@expo-google-fonts/kalam';

import { loadShopifyData } from "@/store/slice/shopify-slice";
import HomeCoreScreen from '@/features/home/home-core-screen';
import BrewCoreScreen from "@/features/brew/brew-core-screen";
import PantryCoreScreen from "@/features/pantry/pantry-core-screen";
import LearnCoreScreen from '@/features/learn';
import { MainNav } from "@/navigation/main-nav";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Kalam_300Light,
        Kalam_400Regular,
        Kalam_700Bold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);


    if (!loaded && !error) {
        return null;
    }

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

function App() {
    const dispatch = useAppDispatch();
    const [initializing, setInitializing] = useState(true); // may need to change this to true
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        dispatch(loadRemoteData());
        dispatch(loadShopifyData());
    }, []);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <>
            {/*{!user ? <QuizCoreScreen /> :*/}
                <MainNav />
            {/*}*/}
        </>
    );
}

