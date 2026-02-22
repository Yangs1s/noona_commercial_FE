import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToastMessage } from "@/types/ui.type";

interface UiState {

  toastMessage: ToastMessage;
}

const initialState: UiState = {

  toastMessage: { message: "", status: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToastMessage(state, action: PayloadAction<ToastMessage>) {
      state.toastMessage = {
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    hideToastMessage(state) {
      state.toastMessage = { message: "", status: "" };
    },
  },
});

export const { showToastMessage, hideToastMessage } = uiSlice.actions;
export default uiSlice.reducer;
