import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const location = useLocation();
  const user = useSelector((state) => state.auth);

  if (!user)
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;

  console.log(user);

  if (user?.roles?.some((e) => e.name === "ROLE_ADMIN"))
    return (
      <Navigate to={{ pathname: "/admin", state: { from: "/admin/login" } }} />
    );
  return <Outlet />;
}
