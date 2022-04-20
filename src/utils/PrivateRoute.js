import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  return user && user.id !== null ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} />
  );
}

export default PrivateRoute;
