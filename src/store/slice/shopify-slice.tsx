import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllProductReviews } from "@/features/shopify";
import { RootState } from "@/store/reducers";

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
    loading: boolean;
    error: string | null;
}

const initialState: ShopifyState = {
    data: [],
    loading: false,
    error: null,
};

export const shopifySlice = createSlice({
    name: 'shopify-data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
})

export const selectProductReviews = (state: RootState) => state.shopify.data;

export default shopifySlice.reducer;