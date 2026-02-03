// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // get user id from local storage
  const userid = localStorage.getItem("userid");

  // If user not logged in → redirect to login
  if (!userid) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;

