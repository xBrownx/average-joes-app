import { Image, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React from "react";
import { ShopCore } from "@/features/shop/shop-core";

export default function Shop() {
    return (
            <ParallaxScrollView
                headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
                headerImage={
                    <Image
                        source={require('@/assets/images/small-logo.png')}
                        style={styles.headerImage}
                    />
                }>
                <ShopCore />
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