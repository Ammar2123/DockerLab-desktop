import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminHome = ({ setAuth }) => {
  const handleLogout = () => {
    setAuth(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />
        <h1 className="text-xl font-bold text-blue-700">Admin Dashboard</h1>
        
     
      <main className="p-10">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Welcome, Admin</h2>
        <p className="text-gray-700">Use the navigation to manage labs and documentation.</p>
      </main>
    </div>
  );
};

export default AdminHome;
