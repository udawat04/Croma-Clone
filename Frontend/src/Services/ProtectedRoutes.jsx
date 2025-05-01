import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = localStorage.getItem("UserData"); // Check if user info exists in localStorage

  // If no user found, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user is found, show the protected page
  return <Outlet />;
}

export default ProtectedRoutes