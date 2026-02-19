import { api } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import type { Product } from "@/types/product.type";
import axios from "axios";
interface ProductResponse {
  data: Product[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
interface ProductState {
  products: ProductResponse | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: ProductState = {
  products: {
    data: [],
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
  isLoading: false,
  error: null,
  success: false,
};

interface QueryParams {
  page: number;
  limit: number;
  sort: "createdAt" | "updatedAt" | "name" | "price";
  order: "asc" | "desc";
  query: string;
}
// 고객 혹은 비로그인 사용자가 상품을 조회할 때 사용하는 컨트롤러
export const getProductsByCustomer = createAsyncThunk(
  "product/getProductsByCustomer",
  async (queryParams: QueryParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/product/customer", {
        params: { ...queryParams },
      });
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
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (queryParams: QueryParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/product", {
        params: { ...queryParams },
      });
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
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product: Omit<Product, "_id">, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/product/create", product);
      console.log(response.data);
      dispatch(
        showToastMessage({
          message: response.data.status,
          status: "success",
        }),
      );
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
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.success = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.success = false;
    });
    builder.addCase(getProductsByCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    });
    builder.addCase(getProductsByCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.success = false;
    });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
