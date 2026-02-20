import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

import LoginPage from "@/pages/LoginPage/LoginPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import ProductListPage from "@/pages/ProductList/ProductListpage";
import AdminInventoryPage from "@/pages/AdminInventoryPage/AdminInventoryPage";
import ProductPage from "@/pages/ProductDetail/ProductPage";
import CartPage from "@/pages/Cart/CartPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PrivateRoutes permissionLevel={"customer"} />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<div>Payment</div>} />
        <Route path="/payment/success" element={<div>OrderComplete</div>} />
        <Route path="/account/purchase" element={<div>MyPage</div>} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={<PrivateRoutes permissionLevel={"admin"} />}
      >
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="orders" element={<div>Orders</div>} />
        <Route path="analytics" element={<div>Analytics</div>} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  );
}
