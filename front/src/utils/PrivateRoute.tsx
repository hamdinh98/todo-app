import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Route, useNavigate, Navigate } from "react-router-dom";

// @ts-ignore
function PrivateRoute({ children }) {
  const auth = useAuth();
  return !auth ? <Navigate to="/" /> : children;
}

export default PrivateRoute;
