import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isAdmin }) => {
  const location = useLocation();

  if (isAdmin) {
    return (
      <nav className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-700">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link to="/admin/dashboard" className={linkStyle(location, "/admin/dashboard")}>Home</Link>
          <Link to="/admin/create-labs" className={linkStyle(location, "/admin/create-labs")}>Create Labs</Link>
          <Link to="/admin/create-docs" className={linkStyle(location, "/admin/create-docs")}>Create Documentation</Link>
          <Link to="/" className="text-red-500">Logout</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-700">DockerLab</h1>
      <div className="flex gap-6 text-blue-600 font-medium">
      <Link to="/" className={linkStyle(location, "/")}>HOME</Link>
        <Link to="/student" className={linkStyle(location, "/student")}>Labs</Link>
        <Link to="/student/docs" className={linkStyle(location, "/student/docs")}>Documentation</Link>
        <Link to="/admin/login" className={linkStyle(location, "/admin/login")}>Admin Portal</Link>
      </div>
    </nav>
  );
};

const linkStyle = (location, path) =>
  location.pathname === path ? "underline font-semibold" : "";

export default Navbar;
