// src/context/AuthContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, accessToken: null });
  const [loading, setLoading] = useState(true);

  // ✅ Dùng useRef để check chỉ chạy 1 lần
  const didCheck = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosClient.get('/auth/user');
        if (res.data) setAuth({ user: res.data.user, accessToken: res.data.accessToken });
        else setAuth({ user: null, accessToken: null });
      } catch (err) {
        console.warn('Phiên đăng nhập không hợp lệ hoặc đã hết hạn');
        setAuth({ user: null, accessToken: null });
      } finally {
        setLoading(false);
      }
    };

    if (!didCheck.current) {
      didCheck.current = true;
      // Bỏ qua trang login
      if (location.pathname !== '/login') checkAuth();
      else setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axiosClient.post('/auth/login', { username, password });
      if (res?.data?.user) {
        setAuth({ user: res.data.user, accessToken: res.data.accessToken });
      }
      return res;
    } catch (err) {
      console.error('Đăng nhập thất bại:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (err) {
      console.warn('Lỗi khi logout:', err.message);
    } finally {
      setAuth({ user: null, accessToken: null });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
