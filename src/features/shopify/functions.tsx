import Client from 'shopify-buy';
import { SHOPIFY_ACCESS_TOKEN } from '@env';

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