import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {
  permissionLevel: "customer" | "admin";
}

export default function PrivateRoutes({ permissionLevel }: PrivateRoutesProps) {
  const user = { level: "customer" as "customer" | "admin" };
  const isAuthenticated = user?.level === permissionLevel;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
