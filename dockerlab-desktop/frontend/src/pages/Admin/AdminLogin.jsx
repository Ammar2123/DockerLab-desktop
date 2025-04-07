import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const AdminLogin = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      setAuth(true);
      navigate('/admin/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar isAdmin={true} />
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
   
   <div className="bg-white p-8 rounded-lg shadow-md w-96">
  
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
