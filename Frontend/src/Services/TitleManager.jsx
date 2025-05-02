import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const getTitleFromPath = (pathname) => {
      switch (pathname) {
        case "/":
          return "Login - Croma";
        case "/signup":
          return "Signup - Croma";
        case "/home":
          return "Home - Croma";
        case "/checkout":
          return "Checkout - Croma";
        case "/product":
          return "Product Description - Croma";
        case "/wishlist":
          return "Wishlist - Croma";
        case "/trackorder":
          return "Track Order - Croma";
        case "/contact":
          return "Contact Us - Croma";
        case "/mobile":
          return "Mobile - Croma";
        case "/returns":
          return "Return Policy - Croma";
        case "/privacy":
          return "Privacy Policy - Croma";
        case "/termsandcondition":
          return "Terms & Conditions - Croma";
        default:
          return "Croma";
      }
    };

    document.title = getTitleFromPath(location.pathname);
  }, [location]);

  return null;
};

export default TitleManager