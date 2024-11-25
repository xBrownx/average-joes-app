import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { themedColors } from '@/constants';
import { WhyBuyFromUs } from '@/features/landing/components/why-buy-from-us';
import { Banner } from '@/features/landing/components/banner';
import { ShopByCategory } from '@/features/landing/components/shop-by-category';
import { loadShopifyData, setUserCartId } from '@/store/slice/shopify-slice';
import { useAppDispatch } from '@/store';
import { LearningSection } from '@/features/landing/components/learning-section';
import { InstaFeed } from '@/features/landing/components/insta-feed';
import { ShopPreviewComponent } from '@/features/shop/components/shop-preview-component';
import {
    ACCESSORIES_COLLECTION,
    COFFEE_COLLECTION,
    JOEVEMBER_COLLECTION,
    TOP_SELLING_BUNDLES_COLLECTION,
} from '@/features/shopify/constants';
import { useFirebase } from '@/firebase';
import { createCheckout } from '@/features/shopify';
import { ShopAllCollection } from "@/features/shop/all-from-collection/shop-all-collection";


export function LandingCoreScreen() {
    const dispatch = useAppDispatch();
    const {fetchCollection, addQuery} = useFirebase({collectionId: 'userCarts'});
    const [createAttempts, setCreateAttempts] = useState(0);
    const [isViewAll, setViewAll] = useState(false);

    const [viewAllCollectionId, setViewAllCollectionId] = useState<string | null>(null);

    const loadUserCarts = async () => {
        console.log('loading cart...');
        const data = await fetchCollection();
        if (data && data.length > 0) {
            console.log('cart loaded...');
            console.log(data[0].cartId)
            dispatch(setUserCartId(data[0].cartId));
        } else {
            console.log('No carts found...');
            await createUserCart();
        }
    };

    const createUserCart = async () => {
        console.log('creating cart...');
        if (createAttempts > 3) {
            console.log('create cart limit reached');
            return;
        }
        setCreateAttempts(prev => prev++);
        const checkoutId = await createCheckout();
        const addQry = await addQuery({cartId: checkoutId});
        if (addQry) {
            await loadUserCarts();
        } else {
            console.log('error creating cart');
        }
    };


    useEffect(() => {
        loadUserCarts();
    }, []);

    useEffect(() => {
        dispatch(loadShopifyData());
    }, []);

    function onProductPress(productId: string) {
        console.log('onProductPress:', productId);
    }

    function onViewAllPress(collectionId: string) {
        setViewAllCollectionId(collectionId);
        setViewAll(true);
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            {isViewAll && viewAllCollectionId?
                <ShopAllCollection
                    collectionId={viewAllCollectionId}
                />
                : <>
                    <Banner />
                    <View style={styles.container}>
                        <ShopPreviewComponent
                            title={'JOEVEMBER OFFERS'}
                            collectionId={JOEVEMBER_COLLECTION}
                            onViewAllPress={onViewAllPress}
                            onProductPress={onProductPress}
                        />
                        <ShopPreviewComponent
                            title={'TOP SELLING BUNDLES'}
                            collectionId={TOP_SELLING_BUNDLES_COLLECTION}
                            onViewAllPress={onViewAllPress}
                            onProductPress={onProductPress}
                        />
                        <ShopByCategory />
                        <WhyBuyFromUs />
                        <ShopPreviewComponent
                            title={'SHOP ACCESSORIES'}
                            collectionId={ACCESSORIES_COLLECTION}
                            onViewAllPress={onViewAllPress}
                            onProductPress={onProductPress}
                        />
                        <LearningSection />
                        <InstaFeed />
                        <ShopPreviewComponent
                            title={'COFFEE ROASTED FOR HOME MACHINES'}
                            collectionId={COFFEE_COLLECTION}
                            onProductPress={onProductPress}
                        />
                    </View>
                </>
            }
        </ScrollView>
    )
        ;
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