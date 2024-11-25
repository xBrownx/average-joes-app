import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { AuthModal } from '@/features/auth/auth-modal';
import CartModal from '@/features/shop/components/cart-modal';

export function BannerLogo() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('home' as never)} >
            <Image
                style={styles.bannerLogo}
                source={require('../../assets/images/average_joe_logo_white.png')}
            />
        </TouchableOpacity >
    );
}

export function BannerLeft() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    return (

        <View style={[styles.bannerIcons, { paddingLeft: 20 }]} >
            <TouchableOpacity >
                <Svg height="24" width="24" id="svg-icon-search" viewBox="0 0 24 24" fill="none" stroke="white"
                     stroke-linecap="round"
                     stroke-linejoin="round" >
                    <Circle cx="11" cy="11" r="8" />
                    <Line x1="21" y1="21" x2="16.65" y2="16.65" />
                </Svg >
            </TouchableOpacity >

            <TouchableOpacity onPress={() => navigation.openDrawer()} >
                <Svg height="24" width="24" id="svg-icon-menu" viewBox="0 0 24 24" fill="none" stroke="white"
                     stroke-linecap="round"
                     stroke-linejoin="round" >
                    <Line x1="3" y1="12" x2="21" y2="12" />
                    <Line x1="3" y1="6" x2="21" y2="6" />
                    <Line x1="3" y1="18" x2="21" y2="18" />
                </Svg >
            </TouchableOpacity >

        </View >
    );
}

export function BannerRight() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <CartModal isOpen={open} onClose={() => setOpen(false)} />
            <View style={[styles.bannerIcons, { paddingRight: 20 }]} >
                <TouchableOpacity onPress={() => navigation.navigate('profile' as any)} >
                    <Svg height="24" width="24" id="svg-icon-user" viewBox="0 0 24 24" fill="none" stroke="white"
                         stroke-linecap="round"
                         stroke-linejoin="round" >
                        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <Circle cx="12" cy="7" r="4" />
                    </Svg >
                </TouchableOpacity >

                <TouchableOpacity onPress={() => setOpen(true)} >
                    <Svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-linecap="round"
                         stroke-linejoin="round" >
                        <Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <Line x1="3" y1="6" x2="21" y2="6" />
                        <Path d="M16 10a4 4 0 0 1-8 0" />
                    </Svg >
                </TouchableOpacity >

            </View >
        </>

    );
}
//onPress={() => navigation.navigate('cart' as any)}

const styles = StyleSheet.create({
    bannerLogo: {
        height: 'auto',
        width: 90,
        aspectRatio: 1824 / 934,

    },
    bannerIcons: {
        flexDirection: 'row',
        gap: 8,
    },
    icon: {
        padding: 0,
        margin: 0,
    },
});