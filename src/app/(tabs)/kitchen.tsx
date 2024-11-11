import { Image, StyleSheet } from 'react-native';
import { KitchenLanding, KitchenRecipes, KitchenMachines } from '@/features/recipes';
import React, { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import KitchenPantry from '@/features/recipes/pantry/pantry-screen';

export default function Kitchen() {
    const [screenNav, setScreenNav] = React.useState('landing');

    useEffect(() => {
        setScreenNav('landing');
    }, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#F0E8E2', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/small-logo.png')}
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView >
                <ThemedView style={styles.content} >
                    <LayoutAnimationConfig skipEntering >
                        {screenNav === 'landing' &&
                            <Animated.View id={'1'} entering={SlideInLeft} exiting={SlideOutLeft}
                                           style={styles.container} >
                                <KitchenLanding navForward={(screen: string) => setScreenNav(screen)} />
                            </Animated.View >
                        }
                        {screenNav === 'recipes' &&
                            <Animated.View id={'2'} entering={SlideInRight} exiting={SlideOutRight} >
                                <KitchenRecipes navBack={() => setScreenNav('landing')} />
                            </Animated.View >
                        }
                        {screenNav === 'machines' &&
                            <Animated.View id={'3'} entering={SlideInRight} exiting={SlideOutRight} >
                                <KitchenMachines navBack={() => setScreenNav('landing')} />
                            </Animated.View >
                        }
                        {screenNav === 'pantry' &&
                            <Animated.View id={'4'} entering={SlideInRight} exiting={SlideOutRight} >
                                <KitchenPantry navBack={() => setScreenNav('landing')} />
                            </Animated.View >
                        }
                    </LayoutAnimationConfig >
                </ThemedView >
            </ThemedView >
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
    content: {
        padding: 32,
    },
    container: {
        flex: 1,
        width: '100%',
    },
    header: {
        height: 250,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    contentUpper: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    reactLogo: {
        height: '70%',
        width: '60%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
});
