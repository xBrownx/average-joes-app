import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { SectionHeader } from "@/features/landing/components/section-header";
import { fetchSingleCollection } from "@/features/shopify";
import { ACCESSORIES_COLLECTION, COFFEE_COLLECTION } from "@/features/shopify/constants";
import { Product } from "shopify-buy";
import { ShopItem } from "@/features/shop/shop-item";

export function CoffeeRoastedForHomeMachines() {
     const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchSingleCollection(COFFEE_COLLECTION).then((collection) => {
            setProducts(collection.products.slice(0,4))
        });
    }, []);
    return (
        <View style={styles.container}>
            <SectionHeader
                title="COFFEE ROASTED FOR HOME MACHINES"
                leftAlign
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