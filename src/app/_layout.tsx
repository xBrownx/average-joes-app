import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from "react-redux";
import store, { useAppDispatch } from "@/store/store";
import { loadRemoteData } from "@/store/slice/remote-data-slice";
import { AuthModal } from "@/features/auth/auth-modal";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomDrawerContent, SCREEN_OPTIONS } from "@/components/navigation";
import LandingScreen from "@/app/landing";
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

const Drawer = createDrawerNavigator();

function App() {
    const dispatch = useAppDispatch();
    const [isLoginModal, setLoginModal] = useState(true);
    const [initializing, setInitializing] = useState(true); // may need to change this to true
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    });

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
        console.log(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        dispatch(loadRemoteData())
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (!loaded || initializing) {
        return null;
    }

    return (
            <Drawer.Navigator
                initialRouteName="landing"
                screenOptions={SCREEN_OPTIONS}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen
                    name="landing"
                    component={LandingScreen}
                />

            </Drawer.Navigator>
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
