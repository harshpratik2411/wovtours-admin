import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAuthenticated");

  return isLoggedIn === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
