import { StyleSheet, View } from "react-native";
import React from "react";
import { SectionHeader } from "@/features/landing/components/section-header";

export function TopSellingBundles() {
    return (
        <View style={styles.container}>
            <SectionHeader
                title="TOP SELLING BUNDLES"
                viewAll={() => {
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
    }
});