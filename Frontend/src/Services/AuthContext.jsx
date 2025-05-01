import { createContext, useContext, useEffect, useState } from "react";
import { loginWithGoogle } from "./AuthServices";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("UserData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Fix: extract coordinates from stored user if available
      if (parsed.coordinates) {
        setCoordinates(parsed.coordinates);
      }
    }
  }, []);

  // Google Login
  const loginWithGoogleAuth = async (credentialResponseDecoded) => {
    const userData = {
      googleId: credentialResponseDecoded.sub,
      email: credentialResponseDecoded.email,
      name: credentialResponseDecoded.name,
    };

    const response = await loginWithGoogle(userData); // API call
    setUser(response);
    localStorage.setItem("UserData", JSON.stringify(response));
  };

  // Email/Password Login
  const loginWithCredentials = async (userData, coordinates) => {
    setUser(userData);
    setCoordinates(coordinates);
    localStorage.setItem(
      "UserData",
      JSON.stringify({ ...userData, coordinates })
    );
  };

  const logout = () => {
    localStorage.removeItem("UserData");
    setUser(null);
    setCoordinates({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        coordinates,
        loginWithGoogleAuth,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
