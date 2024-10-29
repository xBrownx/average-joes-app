
import { Image, StyleSheet } from 'react-native';
import RecipeLanding from "@/features/recipes/components/landing-screen";
import React from "react";
import RecipeMachines from "@/features/recipes/components/machine-screen";
import RecipeBeans from "@/features/recipes/components/beans-screen";
import { ThemedView } from "@/components/ThemedView";
import Footer from "@/components/Footer";
import Animated from "react-native-reanimated";
import colors from "@/components/colors";

export default function Recipes() {
    const [screenNav, setScreenNav] = React.useState('landing');

    return (
        <Footer >
            <ThemedView style={styles.container} >
                <Animated.View >
                    <Animated.View
                        style={[
                            styles.header,
                            {backgroundColor: colors.backgroundSecondary},
                        ]} >
                        <Image
                            source={require('@/assets/images/small-logo.png')}
                            style={styles.reactLogo}
                        />
                    </Animated.View >

                    <ThemedView >
                        <ThemedView style={styles.content} >
                            {
                                {
                                    'landing': <RecipeLanding navForward={(screen: string) => setScreenNav(screen)} />,
                                    'beans': <RecipeBeans navBack={() => setScreenNav('landing')} />,
                                    'machines': <RecipeMachines navBack={() => setScreenNav('landing')} />,
                                }[screenNav]
                            }
                        </ThemedView >
                    </ThemedView >
                </Animated.View >
            </ThemedView >
        </Footer >
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    content: {
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
        justifyContent: "center"
    },
    contentUpper: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    reactLogo: {
        height: "70%",
        width: "60%",
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: "contain",
        alignSelf: 'center',
    },
});
