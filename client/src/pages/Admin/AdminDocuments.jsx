import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState([{ type: 'heading', value: '' }]);
  const [editDocId, setEditDocId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Replace the hardcoded token with:
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQzOTc4NDYsImV4cCI6MTc0NDQ4NDI0Nn0.-DVgC8mZB8kRWMUat8DPoMhkShaEOy6vsp3IeteqnoU";

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('https://dockerlab-desktop.onrender.com/api/docs', axiosConfig);
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFieldChange = (index, field, value) => {
    const updated = [...newDoc];
    updated[index][field] = value;
    setNewDoc(updated);
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...newDoc];
      updated[index].value = reader.result;
      setNewDoc(updated);
    };
    reader.readAsDataURL(file);
  };

  const addField = (type) => {
    setNewDoc([...newDoc, { type, value: '' }]);
  };

  const deleteField = (index) => {
    const updated = [...newDoc];
    updated.splice(index, 1);
    setNewDoc(updated);
  };

  const submitDocument = async () => {
    try {
      if (editDocId) {
        await axios.put(
          `https://dockerlab-desktop.onrender.com/api/docs/${editDocId}`,
          { fields: newDoc },
          axiosConfig
        );
        setEditDocId(null);
      } else {
        await axios.post('https://dockerlab-desktop.onrender.com/api/docs', { fields: newDoc }, axiosConfig);
      }
      setNewDoc([{ type: 'heading', value: '' }]);
      fetchDocuments();
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting document:', error);
    }
  };

  const startEdit = (doc) => {
    setNewDoc(doc.contentBlocks);
    setEditDocId(doc._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteDocument = async (docId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await axios.delete(`https://dockerlab-desktop.onrender.com/api/docs/${docId}`, axiosConfig);
        fetchDocuments(); // Refresh after deletion
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar isAdmin={true} />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Documentation</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setShowForm(!showForm);
              setEditDocId(null);
              setNewDoc([{ type: 'heading', value: '' }]);
            }}
          >
            {showForm ? 'Cancel' : '+ Add Document'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editDocId ? 'Edit Document' : 'Create Document'}
            </h2>

            {newDoc.map((field, idx) => (
              <div key={idx} className="mb-4">
                <label className="block text-sm font-medium mb-1 capitalize">
                  {field.type}
                </label>
                {field.type === 'image' ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                    />
                    {field.value && <img src={field.value} alt="Preview" className="h-16 border rounded" />}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleFieldChange(idx, 'value', e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                )}
                <button
                  className="mt-2 text-sm text-red-600 hover:underline"
                  onClick={() => deleteField(idx)}
                >
                  Delete Field
                </button>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => addField('heading')} className="bg-blue-500 text-white px-3 py-1 rounded">Add Heading</button>
              <button onClick={() => addField('content')} className="bg-green-500 text-white px-3 py-1 rounded">Add Content</button>
              <button onClick={() => addField('command')} className="bg-yellow-500 text-white px-3 py-1 rounded">Add Command</button>
              <button onClick={() => addField('image')} className="bg-purple-600 text-white px-3 py-1 rounded">Add Image</button>
            </div>

            <button
              onClick={submitDocument}
              className="bg-gray-900 text-white px-6 py-2 rounded"
            >
              {editDocId ? 'Update Document' : 'Save Document'}
            </button>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        <div className="space-y-6">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-white p-6 rounded shadow">
              {doc.contentBlocks.map((f, i) => (
                <div key={i} className="mb-4">
                  {f.type === 'heading' && (
                    <h3 className="text-lg font-bold text-blue-800 border-b pb-1">{f.value}</h3>
                  )}
                  {f.type === 'content' && (
                    <p className="text-gray-700">{f.value}</p>
                  )}
                  {f.type === 'command' && (
                    <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
                      <code className="text-sm">{f.value}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(f.value)}
                        className="ml-4 text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                  {f.type === 'image' && (
                    <img src={f.value} alt="Document" className="mt-2 max-w-sm border rounded" />
                  )}
                </div>
              ))}
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => startEdit(doc)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDocument(doc._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
