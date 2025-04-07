import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentPortal = () => {
  const [dockerImages, setDockerImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images');
      setDockerImages(res.data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🧑‍🎓 Student Portal</h1>

      {dockerImages.length === 0 ? (
        <p className="text-center text-gray-600">No Docker images available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dockerImages.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                {img.semester} - {img.subject}
              </h3>

              <div className="mb-4">
                <p className="font-medium text-gray-700">Pull Command:</p>
                <code className="block bg-gray-100 rounded p-2 text-sm break-words text-gray-800">
                  {img.pullCommand}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(img.pullCommand)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                >
                  Copy
                </button>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-700">Run Command:</p>
                <code className="block bg-gray-100 rounded p-2 text-sm break-words text-gray-800">
                  {img.runCommand}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(img.runCommand)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                  Copy
                </button>
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-1 italic">📝 {img.instructions}</p>
                <p className="text-xs text-gray-500">🗒️ {img.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
