import React from "react";
import { Navigate } from "react-router-dom";

function Test_protection({ children }) {
  // get user id from local storage
  const questionid = localStorage.getItem("questionid");

  // If user not logged in → redirect to login
  if (!questionid) {
    return <Navigate to="/dataanalysis" replace />;
  } else {
    return children;
  }
}

export default Test_protection;