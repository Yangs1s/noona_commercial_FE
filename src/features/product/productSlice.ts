import { api } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToastMessage } from "../common/uiSlice";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
  stock: number;
}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await api.get("/product", {
        params: {
          page,
          limit,
        },
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
