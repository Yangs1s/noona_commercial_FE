import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import type { CreateOrderType, OrderType } from "@/types/order.type";
import { showToastMessage } from "../common/uiSlice";

interface OrderState {
  orders: OrderType[];
  orderNumber: string | null;
  orderLoading: boolean;
  orderError: string | null;
  orderSuccess: boolean;
}

const initialState: OrderState = {
  orders: [],
  orderNumber: null,
  orderLoading: false,
  orderError: null,
  orderSuccess: false,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    {
      payload,
      navigate,
    }: { payload: CreateOrderType; navigate: (path: string, options?: { state?: unknown }) => void },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.post("/order/create", payload);
      if (response.status === 200) {
        dispatch(
          showToastMessage({
            message: response.data.status,
            status: "success",
          }),
        );
        const orderNumber = response.data.orderNumber;
        navigate("/payment/success", { state: { orderNumber } });
        return { orderNumber };
      }
      dispatch(
        showToastMessage({
          message: response.data.error,
          status: "error",
        }),
      );
      return rejectWithValue(response.data.error);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order");
      return response.data.data as OrderType[];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.orderError = null;
      state.orderSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orderNumber = action.payload.orderNumber;
      state.orderError = null;
      state.orderSuccess = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderError = action.error.message as string;
      state.orderSuccess = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderError = action.error.message as string;
    });
  },
});

export default orderSlice.reducer;
