import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/tab-bar-icon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themedColors } from "@/constants/themed-colors";

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
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={themedColors.primary} />
                    ),
                }}
            />

            <Tabs.Screen
                name="recipes"
                options={{
                    title: 'Recipes',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'book' : 'book-outline'} color={themedColors.primary} />
                    ),
                }}
            />

            <Tabs.Screen
                name="dial-in"
                options={{
                    title: 'Dial In',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'stopwatch' : 'stopwatch-outline'} color={themedColors.primary} />
                    ),
                }}
            />

            <Tabs.Screen
                name="pantry"
                options={{
                    title: 'Pantry',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={themedColors.primary} />
                    ),
                }}
            />

            <Tabs.Screen
                name="learn"
                options={{
                    title: 'Learn',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'school' : 'school-outline'} color={themedColors.primary} />
                    ),
                }}
            />
        </Tabs >
    );
}
