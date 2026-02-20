import { api } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import type { ProductType } from "@/types/product.type";
import axios from "axios";
interface ProductResponse {
  data: ProductType[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
interface ProductState {
  products: ProductResponse | null;
  product: ProductType | null;
  productLoading: boolean;
  productError: string | null;
  productSuccess: boolean;
}
const initialState: ProductState = {
  products: {
    data: [],
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
  product: null,
  productLoading: false,
  productError: null,
  productSuccess: false,
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
  async (product: Omit<ProductType, "_id">, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/product/create", product);

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
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/product/${id}`);
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: ProductType, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/product/${product._id}`, product);
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

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/product/${id}`);
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
      state.productError = null;
      state.productSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.productLoading = false;
      state.productSuccess = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productLoading = false;
      state.products = action.payload;
      state.productSuccess = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
    builder.addCase(getProductsByCustomer.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProductsByCustomer.fulfilled, (state, action) => {
      state.productLoading = false;
      state.products = action.payload;
      state.productSuccess = true;
    });
    builder.addCase(getProductsByCustomer.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productLoading = false;
      state.productSuccess = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.productLoading = false;
      state.productSuccess = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productLoading = false;
      state.product = action.payload.product;
      state.productSuccess = true;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.productLoading = false;
      state.productError = action.error.message as string;
      state.productSuccess = false;
    });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
