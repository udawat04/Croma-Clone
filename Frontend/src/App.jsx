import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AddToCart from "./Pages/AddToCart";
import ProductDescription from "./Pages/ProductDescription";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import MobilesPage from "./Pages/MobilePage";
import WishlistPage from "./Pages/WishlistPage";
import OrderTrackingPage from "./Pages/OrderTrackingPage";
import ContactPage from "./Pages/ContactPage";
import TermsAndConditionPage from "./Pages/TermsAndConditionPage";
import ReturnPage from "./Pages/ReturnPage";
import FaqPage from "./Pages/FaqPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";

import { ProductProvider } from "./Services/ProductContextApi";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import TitleManager from "./Services/TitleManager";

import ScrollToTop from "./Services/LocationPath"; 
import LaptopPage from "./Pages/LaptopPage";
import TvPage from "./Pages/TvPage";
import AppliancePage from "./Pages/AppliancePage";
import AccessoriesPage from "./Pages/AccessoriesPage";

// ✅ Component to manage and update page title dynamically


const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userdata = localStorage.getItem("UserData");
    setUser(userdata);
  
  }
  , []);
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <TitleManager /> {/* ✅ Dynamic Title Updater */}
        <ProductProvider>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <LoginPage />}
            />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/checkout" element={<AddToCart />} />
                <Route path="/product/:id" element={<ProductDescription />} />
                <Route path="/returns" element={<ReturnPage />} />
                <Route path="/mobile" element={<MobilesPage />} />
                <Route path="/laptop" element={<LaptopPage />} />
                <Route path="/tv" element={<TvPage />} />
                <Route path="/appliances" element={<AppliancePage />} />
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/trackorder" element={<OrderTrackingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faqs" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route
                  path="/termsandcondition"
                  element={<TermsAndConditionPage />}
                />
              </Route>
            </Route>
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
