import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Price from "./pages/Price";
import { Toaster } from "react-hot-toast";
import JPGPNG from "./pages/JPGPNG";
import ScrollToTop from "./utils/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./components/AuthForm/VerifyEmail";
import ImageConverter from "./pages/ImageConverter";
import PNGJPG from "./pages/PNGJPG";

const MainContent = () => {
  const location = useLocation();
  const shouldShowFooter =()=>{
    const { pathname } = location;
   return !['/sign-in', '/sign-up'].includes(pathname);
  }
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "toast",
          style: {
            backgroundColor: "#333",
            color: "#e0e0e0",
            border: "1px solid #444",
          },
          success: {
            style: {
              backgroundColor: "#2e7d32",
            },
          },
          error: {
            style: {
              backgroundColor: "#d32f2f",
            },
          },
          loading: {
            style: {
              backgroundColor: "#1976d2",
            },
          },
        }}
      />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/pricing" element={<Price />} />
        <Route path="/jpg-to-png" element={<JPGPNG />} />
        <Route path="/png-to-jpg" element={<PNGJPG />} />
        <Route path="/url-to-image" element={<ImageConverter />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      {shouldShowFooter() && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainContent />
    </Router>
  );
};

export default App;
