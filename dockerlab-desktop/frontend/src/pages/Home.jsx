import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
       <Navbar isAdmin={false} />
       
      <main className="text-center py-32 px-6">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Welcome to DockerLab</h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          A streamlined educational platform using Docker containers to simulate real lab environments.
          Students can access labs and documentation, while admins manage content from the portal.
        </p>
      </main>
    </div>
  );
};

export default Home;