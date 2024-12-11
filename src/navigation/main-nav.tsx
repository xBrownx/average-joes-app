import React from "react";
import { CustomDrawerContent, SCREEN_OPTIONS } from "@/navigation/components";
import HomeCoreScreen from "@/features/home/home-core-screen";
import BrewCoreScreen from "@/features/brew/brew-core-screen";
import PantryCoreScreen from "@/features/pantry/pantry-core-screen";
import LearnCoreScreen from "@/features/learn";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootStackParamList } from "@/navigation/types/nav-types";

const Drawer = createDrawerNavigator<RootStackParamList>();

export function MainNav() {
    return (
        <Drawer.Navigator
            initialRouteName="home"
            screenOptions={SCREEN_OPTIONS}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="home"
                component={HomeCoreScreen}
                initialParams={{enterDir: 'left'}}
            />

            <Drawer.Screen
                name={'brew'}
                component={BrewCoreScreen}
                initialParams={{enterDir: 'right'}}
            />

            <Drawer.Screen
                name={'pantry'}
                component={PantryCoreScreen}
                initialParams={{enterDir: 'right'}}
            />

            <Drawer.Screen
                name={'learn'}
                component={LearnCoreScreen}
                initialParams={{enterDir: 'right'}}
            />

        </Drawer.Navigator>
    );
}