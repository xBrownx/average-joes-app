import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SectionHeader } from "@/features/landing/components/section-header";
import {
    fetchAllCollections,
    fetchAllProductReviews,
    fetchAllProducts,
    fetchProductRating,
    fetchSingleCollection
} from "@/features/shopify";
import { ThemedText } from "@/components/text";
import { ShopItem } from "@/features/shop/shop-item";
import { Product } from "shopify-buy";
import { useAppDispatch } from "@/store";
import { loadShopifyData } from "@/store/slice/shopify-slice";
import { JOEVEMBER_COLLECTION } from "@/features/shopify/constants";

export function JoevemberOffers() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchSingleCollection(JOEVEMBER_COLLECTION).then((collection) => {
            setProducts(collection.products.slice(0,4))
        });
    }, []);

    return (
        <View style={styles.container}>
            <SectionHeader
                title="JOEVEMBER OFFERS"
                viewAll={() => {
                }}
            />
            <View style={styles.productsContainer}>
                {products.map((product) => (
                    <View key={product.id} style={styles.shopItem}>
                        <ShopItem product={product} />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    productsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 16,
        width: '100%',
        justifyContent: 'space-between',
    },
    shopItem: {
        width: '47.5%',
        marginBottom: 16,
        height: "auto",
        flexGrow: 1,
    },
});