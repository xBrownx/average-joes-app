import { View, StyleSheet, ImageBackground } from 'react-native';
import Logo from '@/assets/svg/bb-logo.svg';
import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';

export function ThemedScreen({ children, enterDir = 'right' }: { enterDir?: 'left' | 'right' } & PropsWithChildren) {
    const focus = useIsFocused();
    return (
        <ImageBackground style={styles.container} source={require('@/assets/images/background.png')}
                         resizeMode="cover" >
            {focus &&
                <Animated.View
                    entering={enterDir === 'right' ? SlideInRight : SlideInLeft}
                    exiting={enterDir === 'right' ? SlideOutRight : SlideOutLeft}
                    style={styles.container} >
                    <SafeAreaView style={styles.container} >
                        {children}
                    </SafeAreaView >
                </Animated.View >
            }
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});