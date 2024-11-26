import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from '@/store/store';
import { loadRemoteData } from '@/store/slice/remote-data-slice';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomDrawerContent, SCREEN_OPTIONS } from '@/components/navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopCoreScreen from '@/features/shop/shop-core-screen';
import HomeCoreScreen from '@/features/home/home-core-screen';
import DialInCoreScreen from '@/features/dial-in/dial-in-core-screen';
import ProfileCoreScreen from '@/features/profile/profile-core';
import AuthCoreScreen from '@/features/auth/auth-core-screen';

import {
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    useFonts,
} from '@expo-google-fonts/poppins';
import CheckoutCoreScreen from "@/features/shop/shop-checkout";
import { loadShopifyData } from "@/store/slice/shopify-slice";
import Kitchen from "@/app/(tabs)/kitchen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Poppins_100Thin,
        Poppins_200ExtraLight,
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
        Poppins_900Black,
        'Poppins-Thin': require('@/assets/fonts/Poppins-Thin.ttf'),
        PoppinsSemiBold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
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

const Drawer = createDrawerNavigator();

function App() {
    const dispatch = useAppDispatch();
    const [initializing, setInitializing] = useState(true); // may need to change this to true
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
        console.log(user);
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
            {!user ? <AuthCoreScreen /> :
                <Drawer.Navigator
                    initialRouteName="home"
                    screenOptions={SCREEN_OPTIONS}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen
                        name="home"
                        component={HomeCoreScreen}
                    />

                    <Drawer.Screen
                        name="dial-in"
                        component={DialInCoreScreen}
                    />

                    <Drawer.Screen
                        name="shop"
                        component={ShopCoreScreen}
                    />

                    <Drawer.Screen
                        name="profile"
                        component={ProfileCoreScreen}
                    />

                    <Drawer.Screen
                        name="checkout"
                        component={CheckoutCoreScreen}
                    />

                    <Drawer.Screen
                        name="kitchen"
                        component={Kitchen}
                    />

                </Drawer.Navigator>
            }
        </>
    );
}


// {!user
//                 ? <AuthModal
//                     isOpen={isLoginModal}
//                     onClose={() => setLoginModal(false)}
//                 />
//                 : <Stack>
//                     <Stack.Screen name="(tabs)" options={{headerShown: false}} />
//                     <Stack.Screen name="+not-found" />
//                 </Stack>
//             }
