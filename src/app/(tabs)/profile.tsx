import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React from "react";
import { ProfileCore } from "@/features/profile";

export default function DialIn() {
    return (
            <ParallaxScrollView
                headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
                headerImage={
                    <Image
                        source={require('@/assets/images/avatar.png')}
                        style={styles.headerImage}
                    />
                }>
                <ProfileCore />
            </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "70%",
        width: "100%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});