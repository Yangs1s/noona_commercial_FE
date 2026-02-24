import type { RootState } from "@/features/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {
  permissionLevel: "customer" | "admin";
}

export default function PrivateRoutes({ permissionLevel }: PrivateRoutesProps) {
  const { user, loading } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );

  const token = sessionStorage.getItem("accessToken");

  if (loading || (token && !user)) {
    return <div>Loading...</div>;
  }

  const hasPermission =
    user?.level === permissionLevel || user?.level === "admin";
  return hasPermission ? <Outlet /> : <Navigate to="/login" replace />;
}
