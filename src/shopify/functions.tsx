import Client, { CheckoutLineItemInput } from 'shopify-buy';
import { SHOPIFY_ACCESS_TOKEN } from '@env';
import { PRODUCT_REVIEW_API } from "@/shopify/constants";
import { useDispatch } from "react-redux";
import { useFirebase } from "@/firebase";
import { setUserCartId } from "@/store/slice/shopify-slice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { ProductReviewBody, ProductReviewResponseDto } from "@/store/dto/dto";

const client = Client.buildClient({
    apiVersion: '',
    domain: 'averagejoescoffee.com.au',
    storefrontAccessToken: SHOPIFY_ACCESS_TOKEN
});

export async function fetchAllProducts() {
    return client.product.fetchAll();
}

export async function fetchSingleProduct(productId: string) {
    return client.product.fetch(productId);
}


export async function fetchAllCollections() {
    return client.collection.fetchAllWithProducts();
}

export async function fetchSingleCollection(collectionId: string) {
    return client.collection.fetchWithProducts(collectionId, {productsFirst: 10})
}

export async function fetchProductsReviewPage(page: number) {
    const url = PRODUCT_REVIEW_API + page;
    const response = await fetch(url);
    const pageToJson: ProductReviewResponseDto = await response.json();
    return pageToJson.reviews;
}

export async function fetchAllProductReviews() {
    let page = 1;
    let reviewsPage = await fetchProductsReviewPage(page);
    let allReviews = [...reviewsPage];

    while (reviewsPage.length >= 100) {
        page += 1;
        reviewsPage = await fetchProductsReviewPage(page);
        allReviews = [...allReviews, ...reviewsPage];
    }

    return allReviews;
}

export async function fetchProductRating(productHandle: string) {
    const allReviews = await fetchAllProductReviews();
    return allReviews.filter(review => review.product_handle === productHandle);
}

export async function createCheckout() {
    const checkout = await client.checkout.create();
    return checkout.id;
}

export async function fetchCheckout(checkoutId: string) {
    return client.checkout.fetch(checkoutId);
}

export async function addItem(checkoutId: string, itemId: any) {
    return client.checkout.addLineItems(checkoutId, itemId);
}

export async function updateItem(checkoutId: string, lineItemToUpdate: any) {
    return client.checkout.updateLineItems(checkoutId, lineItemToUpdate);
}

// export async function useInitLoad() {
//     const dispatch = useAppDispatch();
//     const {fetchCollection, addQuery} = useFirebase({collectionId: 'userCarts'});
//     const [createCartAttempts, setCreateCartAttempts] = useState(0);
//     const loadUserCarts = async () => {
//         console.log('loading cart...');
//         const data = await fetchCollection();
//         if (data && data.length > 0) {
//             console.log('cart loaded...');
//             console.log(data[0].cartId)
//             dispatch(setUserCartId(data[0].cartId));
//             dispatch(loadUserCart());
//         } else {
//             console.log('No carts found...');
//             await createUserCart();
//         }
//     };
//
//     const createUserCart = async () => {
//         console.log('creating cart...');
//         if (createCartAttempts > 3) {
//             console.log('create cart limit reached');
//             return;
//         }
//         setCreateCartAttempts(prev => prev + 1);
//         const checkoutId = await createCheckout();
//         const addQry = await addQuery({cartId: checkoutId});
//         if (addQry) {
//             await loadUserCarts();
//         } else {
//             console.log('error creating cart');
//         }
//     };
//
//     useEffect(() => {
//         loadUserCarts();
//     }, []);
// }