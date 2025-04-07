import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [dockerImages, setDockerImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    semester: '',
    subject: '',
    ubuntuPullCommand: '',
    ubuntuRunCommand: '',
    windowsPullCommand: '',
    windowsRunCommand: '',
    ubuntuInstructions: '',
    windowsInstructions: '',
    notes: ''
  });

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQwMDMyMjgsImV4cCI6MTc0NDA4OTYyOH0.iK5ZE1hlApv7EkEFZgnTeOgVd7v7UaTZbheqUqsm_Gw';

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
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

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/images/${editId}`, form, axiosConfig);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/images', form, axiosConfig);
      }
      fetchImages();
      setForm({
        semester: '',
        subject: '',
        ubuntuPullCommand: '',
        ubuntuRunCommand: '',
        windowsPullCommand: '',
        windowsRunCommand: '',
        ubuntuInstructions: '',
        windowsInstructions: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  const handleEdit = (image) => {
    setForm({
      semester: image.semester,
      subject: image.subject,
      ubuntuPullCommand: image.ubuntuPullCommand || '',
      ubuntuRunCommand: image.ubuntuRunCommand || '',
      windowsPullCommand: image.windowsPullCommand || '',
      windowsRunCommand: image.windowsRunCommand || '',
      ubuntuInstructions: image.ubuntuInstructions || '',
      windowsInstructions: image.windowsInstructions || '',
      notes: image.notes || ''
    });
    setEditId(image._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`, axiosConfig);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <Navbar isAdmin={true} />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {editId ? 'Edit Docker Image' : 'Add Docker Image'}
        </h1>

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
            placeholder="Ubuntu Pull Command"
            value={form.ubuntuPullCommand}
            onChange={(e) => setForm({ ...form, ubuntuPullCommand: e.target.value })}
          />
          <input
            className="border rounded-lg p-2"
            placeholder="Ubuntu Run Command"
            value={form.ubuntuRunCommand}
            onChange={(e) => setForm({ ...form, ubuntuRunCommand: e.target.value })}
          />
          <input
            className="border rounded-lg p-2"
            placeholder="Windows Pull Command"
            value={form.windowsPullCommand}
            onChange={(e) => setForm({ ...form, windowsPullCommand: e.target.value })}
          />
          <input
            className="border rounded-lg p-2"
            placeholder="Windows Run Command"
            value={form.windowsRunCommand}
            onChange={(e) => setForm({ ...form, windowsRunCommand: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Ubuntu Instructions"
            rows="2"
            value={form.ubuntuInstructions}
            onChange={(e) => setForm({ ...form, ubuntuInstructions: e.target.value })}
          />
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            placeholder="Windows Instructions"
            rows="2"
            value={form.windowsInstructions}
            onChange={(e) => setForm({ ...form, windowsInstructions: e.target.value })}
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
            {editId ? 'Update Image' : 'Add Image'}
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
                <p className="text-sm text-gray-700"><strong>Ubuntu Pull:</strong> {img.ubuntuPullCommand}</p>
                <p className="text-sm text-gray-700"><strong>Ubuntu Run:</strong> {img.ubuntuRunCommand}</p>
                <p className="text-sm text-gray-700"><strong>Windows Pull:</strong> {img.windowsPullCommand}</p>
                <p className="text-sm text-gray-700"><strong>Windows Run:</strong> {img.windowsRunCommand}</p>
                <p className="text-sm text-gray-700"><strong>Ubuntu Instructions:</strong> {img.ubuntuInstructions}</p>
                <p className="text-sm text-gray-700"><strong>Windows Instructions:</strong> {img.windowsInstructions}</p>
                <p className="text-sm text-gray-700"><strong>Notes:</strong> {img.notes}</p>
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleEdit(img)}
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
