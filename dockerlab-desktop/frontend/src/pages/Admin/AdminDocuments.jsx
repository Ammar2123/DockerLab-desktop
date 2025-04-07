import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState([{ type: 'heading', value: '' }]);
  const [editDocId, setEditDocId] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQwMDMyMjgsImV4cCI6MTc0NDA4OTYyOH0.iK5ZE1hlApv7EkEFZgnTeOgVd7v7UaTZbheqUqsm_Gw';

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/docs', axiosConfig);
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
          `http://localhost:5000/api/docs/${editDocId}`,
          { fields: newDoc },
          axiosConfig
        );
        setEditDocId(null);
      } else {
        await axios.post('http://localhost:5000/api/docs', { fields: newDoc }, axiosConfig);
      }
      setNewDoc([{ type: 'heading', value: '' }]);
      fetchDocuments();
    } catch (error) {
      console.error('Error submitting document:', error);
    }
  };

  const startEdit = (doc) => {
    setNewDoc(doc.contentBlocks);
    setEditDocId(doc._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Document Form */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">
            {editDocId ? '✏️ Edit Document' : '📄 Create Document'}
          </h1>

          {newDoc.map((field, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex items-center gap-2">
                {field.type === 'image' ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="border p-2 w-full"
                      onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                    />
                    {field.value && (
                      <img src={field.value} alt="preview" className="h-16 rounded border" />
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    placeholder={field.type}
                    className="border p-2 w-full"
                    value={field.value}
                    onChange={(e) => handleFieldChange(idx, 'value', e.target.value)}
                  />
                )}
                <button
                  onClick={() => deleteField(idx)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 my-4">
            <button onClick={() => addField('heading')} className="bg-blue-600 text-white px-3 py-1 rounded">+ Heading</button>
            <button onClick={() => addField('content')} className="bg-green-600 text-white px-3 py-1 rounded">+ Content</button>
            <button onClick={() => addField('command')} className="bg-yellow-500 text-white px-3 py-1 rounded">+ Command</button>
            <button onClick={() => addField('image')} className="bg-purple-600 text-white px-3 py-1 rounded">+ Image</button>
          </div>

          <button
            onClick={submitDocument}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            {editDocId ? 'Update Document' : 'Save Document'}
          </button>
        </div>

        {/* Document Preview */}
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">📚 Uploaded Documents</h2>
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc._id} className="bg-white rounded-lg shadow p-6">
                {doc.contentBlocks.map((f, i) => (
                  <div key={i} className="mb-4">
                    {f.type === 'heading' && (
                      <h3 className="text-xl font-bold border-b mb-2">{f.value}</h3>
                    )}
                    {f.type === 'content' && <p className="text-gray-700">{f.value}</p>}
                    {f.type === 'command' && (
                      <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
                        <code className="text-sm">{f.value}</code>
                        <button
                          onClick={() => navigator.clipboard.writeText(f.value)}
                          className="ml-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                    {f.type === 'image' && (
                      <img src={f.value} alt="Document" className="mt-2 max-w-md rounded border" />
                    )}
                  </div>
                ))}

                <div className="mt-3">
                  <button
                    onClick={() => startEdit(doc)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
