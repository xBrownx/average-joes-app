import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import React from "react";
import { SectionHeader } from "@/features/shop/components/section-header";

export function WhyBuyFromUs() {
    return (
        <View style={styles.container}>
            <SectionHeader title={'WHY BUY FROM US'} />
            <View style={styles.imagesContainer}>
                <Image
                    source={require('@/assets/images/infographic-04_24232462-a540-4f8f-9465-d96a172b48b9.png')}
                    style={styles.image}
                />
                <Image
                    source={require('@/assets/images/infographic-02.png')}
                    style={styles.image}
                />
                <Image
                    source={require('@/assets/images/infographic-05.png')}
                    style={styles.image}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
    },
    imagesContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '30%',
        height: null,
        aspectRatio: 1,
    },
});