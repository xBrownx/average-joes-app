import { Button, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import { Product } from "shopify-buy";
import { themedColors } from "@/constants";
import React, { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import { useCustomState } from "@/hooks";
import { ThemedButton } from "@/components/button";
import { useAppSelector } from "@/store";
import { selectProductReviews } from "@/store/slice/shopify-slice";

type ShopItemProps = {
    product: Product,
}

interface ShopItemState {
    productDiscountPrice?: any,
    productActualPrice?: any,
    productSavings?: number,
    productReviews?: any,
    productRating?: any,
}

export function ShopItem({product}: ShopItemProps) {
    const reviews = useAppSelector(selectProductReviews);
    const {state, updateState} = useCustomState<ShopItemState>({
        productActualPrice: '',
        productDiscountPrice: '',
        productRating: 0,
        productReviews: [],
        productSavings: 0
    })

    useEffect(() => {
        console.log('updating')
        const productReviews = reviews.filter((review: any) => (review['product_handle'] === product.handle));
        const productRatings = productReviews.map((review: any) => (review.rating));
        let sum = 0;
        productRatings.forEach((rating: number) => {
            sum += rating;
        });

        updateState({
            productDiscountPrice: ((product.variants[0]?.price?.amount ?? 0) * 1).toFixed(0),
            productActualPrice: ((product.variants[0]?.compareAtPrice?.amount ?? 0) * 1).toFixed(0),
            productSavings: (product.variants[0]?.compareAtPrice?.amount ?? 0) - (product.variants[0].price.amount ?? 0),
            productRating: (sum / productRatings.length),
            productReviews: reviews.filter((review: any) => (review['product_handle'] === product.handle))
        })
    }, [reviews]);

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
            >
                <Image
                    source={{uri: product.images[0].src}}
                    style={styles.productImage}
                />
                <ThemedText
                    style={styles.productText}
                >
                    {product.title}
                </ThemedText>
                <View style={styles.rating}>

                    <Rating
                        type={'custom'}
                        ratingCount={5}
                        tintColor={themedColors.backgroundSecondary}
                        // ratingColor={themedColors.primary}
                        ratingBackgroundColor={'white'}
                        imageSize={16}
                        startingValue={5}
                        showReadOnlyText={false}

                    />
                    <ThemedText
                        style={styles.ratingText}
                    >
                        {state.productRating.toPrecision(3)} | {state.productReviews.length} Reviews
                    </ThemedText>
                </View>
                <View style={styles.priceTag}>
                    <ThemedText style={styles.discountPrice}>
                        ${state.productDiscountPrice}
                    </ThemedText>
                    <ThemedText style={styles.originalPrice}>
                        ${state.productActualPrice}
                    </ThemedText>
                    <ThemedText style={styles.saveAmount}>
                        SAVE ${state.productSavings}
                    </ThemedText>
                </View>

            </TouchableOpacity>
            <View style={{justifyContent: 'flex-end'}}>
                <ThemedButton
                    title={'ADD TO CART'}
                    color={themedColors.secondary}
                    onPress={() => null}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        width: '100%',
        height: 350,
    },
    productImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 14,
    },
    rating: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-end',
    },
    ratingText: {
        fontSize: 10,
        lineHeight: 12,
        color: themedColors.tertiary,
    },
    priceTag: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    discountPrice: {
        fontSize: 16,
        color: '#de4754',
        fontWeight: 'bold',
        lineHeight: 18,
    },
    originalPrice: {
        fontSize: 16,
        color: '#de4754',
        opacity: 0.9,
        textDecorationLine: 'line-through',
    },
    saveAmount: {
        backgroundColor: '#dc3545',
        borderRadius: 5,
        color: 'white',
        fontSize: 11,
        paddingHorizontal: 4,
    },
    productText: {
        lineHeight: 20,
        fontSize: 18,
        fontWeight: '700',
        color: themedColors.tertiary,
        fontFamily: 'PoppinsBold',
    }
})

//https://judge.me/api/v1/widgets/product_review?api_token=8XUjHUpBuT32Ef9pDhi_dft_yr4&shop_domain=averagejoecoffee-com-au.myshopify.com&scope=[read_widgets]&handle=ikape-v2-espresso-puck-screen