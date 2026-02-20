import { api } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import axios from "axios";
import { type ProductType } from "@/types/product.type";

interface CartItemType {
  productId: ProductType;
  size: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItemType[];
  cartQty: number;
  cartLoading: boolean;
  cartError: string | null;
  cartSuccess: boolean;
}

const initialState: CartState = {
  cartItems: [],
  cartQty: 0,
  cartLoading: false,
  cartError: null,
  cartSuccess: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    item: { productId: string; size: string; quantity: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.post("/cart/create", item);
      dispatch(
        showToastMessage({
          message: response.data.status,
          status: "success",
        }),
      );
      console.log(response.data.cartQty);
      return response.data.cartQty;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/cart/get");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    item: { productId: string; size: string; quantity: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.put("/cart/update", item);

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.cartError = null;
      state.cartSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartQty = action.payload;
      state.cartSuccess = true;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });

    builder.addCase(getCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartItems = action.payload;
      state.cartSuccess = true;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });
    builder.addCase(updateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartItems = action.payload;
      state.cartSuccess = true;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });
  },
});

export const { clearErrors } = cartSlice.actions;
export default cartSlice.reducer;
