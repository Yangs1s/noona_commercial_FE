import type { RootState } from "@/features/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoutes() {
  const { user, loading } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );

  const token = localStorage.getItem("accessToken");

  if (loading || (token && !user)) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
}
