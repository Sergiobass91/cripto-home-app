import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="signup" element={<SignUpPage/>}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
