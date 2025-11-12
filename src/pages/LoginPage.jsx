import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { useLoading } from '../context/LoadingContext';

export default function LoginPage() {
  const { setAuth } = useAuth();
  const { auth } = useApi();
  const { loading } = useLoading();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const data = await auth.login({ username, password });
      setAuth({ user: data.user, accessToken: data.accessToken});
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Đăng nhập</h2>
        {formError && <div className="text-red-500 mb-2">{formError}</div>}
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
