import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "@/pages/LoginPage/LoginPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import ProductListPage from "@/pages/ProductList/ProductListpage";

export default function AppRouter() {
  return (
    <Routes>
      {/* User */}
      <Route path="/" element={<ProductListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PrivateRoutes permissionLevel={"customer"} />}>
        <Route path="/cart" element={<div>Cart</div>} />
        <Route path="/payment" element={<div>Payment</div>} />
        <Route path="/payment/success" element={<div>OrderComplete</div>} />
        <Route path="/account/purchase" element={<div>MyPage</div>} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={<PrivateRoutes permissionLevel={"admin"} />}
      >
        <Route index element={<div>Dashboard</div>} />
        <Route path="inventory" element={<div>Inventory</div>} />
        <Route path="orders" element={<div>Orders</div>} />
        <Route path="analytics" element={<div>Analytics</div>} />
        <Route path="settings" element={<div>Settings</div>} />
      </Route>
    </Routes>
  );
}
