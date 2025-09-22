// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

// 1. Context 생성
const AuthContext = createContext();

// 2. Provider 정의
export const AuthProvider = ({ children }) => {
  // ✅ 로그인 상태
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // ✅ 로그인 처리 함수 (일반 로그인, 카카오 공통)
  const login = (newToken, userInfo) => {
    setToken(newToken);
    setUser(userInfo);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userInfo));

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;
  };

  // ✅ 로그아웃 함수
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  // ✅ 초기화 시 토큰이 있으면 axios에 자동 적용
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
