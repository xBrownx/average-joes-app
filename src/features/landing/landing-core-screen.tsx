
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { themedColors } from "@/constants";
import { WhyBuyFromUs } from "@/features/landing/components/why-buy-from-us";
import { Banner } from "@/features/landing/components/banner";
import { ShopByCategory } from "@/features/landing/components/shop-by-category";
import { loadShopifyData } from "@/store/slice/shopify-slice";
import { useAppDispatch } from "@/store";
import { LearningSection } from "@/features/landing/components/learning-section";
import { InstaFeed } from "@/features/landing/components/insta-feed";
import { ShopPreviewComponent } from '@/features/shop/shop-preview-component';
import {
    ACCESSORIES_COLLECTION,
    COFFEE_COLLECTION,
    JOEVEMBER_COLLECTION,
    TOP_SELLING_BUNDLES_COLLECTION,
} from '@/features/shopify/constants';

export function LandingCoreScreen() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadShopifyData())
    }, []);

    function onProductPress(productId: string) {
        console.log('onProductPress:', productId);
    }

    function onViewAllPress(collectionId: string) {
        console.log('onViewAllPress:', collectionId);
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <Banner />
            <View style={styles.container}>
                <ShopPreviewComponent
                    title={"JOEVEMBER OFFERS"}
                    collectionId={JOEVEMBER_COLLECTION}
                    onViewAllPress={onViewAllPress}
                    onProductPress={onProductPress}
                 />
                <ShopPreviewComponent
                    title={"TOP SELLING BUNDLES"}
                    collectionId={TOP_SELLING_BUNDLES_COLLECTION}
                    onViewAllPress={onViewAllPress}
                    onProductPress={onProductPress}
                />
                <ShopByCategory />
                <WhyBuyFromUs />
                <ShopPreviewComponent
                    title={"SHOP ACCESSORIES"}
                    collectionId={ACCESSORIES_COLLECTION}
                    onViewAllPress={onViewAllPress}
                    onProductPress={onProductPress}
                />
                <LearningSection />
                <InstaFeed />
                <ShopPreviewComponent
                    title={"COFFEE ROASTED FOR HOME MACHINES"}
                    collectionId={COFFEE_COLLECTION}
                    onProductPress={onProductPress}
                />
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