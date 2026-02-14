import { api } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import type { Product } from "@/types/product.type";
import axios from "axios";

interface ProductState {
  products: Product[] | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: ProductState = {
  products: null,
  isLoading: false,
  error: null,
  success: false,
};

interface QueryParams {
  page: number;
  limit: number;
  sort: "createdAt" | "updatedAt" | "name" | "price";
  order: "asc" | "desc";
}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    { page, limit, sort, order }: QueryParams,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.get("/product", {
        params: {
          page,
          limit,
          sort,
          order,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
        dispatch(
          showToastMessage({
            message: error.response?.data.error,
            status: "error",
          }),
        );
      }
      return rejectWithValue(error);
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
      state.success = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.success = false;
    });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
