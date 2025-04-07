import React from "react";
import Navbar from "../components/Navbar";

const AdminHome = ({ setAuth }) => {
  const handleLogout = () => {
    setAuth(false); // ❌ Clear auth
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />

      <main className="p-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Welcome, Admin</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-700">Use the navigation to manage labs and documentation.</p>
      </main>
    </div>
  );
};

export default AdminHome;
