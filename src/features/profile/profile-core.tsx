import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Button, StyleSheet, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TypeWriterText } from '@/components/typewriter';
import { themedColors } from '@/constants/themed-colors';
import { ThemedText } from '@/components/text/themed-text';
import ParallaxScrollView from '@/components/parallax-scroll-view';


export default function ProfileCoreScreen() {
    const isFocused = useIsFocused();
    const myAuth = auth();
    const user = myAuth.currentUser;

    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <>
            {isFocused &&
                <ParallaxScrollView
                    headerBackgroundColor={{ light: '#F0E8E2', dark: '#ce2127' }}
                    headerImage={
                        <Image
                            source={require('@/assets/images/avatar.png')}
                            style={styles.headerImage}
                        />
                    } >
                    <View style={styles.content} >
                        <View style={styles.titleContainer} >
                            <TypeWriterText type={'title'} textArr={['PROFILE']} />
                        </View >
                        <Button
                            title={'LOGOUT'}
                            color={themedColors.primary}
                            onPress={signOut}
                        />
                    </View >
                </ParallaxScrollView >
            }
        </>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
});