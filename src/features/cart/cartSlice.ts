import { api } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import { createOrder } from "../order/orderSlice";
import { logout } from "../user/userSlice";
import axios from "axios";
import type { CartItemType } from "@/types/cart.type";

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
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartItemId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/cart/delete/${cartItemId}`);
      dispatch(
        showToastMessage({
          message: response.data.status,
          status: "success",
        }),
      );
      return { items: response.data.data, cartQty: response.data.cartQty };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart/get");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCartQty = createAsyncThunk(
  "cart/getCartQty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart/qty");
      return response.data.data;
    } catch (error) {
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
      state.cartQty = action.payload.length;
      state.cartSuccess = true;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });

    builder.addCase(getCartQty.fulfilled, (state, action) => {
      state.cartQty = action.payload;
    });
    builder.addCase(updateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartItems = action.payload;
      state.cartQty = action.payload.length;
      state.cartSuccess = true;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });

    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartItems = action.payload.items;
      state.cartQty = action.payload.cartQty;
      state.cartSuccess = true;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartError = action.error.message as string;
      state.cartSuccess = false;
    });

    builder.addCase(createOrder.fulfilled, (state) => {
      state.cartItems = [];
      state.cartQty = 0;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.cartItems = [];
      state.cartQty = 0;
      state.cartError = null;
      state.cartSuccess = false;
    });
  },
});

export const { clearErrors } = cartSlice.actions;
export default cartSlice.reducer;
