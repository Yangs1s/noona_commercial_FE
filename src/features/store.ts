import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
