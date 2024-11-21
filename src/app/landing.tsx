import { Animated, Dimensions, Image, LayoutChangeEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/text/themed-text";
import { themedColors } from "@/constants/themed-colors";
import ScrollView = Animated.ScrollView;

const screenWidth = Dimensions.get("window").width;

export default function LandingScreen() {

    const uri = require('../assets/images/Mobile_Banner-01_720x.jpg');
    let source = Image.resolveAssetSource(uri);
    const widthRatio = screenWidth / source.width;
    const height = source.height * widthRatio;

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <Image
                onLayout={(e) => e.nativeEvent.layout.width}
                source={require('../assets/images/Mobile_Banner-01_720x.jpg')}
                resizeMode='contain'
                style={{width: screenWidth, height: height}}
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type={'title'}>
                        JOEVEMBER OFFERS
                    </ThemedText>
                    <TouchableOpacity>
                        <ThemedText style={styles.viewAll} type={'title'}>
                            VIEW ALL
                        </ThemedText>
                    </TouchableOpacity>
                </View>
                <View style={styles.whyBuyFromUs}>
                    <ThemedText type={'title'}>
                        WHY BUY FROM US
                    </ThemedText>
                    <View style={styles.whyBuyFromUsImageContainer}>
                        <Image
                            source={require('../assets/images/infographic-04_24232462-a540-4f8f-9465-d96a172b48b9.png')}
                            style={styles.whyBuyFromUsImage}
                        />
                        <Image
                            source={require('../assets/images/infographic-02.png')}
                            style={styles.whyBuyFromUsImage}
                        />
                        <Image
                            source={require('../assets/images/infographic-05.png')}
                            style={styles.whyBuyFromUsImage}
                        />
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: themedColors.backgroundSecondary,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: themedColors.backgroundSecondary,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    bannerImage: {
        width: screenWidth,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewAll: {
        fontSize: 12,
        opacity: 0.7,
        letterSpacing: 1,
    },
    whyBuyFromUs: {
        alignItems: 'center',
        gap: 16,
    },
    whyBuyFromUsImageContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    whyBuyFromUsImage: {
        width: '30%',
        height: null,
        aspectRatio: 1,
    },
});