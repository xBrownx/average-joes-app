import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal as RNModal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { selectUserCart, selectUserCartId } from '@/store/slice/shopify-slice';
import { fetchCheckout, updateItem } from '../../shopify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { CartItem } from '@/features/shop/components/cart-item';
import { Cart, Checkout } from 'shopify-buy';
import { ThemedModalProps } from '@/components/modal/types';
import { _themedModal } from '@/components/modal';
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";
import { openExternalUrl } from "@/util/open-url";


export default function ShopCartModal({isOpen, onClose}: ThemedModalProps) {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const focus = useIsFocused();
    const cart = useAppSelector(selectUserCart);
    const checkoutId = useAppSelector(selectUserCartId);

    const numbers = Array.from({length: 100}, (_, i) => i);

    const updateQuantity = async (itemId: String, newQuantity: number) => {
        const item = [
            {
                id: itemId,
                quantity: newQuantity,
            },
        ];

        const data = await updateItem(checkoutId, item);
        // const updatedCart: Cart = {
        //     id: data.id,
        //     items: data.lineItems.map((lineItem: any) => ({
        //         id: lineItem.id,
        //         title: lineItem.title,
        //         quantity: lineItem.quantity,
        //         variant: lineItem.variant,
        //     })),
        //     price: data.totalPrice.amount,
        // };
        // setCart(updatedCart);
    };

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType={'none'}
            statusBarTranslucent
        >
            <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headerText}>#JOEVEMBER CART</Text>
                        <Ionicons.Button
                            name="close" size={24}
                            color={'white'}
                            backgroundColor={'#3f3f3f'}
                            iconStyle={{marginRight: 0}}
                            onPress={onClose}
                            style={styles.exitButton}
                        />
                    </View>
                    {cart && cart.lineItems.length > 0 ?
                        <>
                            <ScrollView>
                                {cart?.lineItems.map((lineItem: any) => (
                                    <CartItem key={lineItem.id} lineItem={lineItem} />
                                    // <View key={lineItem.id}>
                                    //     <Text style={styles.whiteText}>{lineItem.title}</Text>
                                    //     <Picker
                                    //         selectedValue={lineItem.quantity}
                                    //         onValueChange={(itemValue, itemIndex) => {
                                    //             updateQuantity(lineItem.id, itemValue);
                                    //         }}
                                    //     >
                                    //         {numbers.map((number) => (
                                    //             <Picker.Item
                                    //                 key={number}
                                    //                 label={number.toString()}
                                    //                 value={number}
                                    //             />
                                    //         ))}
                                    //     </Picker>
                                    // </View>
                                ))}
                            </ScrollView>
                            <View style={styles.subtotalContainer}>
                                <View style={styles.subtotal}>
                                    <Text style={styles.subtotalText}>
                                        Subtotal
                                    </Text>
                                    <Text style={styles.subtotalText}>
                                        ${cart?.subtotalPrice}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('checkout', { uri: cart?.webUrl })
                                }}>
                                    <View style={styles.checkoutButton}>
                                        <Text style={styles.checkoutButtonText}>
                                            GO TO CHECKOUT
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </> :
                        <View style={styles.noItemsContainer}>
                            <ThemedText type='title' style={styles.noItemsText}>
                                CART IS EMPTY
                            </ThemedText>
                            <Button color={THEME_COLOURS.primary} title={'VISIT SHOP'} />
                        </View>
                    }
                </SafeAreaView>
            </Animated.View>

        </RNModal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1313',
        width: '100%',
        height: '100%',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'PoppinsBold, serif',
        fontWeight: 'bold',
    },
    exitButton: {
        margin: 0,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    subtotalContainer: {
        backgroundColor: '#f6f6f7',
        borderTopWidth: 1,
        borderColor: '#00000009',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    subtotal: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
        bottom: 0,
    },
    subtotalText: {
        fontSize: 18,
        fontFamily: 'PoppinsBold, serif',
    },
    checkoutButton: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#5CB465DD',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'PoppinsBold, serif',
        fontWeight: 'bold',
    },
    noItemsContainer: {
        paddingHorizontal: 16,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        marginTop: -120,
    },
    noItemsText: {
        fontWeight: 700,
        color: 'white'
    },
});