import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth() || {};
  let location = useLocation();

  console.log("user in protected: ", user);

  if (!user) {
    if (location.pathname !== "/signin") {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
