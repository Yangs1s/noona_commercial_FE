import ShoppingLayout from "./ShoppingLayout";
import AdminLayout from "./AdminLayout";
import { type RootState } from "@/features/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Activity, useEffect } from "react";
import { loginWithToken } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/features/store";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  // TODO: 실제 유저 인증 상태에서 level 가져오기
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);
  return (
    <>
      <Activity
        mode={location.pathname.includes("/admin") ? "visible" : "hidden"}
      >
        <AdminLayout>{children}</AdminLayout>
      </Activity>
      <Activity
        mode={location.pathname.includes("/admin") ? "hidden" : "visible"}
      >
        <ShoppingLayout>{children}</ShoppingLayout>
      </Activity>
    </>
  );
}
