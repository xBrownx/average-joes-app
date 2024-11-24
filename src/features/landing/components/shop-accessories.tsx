import { Image, StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/text";
import React, { useEffect, useState } from "react";
import { SectionHeader } from "@/features/landing/components/section-header";
import { themedColors } from "@/constants";
import { Product } from "shopify-buy";
import { fetchSingleCollection } from "@/features/shopify";
import { ACCESSORIES_COLLECTION, JOEVEMBER_COLLECTION } from "@/features/shopify/constants";
import { ShopItem } from "@/features/shop/shop-item";

export function ShopAccessories() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchSingleCollection(ACCESSORIES_COLLECTION).then((collection) => {
            setProducts(collection.products.slice(0,4))
        });
    }, []);

    return (
        <View style={styles.container}>
            <SectionHeader
                title="SHOP ACCESSORIES"
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

