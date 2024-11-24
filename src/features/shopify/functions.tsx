import Client, { CheckoutLineItemInput } from 'shopify-buy';
import { SHOPIFY_ACCESS_TOKEN } from '@env';
import { PRODUCT_REVIEW_API } from "@/features/shopify/constants";

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
    const pageToJson = await response.json();
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
    console.log('ALL REVIEWS LENGTH', allReviews.length);
    return allReviews.filter(review => review.product_handle === productHandle);
}

export async function createCheckout() {
    const checkout = await client.checkout.create();
    return checkout.id;
}

export async function fetchCheckout(checkoutId: string) {
    return client.checkout.fetch(checkoutId);
}

export async function addItem(checkoutId: string, itemId: CheckoutLineItemInput[]) {
    return client.checkout.addLineItems(checkoutId, itemId);
}

export async function updateItem(checkoutId: string, lineItemToUpdate: CheckoutLineItemInput[]) {
    return client.checkout.updateLineItems(checkoutId, lineItemToUpdate);
}
