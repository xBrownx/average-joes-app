import { JUDGE_ME_PRIVATE_API_KEY } from '@env';
export const SHOPIFY_DOMAIN = 'averagejoecoffee-com-au.myshopify.com';

export const JOEVEMBER_COLLECTION = 'gid://shopify/Collection/487853687097';
export const TOP_SELLING_BUNDLES_COLLECTION = 'gid://shopify/Collection/483930833209';

export const ACCESSORIES_COLLECTION = 'gid://shopify/Collection/449210810681';

export const COFFEE_COLLECTION = 'gid://shopify/Collection/465242194233';

export const PRODUCT_REVIEW_API = `https://judge.me/api/v1/reviews?api_token=${JUDGE_ME_PRIVATE_API_KEY}&shop_domain=${SHOPIFY_DOMAIN}&per_page=100&page=`;
