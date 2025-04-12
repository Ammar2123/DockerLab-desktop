import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [dockerImages, setDockerImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

 // Replace the hardcoded token with:
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQzOTc4NDYsImV4cCI6MTc0NDQ4NDI0Nn0.-DVgC8mZB8kRWMUat8DPoMhkShaEOy6vsp3IeteqnoU";

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('https://dockerlab-desktop.onrender.com/api/images', axiosConfig);
      setDockerImages(res.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`https://dockerlab-desktop.onrender.com/api/images/${editId}`, form, axiosConfig);
        setEditId(null);
      } else {
        await axios.post('https://dockerlab-desktop.onrender.com/api/images', form, axiosConfig);
      }
      fetchImages();
      resetForm();
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
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dockerlab-desktop.onrender.com/api/images/${id}`, axiosConfig);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const resetForm = () => {
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
    setEditId(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <Navbar isAdmin={true} />
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Manage Docker Container</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
            >
              Add New Image
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mb-10">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              {editId ? 'Edit Docker Image' : 'Add New Docker Image'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="border rounded-xl p-3 focus:outline-blue-400"
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
              >
                <option value="">Select Semester</option>
                {[...Array(8).keys()].map((i) => (
                  <option key={i} value={`Sem ${i + 1}`}>{`Sem ${i + 1}`}</option>
                ))}
              </select>

              <input
                className="border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <input
                className="border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Ubuntu Pull Command"
                value={form.ubuntuPullCommand}
                onChange={(e) => setForm({ ...form, ubuntuPullCommand: e.target.value })}
              />
              <input
                className="border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Ubuntu Run Command"
                value={form.ubuntuRunCommand}
                onChange={(e) => setForm({ ...form, ubuntuRunCommand: e.target.value })}
              />
              <input
                className="border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Windows Pull Command"
                value={form.windowsPullCommand}
                onChange={(e) => setForm({ ...form, windowsPullCommand: e.target.value })}
              />
              <input
                className="border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Windows Run Command"
                value={form.windowsRunCommand}
                onChange={(e) => setForm({ ...form, windowsRunCommand: e.target.value })}
              />
            </div>

            <div className="mt-4 space-y-3">
              <textarea
                className="w-full border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Ubuntu Instructions"
                rows="2"
                value={form.ubuntuInstructions}
                onChange={(e) => setForm({ ...form, ubuntuInstructions: e.target.value })}
              />
              <textarea
                className="w-full border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Windows Instructions"
                rows="2"
                value={form.windowsInstructions}
                onChange={(e) => setForm({ ...form, windowsInstructions: e.target.value })}
              />
              <textarea
                className="w-full border rounded-xl p-3 focus:outline-blue-400"
                placeholder="Additional Notes"
                rows="2"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                {editId ? 'Update Image' : 'Add Image'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Docker Image Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Docker Images</h2>
          {dockerImages.length === 0 ? (
            <p className="text-gray-500">No Docker images found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dockerImages.map((img) => (
                <div
                  key={img._id}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-gray-200 transition"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {img.semester} - {img.subject}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Ubuntu Pull:</strong> {img.ubuntuPullCommand}</p>
                    <p><strong>Ubuntu Run:</strong> {img.ubuntuRunCommand}</p>
                    <p><strong>Windows Pull:</strong> {img.windowsPullCommand}</p>
                    <p><strong>Windows Run:</strong> {img.windowsRunCommand}</p>
                    <p><strong>Ubuntu Instructions:</strong> {img.ubuntuInstructions}</p>
                    <p><strong>Windows Instructions:</strong> {img.windowsInstructions}</p>
                    <p><strong>Notes:</strong> {img.notes}</p>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(img)}
                      className="text-yellow-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="text-red-600 hover:underline font-medium"
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
    </div>
  );
};

export default AdminDashboard;
