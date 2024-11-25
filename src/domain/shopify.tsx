import { ProductPriceRange, ProductVariant } from "shopify-buy";
import { Image } from "react-native";

export interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  priceRange: ProductPriceRange;
  tags: string[];
}

export interface CartLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ProductVariant;
}

export interface Cart {
  id: String;
  items: CartLineItem[];
  price: Number;
}


