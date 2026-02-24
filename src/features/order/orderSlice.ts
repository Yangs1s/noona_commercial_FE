import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import type { CreateOrderType, OrderType, OrderStatus } from "@/types/order.type";
import { showToastMessage } from "../common/uiSlice";

interface OrderState {
  orders: OrderType[];
  orderNumber: string | null;
  orderLoading: boolean;
  orderError: string | null;
  orderSuccess: boolean;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const initialState: OrderState = {
  orders: [],
  orderNumber: null,
  orderLoading: false,
  orderError: null,
  orderSuccess: false,
  totalCount: 0,
  totalPages: 1,
  currentPage: 1,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    {
      payload,
      navigate,
    }: {
      payload: CreateOrderType;
      navigate: (path: string, options?: { state?: unknown }) => void;
    },
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

export const getOrdersAdmin = createAsyncThunk(
  "order/getOrdersAdmin",
  async (
    { query = "", page = 1 }: { query?: string; page?: number } = {},
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get("/order/admin", {
        params: { query, page },
      });
      return {
        data: response.data.data as OrderType[],
        totalCount: response.data.totalCount as number,
        totalPages: response.data.totalPages as number,
        currentPage: response.data.currentPage as number,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changeOrderStatus = createAsyncThunk(
  "order/changeOrderStatus",
  async (
    { id, status }: { id: string; status: OrderStatus },
    { rejectWithValue, dispatch },
  ) => {
    try {
      await api.patch(`/order/status/${id}`, { status });
      dispatch(showToastMessage({ message: "배송 상태가 변경되었습니다", status: "success" }));
      return { id, status };
    } catch (error) {
      dispatch(showToastMessage({ message: "배송 상태 변경 실패", status: "error" }));
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
    builder.addCase(getOrdersAdmin.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(getOrdersAdmin.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orders = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getOrdersAdmin.rejected, (state, action) => {
      state.orderLoading = false;
      state.orderError = action.error.message as string;
    });
    builder.addCase(changeOrderStatus.fulfilled, (state, action) => {
      const order = state.orders.find((o) => o._id === action.payload.id);
      if (order) order.status = action.payload.status;
    });
  },
});

export default orderSlice.reducer;
