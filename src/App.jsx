import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { setLoadingHandler } from './api/axiosClient';
import GlobalLoading from './components/GlobalLoading';
import ThemeSwitcher from './components/ThemeSwitcher'; // nếu Nhàn đang dùng dark mode

function AppContent() {
  const { user, loading } = useAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoadingHandler(setLoading); // Gắn setLoading vào axiosClient
  }, [setLoading]);

  // Nếu đang loading => hiển thị hiệu ứng toàn cục
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <GlobalLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500">
      <GlobalLoading />
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={ user ? <ProductPage /> : <Navigate to="/login" /> } /> 
        <Route path="/dashboard" element={ user ? <Dashboard /> : <Navigate to="/login" /> } /> 
        <Route path="*" element={ <Navigate to={user ? '/dashboard' : '/login'} /> } />
      </Routes>

      {/* Nếu muốn hiển thị nút đổi theme góc dưới */}
      <div className="fixed bottom-4 right-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}
