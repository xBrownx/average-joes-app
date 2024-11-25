import { Image, StyleSheet, View } from "react-native";
import { ProductFilter } from "@/features/shop/components/product-filter";
import React, { useEffect, useState } from "react";
import { Collection, Product, Shop } from "shopify-buy";
import { fetchSingleCollection } from "@/features/shopify";
import { SectionHeader } from "@/features/landing/components/section-header";
import { ShopItem } from "@/features/shop/components/shop-item";
import { themedColors } from "@/constants";
import { AutoScaledImage } from "@/components/image";

type ShopAllCollectionProps = {
    collectionId: string;
}

export function ShopAllCollection({collectionId}: ShopAllCollectionProps) {
    const [collection, setCollection] = useState<Collection>();
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchSingleCollection(collectionId).then((collection) => {
            setProducts(collection.products);
            setCollection(collection)
        });
    }, []);

    return (
        <View>
            <View >
                <AutoScaledImage
                    source={require('@/assets/images/BANNER_PRODUCT_MOBILE.webp')}
                    widthPercent={'100%'}
                />
            </View>
            <View style={styles.container}>
                <View>
                    <SectionHeader
                        title={collection?.title ?? ''}
                        leftAlign={undefined}
                    />
                    <ProductFilter products={products} />
                </View>
                <View style={styles.productsContainer}>
                    {products.map((product) => (
                        <View
                            key={product.id}
                            style={styles.shopItem}
                        >
                            <ShopItem
                                product={product}
                                onProductPress={() => (product.id)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: themedColors.backgroundSecondary,
        paddingHorizontal: 16,
        paddingVertical: 26,
        gap: 16,
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
})