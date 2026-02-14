import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import productSlice from "./product/productSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    product: productSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
