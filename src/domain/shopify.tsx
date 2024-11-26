import { Cart, Checkout, ProductPriceRange, ProductVariant } from "shopify-buy";
import { Image } from "react-native";
import { ProductReviewBody, ProductReviewResponseDto } from "@/store/dto/dto";

export interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  priceRange: ProductPriceRange;
  tags: string[];
}

export interface CustomVariant {
    title: string | undefined,
    price: number | undefined,
    compareAtPrice: number | undefined,
    image: string | undefined,
}

export interface CartLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: CustomVariant | undefined;
}

export interface CustomCheckout {
    subtotalPrice: number,
    lineItems: CartLineItem[],
    webUrl: string,
}

export interface ShopifyRemoteData {
    checkoutId: string;
    cart: CustomCheckout | null;
    allReviews: ProductReviewBody[];
}

export const initShopifyRemoteData = (): ShopifyRemoteData => {
    return {
        checkoutId: '',
        cart: null,
        allReviews: [],
    }
}

