import { CheckoutLineItem, Product, ProductVariant } from "shopify-buy";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "@/features/shopify";
import { CartLineItem } from "@/domain/shopify";
import Svg, { Path } from "react-native-svg";

function BinIcon({onPress}: { onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <Path
                    d="M3.28125 3.28125L3.86719 12.6562C3.89502 13.1979 4.28906 13.5938 4.80469 13.5938H10.1953C10.713 13.5938 11.0997 13.1979 11.1328 12.6562L11.7188 3.28125"
                    stroke="#8F8F8F" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"></Path>
                <Path d="M2.34375 3.28125H12.6562H2.34375Z" fill="#8F8F8F"></Path>
                <Path d="M2.34375 3.28125H12.6562" stroke="#8F8F8F" stroke-width="0.9375" stroke-miterlimit="10"
                      stroke-linecap="round"></Path>
                <Path
                    d="M9.60938 5.15625L9.375 11.7188M5.625 3.28125V2.10938C5.62473 2.01697 5.64273 1.92541 5.67797 1.83998C5.71321 1.75455 5.76499 1.67693 5.83034 1.61159C5.89568 1.54624 5.9733 1.49446 6.05873 1.45922C6.14416 1.42398 6.23571 1.40598 6.32812 1.40625H8.67188C8.76429 1.40598 8.85584 1.42398 8.94127 1.45922C9.0267 1.49446 9.10432 1.54624 9.16966 1.61159C9.23501 1.67693 9.28679 1.75455 9.32203 1.83998C9.35727 1.92541 9.37527 2.01697 9.375 2.10938V3.28125H5.625ZM7.5 5.15625V11.7188V5.15625ZM5.39062 5.15625L5.625 11.7188L5.39062 5.15625Z"
                    stroke="#8F8F8F" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"></Path>
            </Svg>
        </TouchableOpacity>
    );
}

export function CartItem({lineItem}: { lineItem: CheckoutLineItem }) {
    useEffect(() => {
        console.log('--------------------------------------------------------------------')
        console.log(lineItem.variant);
    }, [lineItem]);
    return (
        <>
            {lineItem &&
                <View style={styles.container}>
                    <Image source={{uri: lineItem.variant!.image.src}} style={styles.image} />
                    <Text style={styles.productTitle}>{lineItem.title ?? ''}</Text>
                    <BinIcon onPress={() => null} />
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        padding: 16,
        backgroundColor: '#f6f6f7',
        borderBottomWidth: 1,
        borderColor: '#00000009',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})