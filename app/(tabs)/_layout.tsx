import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }} >

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dial In',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'stopwatch' : 'stopwatch-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="recipes"
                options={{
                    title: 'Recipes',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="shop"
                options={{
                    title: 'Shop',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'gift' : 'gift-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'chatbox' : 'chatbox-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="learn"
                options={{
                    title: 'Learn',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'man' : 'man-outline'} color={color} />
                    ),
                }}
            />
        </Tabs >
    );
}
