import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // Auto-login / fetch current user
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch (err) {
        console.error("Auto-login failed:", err?.response?.data || err.message);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  // login function
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { user, token } = res.data.data;

    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  // logout function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
