import { ProductPriceRange } from "shopify-buy";

export interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  priceRange: ProductPriceRange;
  tags: string[]
}

export interface Cart {
  id: String;
  items: [{ title: String; id: String; quantity: Number }];
  price: Number;
}
