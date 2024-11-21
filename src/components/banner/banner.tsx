import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const ICON_SIZE = 24;

export function BannerLogo() {
    return (
        <Image
            style={styles.bannerLogo}
            source={require('../../assets/images/average_joe_logo_white.png')}
        />
    );
}

export function BannerLeft() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    return (
        <View style={styles.bannerIcons}>
            <Ionicons
                name="search"
                size={ICON_SIZE}
                color="#fff"
            />
            <Ionicons.Button
                name="menu"
                size={ICON_SIZE}
                color="#fff"
                backgroundColor={'transparent'}
                style={styles.icon}
                onPress={() => navigation.openDrawer()}
            />
        </View>
    );
}

export function BannerRight() {
    return (
        <View style={styles.bannerIcons}>
            <Ionicons
                name="person"
                size={ICON_SIZE}
                color="#fff"
            />
            <Ionicons
                name="storefront"
                size={ICON_SIZE}
                color="#fff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bannerLogo: {
        height: 'auto',
        width: 90,
        aspectRatio: 1824 / 934,
    },
    bannerIcons: {
        flexDirection: 'row',
        gap: 8
    },
    icon: {
        padding: 0,
        margin: 0,
    }
})