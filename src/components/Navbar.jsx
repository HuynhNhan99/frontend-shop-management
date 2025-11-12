import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { auth, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const user = auth.user;

  const handleCloseMenu = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setMenuOpen(false);
    }, 300); // khớp với thời gian animation
  };

  return (
    <>
      {/* Thanh navbar */}
      <nav className="bg-[var(--color-primary)] text-white p-4 flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          {/* Nút 3 gạch chỉ hiện trên mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl focus:outline-none"
          >
            ☰
          </button>

          <Link to="/dashboard" className="text-lg font-bold">
            Shop Manager
          </Link>
          <div className="hidden md:flex gap-4">
            <Link to="/products" className="text-sm opacity-90 hover:underline">
              Products
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm">
              Hi, <strong>{user.username || user.sub || user.name}</strong>
            </span>
          )}
          <button
            onClick={logout}
            className="bg-[var(--color-accent)] px-3 py-1 rounded hover:bg-[var(--color-accent-dark)] "
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Menu trượt bên trái */}
      {menuOpen && (
        <>
          <div
            onClick={handleCloseMenu}
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              animating ? 'opacity-0' : 'opacity-100'
            }`}
          ></div>
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-lg z-50 p-4 ${
              animating ? 'animate-slideOut' : 'animate-slideIn'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={handleCloseMenu}
                className="text-2xl font-bold text-gray-700"
              >
                ×
              </button>
            </div>

            <Link
              to="/dashboard"
              className="block py-2 border-b hover:text-blue-600"
              onClick={handleCloseMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className="block py-2 border-b hover:text-blue-600"
              onClick={handleCloseMenu}
            >
              Products
            </Link>
            <button
              onClick={() => {
                logout();
                handleCloseMenu();
              }}
              className="mt-4 bg-[var(--color-accent)] text-white w-full py-2 rounded hover:bg-[var(--color-accent-dark)]"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
}
