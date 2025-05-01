import React from 'react'

import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AddToCart from './Pages/AddToCart'
import ProductDescription from './Pages/ProductDescription'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import MobilesPage from './Pages/MobilePage'
import WishlistPage from './Pages/WishlistPage'
import OrderTrackingPage from './Pages/OrderTrackingPage'
import ContactPage from './Pages/ContactPage'
import TermsAndConditionPage from './Pages/TermsAndConditionPage'
import ReturnPage from './Pages/ReturnPage'
import FaqPage from './Pages/FaqPage'
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage'
import { ProductProvider } from './Services/ProductContextApi'
import MainLayout from './Layout/MainLayout'
import { AuthProvider } from './Services/AuthContext'
import ProtectedRoutes from './Services/ProtectedRoutes'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/checkout" element={<AddToCart />} />
                  <Route path="/product" element={<ProductDescription />} />
                  <Route path="/returns" element={<ReturnPage />} />
                  <Route path="/mobile" element={<MobilesPage />} />
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
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App