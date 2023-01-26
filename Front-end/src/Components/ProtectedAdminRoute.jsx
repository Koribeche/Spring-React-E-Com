import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedAdminRoute() {
  const location = useLocation();
  const user = useSelector((state) => state.auth);
  return (
    <div>
      {user?.roles?.some((e) => e.name === "ROLE_ADMIN") ? (
        <Outlet />
      ) : (
        <Navigate to="/admin/login" state={{ from: location }} replace />
      )}
    </div>
  );
}
