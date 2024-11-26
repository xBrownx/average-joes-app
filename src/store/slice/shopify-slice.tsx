import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCheckout, fetchAllProductReviews, fetchCheckout } from "@/shopify";
import { RootState } from "@/store/reducers";
import { initShopifyRemoteData, ShopifyRemoteData } from "@/domain/shopify";
import { useFirebase } from "@/firebase";
import { ProductReviewBody } from "@/store/dto/dto";
import { shopifyCheckoutToCart } from "@/store/dto/transform";

export const loadShopifyData = createAsyncThunk<any, void, { rejectValue: string }>(
    "shopifyData/loadShopifyReviews",
    async (_, thunkAPI) => {
        const {fetchCollection, addQuery} = useFirebase({collectionId: 'userCarts'});
        try {
            const userCarts = await fetchCollection();
            const checkoutId = (userCarts && userCarts.length > 0)
                ? userCarts[0].cartId
                : await createCheckout();
            const cart = await fetchCheckout(checkoutId);
            const allReviews: ProductReviewBody[] = await fetchAllProductReviews();

            const shopifyData: ShopifyRemoteData = {
                checkoutId,
                cart: shopifyCheckoutToCart(cart),
                allReviews,
            }

            await addQuery({cartId: shopifyData.checkoutId});
            return shopifyData;

        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch server data.");
        }
    }
);

interface ShopifyState {
    data: ShopifyRemoteData;
    loading: boolean;
    error: string | null;
}

const initialState: ShopifyState = {
    data: initShopifyRemoteData(),
    loading: false,
    error: null,
};

export const shopifySlice = createSlice({
    name: 'shopify-data',
    initialState,
    reducers: {
        setUserCartId: (state, action: PayloadAction<string>) => {
            state.data.checkoutId = action.payload;
        },
    },
    extraReducers: (builder:  ActionReducerMapBuilder<ShopifyState>) => {
        builder
            .addCase(loadShopifyData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadShopifyData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loadShopifyData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
});

export const { setUserCartId} = shopifySlice.actions;

export const selectProductReviews = (state: RootState) => state.shopify.data.allReviews;

export const selectUserCartId = (state: RootState) => state.shopify.data.checkoutId;

export const selectUserCart = (state: RootState) => state.shopify.data.cart;


export default shopifySlice.reducer;