import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { TypeWriterText } from "@/components/typewriter";

import { Product } from "@/domain/shopify";
import { fetchAllProducts } from "@/features/shopify";
import { ThemedText } from "@/components/text/themed-text";

export function ShopCore() {
    const isFocused = useIsFocused();

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const data = await fetchAllProducts();
            setProducts(data);
            console.log(data[0])
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {isFocused &&
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <TypeWriterText type={'title'} textArr={["SHOP"]} />
                    </View>
                    <View style={styles.productsContainer}>
                        {products.map((product) => {
                            return (
                                <TouchableOpacity
                                    key={product.id}
                                    onPress={() => null}
                                    style={styles.productContainer}
                                >
                                    {product.images && product.images.length > 0 ?
                                        <Image source={{uri: product.images[0].src}} style={styles.productImage} />
                                        : <Image
                                            source={{uri: 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}} />
                                    }
                                    <ThemedText type={'link'} style={styles.productText}>{product.title}</ThemedText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            }
        </>

    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    productsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 8,
    },
    productContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        width: '50%',
        marginBottom: 16,
    },
    productImage: {
        width: '100%',
        aspectRatio: 1
    },
    productText: {
        lineHeight: 18,
        fontSize: 16,
    }
});