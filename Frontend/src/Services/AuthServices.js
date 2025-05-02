import axios from "axios";

const API_URL = "http://localhost:4000";

export const loginWithGoogle = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/googlelogin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
