import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dockerImages, setDockerImages] = useState([]);
  const [form, setForm] = useState({
    semester: '',
    subject: '',
    pullCommand: '',
    runCommand: '',
    instructions: '',
    notes: ''
  });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQwMDMyMjgsImV4cCI6MTc0NDA4OTYyOH0.iK5ZE1hlApv7EkEFZgnTeOgVd7v7UaTZbheqUqsm_Gw';

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/images', form, axiosConfig);
      fetchImages();
      setForm({
        semester: '',
        subject: '',
        pullCommand: '',
        runCommand: '',
        instructions: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images', axiosConfig);
      setDockerImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Add Docker Image</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border rounded-lg p-2"
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          >
            <option value="">Select Semester</option>
            {[...Array(8).keys()].map((i) => (
              <option key={i} value={`Sem ${i + 1}`}>{`Sem ${i + 1}`}</option>
            ))}
          </select>
          <input
            className="border rounded-lg p-2"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <input
            className="border rounded-lg p-2"
            placeholder="Pull Command"
            value={form.pullCommand}
            onChange={(e) => setForm({ ...form, pullCommand: e.target.value })}
          />
          <input
            className="border rounded-lg p-2"
            placeholder="Run Command"
            value={form.runCommand}
            onChange={(e) => setForm({ ...form, runCommand: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Instructions"
            rows="3"
            value={form.instructions}
            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          />
          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Notes"
            rows="2"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Add Image
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Images</h2>
        {dockerImages.length === 0 ? (
          <p className="text-gray-500">No Docker images found.</p>
        ) : (
          <div className="grid gap-4">
            {dockerImages.map((img) => (
              <div
                key={img._id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {img.semester} - {img.subject}
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Pull:</strong> {img.pullCommand}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Run:</strong> {img.runCommand}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
