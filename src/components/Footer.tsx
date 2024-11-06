import React from 'react';
// import FooterSVG from '@/assets/images/footer.svg';

import {
    Image, ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import colors from './colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Footer: any = ({aspectRatio, children}: any) => {
    return (
        <View
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <View style={styles.view1}>
                <ImageBackground
                    source={require('@/assets/images/footer-small.png')}
                    style={styles.image}
                >
                    {children}
                </ImageBackground>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative', // Allows the image to be positioned
    },
    view1: {
        flex: 1, // Takes up all remaining space
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        zIndex: 2,
        width: '100%',
    },
});

export default Footer;
