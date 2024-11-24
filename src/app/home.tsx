import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React from 'react';
import { HomeCore } from "@/features/home";



export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerImage={
                <Image
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.headerImage}
                />
            } >
            <HomeCore />
        </ParallaxScrollView >
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: '70%',
        width: '60%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },

});