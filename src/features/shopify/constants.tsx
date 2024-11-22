import { JUDGE_ME_PRIVATE_API_KEY } from '@env';
export const SHOPIFY_DOMAIN = 'averagejoecoffee-com-au.myshopify.com';

export const PRODUCT_REVIEW_API = `https://judge.me/api/v1/reviews?api_token=${JUDGE_ME_PRIVATE_API_KEY}&shop_domain=${SHOPIFY_DOMAIN}&per_page=100&page=`;
