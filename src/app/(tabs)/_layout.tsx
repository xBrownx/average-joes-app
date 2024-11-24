import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/tab-bar-icon';
import { themedColors } from "@/constants/themed-colors";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BannerLeft, BannerLogo, BannerRight } from "@/components/banner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LandingScreen from "@/app/shop";






export default function TabLayout() {
    return (
        <></>
    );
    // return (
    //     <Tabs
    //         screenOptions={{
    //             tabBarActiveTintColor: themedColors.primary,
    //             headerShown: false,
    //         }} >
    //
    //         <Tabs.Screen
    //             name="index"
    //             options={{
    //                 title: 'Home',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <TabBarIcon name={focused ? 'home' : 'home-outline'} color={themedColors.primary} />
    //                 ),
    //             }}
    //         />
    //
    //         <Tabs.Screen
    //             name="kitchen"
    //             options={{
    //                 title: 'Kitchen',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <Image
    //                         source={focused ? require('@/assets/icons/kitchen-filled-primary.png') : require('@/assets/icons/kitchen-primary.png')}
    //                         style={{ width: 28, height: 28, marginBottom: -3}}
    //                     />
    //                 ),
    //             }}
    //         />
    //
    //         <Tabs.Screen
    //             name="dial-in"
    //             options={{
    //                 title: 'Dial In',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <TabBarIcon name={focused ? 'stopwatch' : 'stopwatch-outline'} color={themedColors.primary} />
    //                 ),
    //             }}
    //         />
    //
    //         <Tabs.Screen
    //             name="learn"
    //             options={{
    //                 title: 'Learn',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <TabBarIcon name={focused ? 'school' : 'school-outline'} color={themedColors.primary} />
    //                 ),
    //             }}
    //         />
    //
    //         <Tabs.Screen
    //             name="shop"
    //             options={{
    //                 title: 'Shop',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={themedColors.primary} />
    //                 ),
    //             }}
    //         />
    //
    //         <Tabs.Screen
    //             name="profile"
    //             options={{
    //                 title: 'Profile',
    //                 tabBarIcon: ({color, focused}) => (
    //                     <TabBarIcon name={focused ? 'person' : 'person-outline'} color={themedColors.primary} />
    //                 ),
    //             }}
    //         />
    //     </Tabs >
    // );
}
