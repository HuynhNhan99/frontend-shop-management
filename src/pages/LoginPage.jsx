import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Đăng nhập</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input className="w-full p-2 border rounded mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Đăng nhập</button>
      </form>
    </div>
  )
}
