// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = "hf_admin_access_token";
const STORAGE_USER_KEY = "hf_admin_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_TOKEN_KEY) || null;
  });

  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const tokenType = user?.tokenType || "Bearer";
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `${tokenType} ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }, [token, user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [user]);

  const login = (accessToken, userInfo) => {
    setToken(accessToken);
    setUser(userInfo);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}
