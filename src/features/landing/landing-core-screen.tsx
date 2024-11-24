
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { themedColors } from "@/constants";
import { WhyBuyFromUs } from "@/features/landing/components/why-buy-from-us";
import { Banner } from "@/features/landing/components/banner";
import { ShopByCategory } from "@/features/landing/components/shop-by-category";
import { JoevemberOffers } from "@/features/landing/components/joevember-offers";
import { TopSellingBundles } from "@/features/landing/components/top-selling-bundles";
import { ShopAccessories } from "@/features/landing/components/shop-accessories";
import { CoffeeRoastedForHomeMachines } from "@/features/landing/components/coffee-roasted-for-home-machines";
import { loadShopifyData } from "@/store/slice/shopify-slice";
import { useAppDispatch } from "@/store";
import { LearningSection } from "@/features/landing/components/learning-section";
import { InstaFeed } from "@/features/landing/components/insta-feed";

export function LandingCoreScreen() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadShopifyData())
    }, []);

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <Banner />
            <View style={styles.container}>
                <JoevemberOffers />
                <TopSellingBundles />
                <ShopByCategory />
                <WhyBuyFromUs />
                <ShopAccessories />
                <LearningSection />
                <InstaFeed />
                <CoffeeRoastedForHomeMachines />
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
        paddingVertical: 26,
        gap: 45,
    },

});