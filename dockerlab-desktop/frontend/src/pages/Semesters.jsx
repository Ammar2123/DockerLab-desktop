// src/pages/Semesters.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const Semesters = () => {
  const navigate = useNavigate();

  const handleClick = (sem) => {
    navigate(`/semester/${sem}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
    <Navbar isAdmin={false} />
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        📚 Select a Semester
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => {
          const sem = index + 1;
          return (
            <div
              key={sem}
              onClick={() => handleClick(sem)}
              className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-xl p-6 text-center text-xl font-semibold text-blue-700 border border-blue-200"
            >
              Semester {sem}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Semesters;
