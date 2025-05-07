import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import Services from "./pages/Service";
import CodeEditorPage from "./pages/codeEditorPage";

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/services"
            element={isLoggedIn ? <Services /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/editor/:projectId"
            element={isLoggedIn ? <CodeEditorPage /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
