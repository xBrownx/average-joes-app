import { ProductPriceRange } from "shopify-buy";

export interface Product {
  id: string;
  title: string;
  images: { src: string }[];
  priceRange: ProductPriceRange;
  tags: string[]
}