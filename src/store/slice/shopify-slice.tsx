import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllProductReviews } from "@/features/shopify";
import { RootState } from "@/store/reducers";
import { Cart } from '@/domain/shopify';

export const loadShopifyData = createAsyncThunk<any, void, { rejectValue: string }>(
    "shopifyData/loadShopifyData",
    async (_, thunkAPI) => {
        try {
            return await fetchAllProductReviews();
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch server data.");
        }
    }
);

interface ShopifyState {
    data: any;
    cartId: string;
    cart: Cart | null,
    loading: boolean;
    error: string | null;
}

const initialState: ShopifyState = {
    data: [],
    cartId: "",
    cart: null,
    loading: false,
    error: null,
};

export const shopifySlice = createSlice({
    name: 'shopify-data',
    initialState,
    reducers: {
        setUserCartId: (state, action: PayloadAction<string>) => {
            state.cartId = action.payload;
        },
        setUserCart: (state, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
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
            });
    }
});

export const { setUserCartId, setUserCart } = shopifySlice.actions;

export const selectProductReviews = (state: RootState) => state.shopify.data;

export const selectUserCartId = (state: RootState) => state.shopify.cartId;

export default shopifySlice.reducer;