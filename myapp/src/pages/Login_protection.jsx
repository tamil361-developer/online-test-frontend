import React from "react";
import { Navigate } from "react-router-dom";

function Login_protection({ children }) {
  // get user id from local storage
  const userid = localStorage.getItem("userid");

  // If user not logged in → redirect to login
  if (userid) {
    return <Navigate to="/user" replace />;
  } else {
    return children;
  }
}

export default Login_protection;