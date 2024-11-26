export interface GoogleSheetsResponseDto {
    range: string;
    majorDimension: string;
    values: string[][];
}

export interface ShopifyResponseDto {

}

export interface ProductReviewResponseDto {

}

export interface ProductReviewBody {
    "id": number,
    "title": string | null,
    "body": string,
    "rating": number,
    "product_external_id": number,
    "reviewer": {
        "id": number,
        "external_id": number,
        "email": string,
        "name": string,
        "phone": string | null,
        "accepts_marketing": boolean,
        "unsubscribed_at": string | null,
        "tags": string | null
    },
    "source": string,
    "curated": string,
    "published": boolean,
    "hidden": boolean,
    "verified": string,
    "featured": boolean,
    "created_at": string,
    "updated_at": string,
    "has_published_pictures": false,
    "has_published_videos": false,
    "pictures": string[],
    "ip_address": string | null,
    "product_title": string,
    "product_handle": string
}

export interface ProductReviewResponseDto {
    'current_age': number,
    'per_page': number,
    'reviews': ProductReviewBody[],
}