import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// admin pages
import Admin from "./adminpages/Admin.jsx";
import Admin_test from "./adminpages/Admin_test.jsx";
import Admin_week_qst from "./adminpages/Admin_week_qst.jsx";

// pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import User from "./pages/User.jsx";
import Question from "./pages/Question.jsx";
import Test from "./pages/Test.jsx";
import Resetpassword from "./pages/Resetpassword.jsx";
// subjects
import Dataanalysis from "./pages_subjects/Dataanalysis.jsx";
// week
import Dataanalysis_week from "./pages_weeklytest/Dataanalysis_week.jsx";
import Week_test from "./pages_weeklytest/Week_test.jsx";
import Mark_statement from "./adminpages/Mark_statement.jsx";

import ProtectedRoute from "./pages/ProtectedRoute";
import Admin_protection from "./adminpages/Admin_protection.jsx";
import Week_test_protection from "./pages_weeklytest/Week_test_protection.jsx";
import Test_protection from "./pages/Test_protection.jsx";
import Login_protection from "./pages/Login_protection.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login_protection>
                <Register />
              </Login_protection>
            }
          />
          <Route
            path="/login"
            element={
              <Login_protection>
                <Login />
              </Login_protection>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <Login_protection>
                <Resetpassword />
              </Login_protection>
            }
          />

          <Route path="/admin" element={<Admin />} />

          <Route
            path="/admin_test"
            element={
              <Admin_protection>
                <Admin_test />
              </Admin_protection>
            }
          />

          <Route
            path="/admin_week_qst/:sub"
            element={
              <Admin_protection>
                <Admin_week_qst />
              </Admin_protection>
            }
          />

          <Route
            path="/Mark_statement"
            element={
              <Admin_protection>
                <Mark_statement />
              </Admin_protection>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question"
            element={
              <Test_protection>
                <Question />
              </Test_protection>
            }
          />
          <Route
            path="/test"
            element={
              <Test_protection>
                <Test />
              </Test_protection>
            }
          />
          <Route
            path="/dataanalysis"
            element={
              <ProtectedRoute>
                <Dataanalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dataanalysis_week"
            element={
              <ProtectedRoute>
                <Dataanalysis_week />
              </ProtectedRoute>
            }
          />
          <Route
            path="/week_test"
            element={
              <Week_test_protection>
                <Week_test />
              </Week_test_protection>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
