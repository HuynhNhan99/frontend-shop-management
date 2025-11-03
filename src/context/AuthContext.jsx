import React, { createContext, useState, useEffect, useRef } from "react";
import authApi from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   // 🧠 Dùng useRef để tránh gọi lại khi StrictMode kích hoạt useEffect 2 lần
   const didCheck = useRef(false);

  // 🔄 Kiểm tra đăng nhập khi reload trang
  useEffect(() => {

    if (location.pathname === "/login") {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await authApi.user();
        if (res?.data?.user) setUser(res.data.user);
        else setUser(null);
      } catch (err) {
        console.warn("Phiên đăng nhập không hợp lệ hoặc đã hết hạn");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Chỉ chạy checkAuth 1 lần thật sự
    if (!didCheck.current) {
      didCheck.current = true;
      checkAuth();
    }
    
  }, []);

  // 🧩 Hàm login
  const login = async (username, password) => {
    try {
      const res = await authApi.login({ username, password });
      if (res?.data?.user) setUser(res.data.user);
      return res;
    } catch (err) {
      console.error("Đăng nhập thất bại:", err.response?.data || err.message);
      throw err;
    }
  };

  // 🚪 Hàm logout
  const logout = async () => {
    try {
      await authApi.logout(); // dùng hàm logout chuẩn
    } catch (err) {
      console.warn("Lỗi khi logout:", err.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
