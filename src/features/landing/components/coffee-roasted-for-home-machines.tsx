import React from 'react';
import { StyleSheet, View } from "react-native";
import { SectionHeader } from "@/features/landing/components/section-header";

export function CoffeeRoastedForHomeMachines() {
    return (
        <View style={styles.container}>
            <SectionHeader
                title="COFFEE ROASTED FOR HOME MACHINES"
                leftAlign
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