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

export function JoevemberOffers() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productReviews, setProductReviews] = useState<any>([]);

    const collectionId = 'gid://shopify/Collection/487853687097';
    useEffect(() => {
        fetchSingleCollection(collectionId).then((collection) => {
            // Do something with the collections
            setProducts(collection.products)
        });
    }, []);


    useEffect(() => {
        console.log(" i am working ")
        fetchAllProductReviews().then((reviews) => {
            setProductReviews(reviews);
        })
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
                        <ShopItem product={product} reviews={productReviews} />
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