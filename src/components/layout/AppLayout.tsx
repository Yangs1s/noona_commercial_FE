import ShoppingLayout from "./ShoppingLayout";
import AdminLayout from "./AdminLayout";
import { useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "@/features/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loginWithToken } from "@/features/user/userSlice";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  // TODO: 실제 유저 인증 상태에서 level 가져오기
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );

  console.log(user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return user?.level === "customer" ? (
    <ShoppingLayout>{children}</ShoppingLayout>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
}
