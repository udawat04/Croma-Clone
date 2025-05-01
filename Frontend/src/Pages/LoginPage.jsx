import React from "react";
import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../Services/AuthContext";

const LoginPage = () => {
   const navigate = useNavigate();
   const {  loginWithCredentials } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
     e.preventDefault();

     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         async (position) => {
           const { latitude, longitude } = position.coords;
           const coords = { latitude, longitude };

           try {
             const res = await fetch("http://localhost:4000/login", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 email,
                 password,
                 coordinates: coords, // 🔥 Send coordinates here
               }),
             });

             const result = await res.json();
             console.log(result);
             if (res.status !== 200) {
               alert(result.error || "Login failed");
               return;
             }

             // 🔐 Store user + coordinates
             await loginWithCredentials(result.user, coords);

             navigate("/home");
             window.location.reload();
           } catch (error) {
             console.error("Login error:", error);
             alert("Something went wrong.");
           }
         },
         (error) => {
           console.error("Geolocation error:", error);
           alert("Location access denied. Logging in without coordinates.");
           // Fallback
         }
       );
     } else {
       alert("Geolocation not supported.");
     }
   };

  //  const handleGoogleLogin = async (credentialResponse) => {
  //    try {
  //      const decoded = jwtDecode(credentialResponse.credential);
  //      await loginWithGoogleAuth(decoded);
  //      navigate("/admin");
  //      window.location.reload();
  //    } catch (error) {
  //      console.error("Login failed:", error);
  //    }
  //  };
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                required
              />
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-600" />
              <span className="px-3 text-gray-400">or</span>
              <hr className="flex-1 border-gray-600" />
            </div>

            {/* Google Login
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
                theme="filled_blue"
                text="signin"
                size="large"
                shape="rectangular"
                width="300"
              />
            </div> */}
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
