import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import React from "react";
import { SectionHeader } from "@/features/landing/components/section-header";

export function ShopByCategory() {
    return (
        <View style={styles.container}>
            <SectionHeader
                title="SHOP BY CATEGORY"
            />
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

