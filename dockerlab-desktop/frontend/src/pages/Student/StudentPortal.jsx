import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Laptop2, TerminalSquare } from 'lucide-react';

const StudentPortal = () => {
  const [dockerImages, setDockerImages] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOSMap, setImageOSMap] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('https://dockerlab-desktop.onrender.com/api/images');
        setDockerImages(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch images:', error);
      }
    };

    fetchImages();

    if (window.electronAPI?.runDockerCommand) {
      console.log('✅ electronAPI is available');
    } else {
      console.error('❌ electronAPI is undefined');
    }
  }, []);

  const handleRunCommand = (cmd) => {
    if (!cmd) return alert('❌ Command is missing!');
    const os = getOS(selectedImage._id);

    if (window.electronAPI?.runDockerCommand) {
      window.electronAPI.runDockerCommand(os, cmd);
    } else {
      alert('❌ Electron API not available.');
    }
  };

  const handleOSChange = (id, os) => {
    setImageOSMap((prev) => ({ ...prev, [id]: os }));
  };

  const getOS = (id) => imageOSMap[id] || 'ubuntu';

  const filteredImages = dockerImages.filter((img) =>
    img.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-blue-50">
      <Navbar isAdmin={false} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">
           Docker Labs Container
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search by subject name..."
            className="w-full md:w-1/2 px-5 py-3 text-base rounded-2xl border border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredImages.length === 0 ? (
          <p className="text-center text-gray-500 italic">No matching labs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((img) => (
              <div
                key={img._id}
                onClick={() => setSelectedImage(img)}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <Laptop2 className="text-indigo-500" />
                  <span className="text-sm text-gray-500">{img.semester}</span>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800">{img.subject}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              📘 {selectedImage.semester} - {selectedImage.subject}
            </h2>

            <div className="flex justify-center gap-2 mb-6">
              {['ubuntu', 'windows'].map((os) => (
                <button
                  key={os}
                  className={`px-4 py-1 rounded-full text-sm font-semibold shadow-sm transition ${
                    getOS(selectedImage._id) === os
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleOSChange(selectedImage._id, os)}
                >
                  {os.charAt(0).toUpperCase() + os.slice(1)}
                </button>
              ))}
            </div>

            {/* Commands */}
            {['Pull', 'Run'].map((type) => {
              const command =
                getOS(selectedImage._id) === 'ubuntu'
                  ? selectedImage[`ubuntu${type}Command`]
                  : selectedImage[`windows${type}Command`];
              const icon = type === 'Pull' ? '' : '';

              return (
                <div className="mb-5" key={type}>
                  <p className="font-semibold text-gray-800 mb-1">
                    {icon} {type} Command
                  </p>
                  <code className="block bg-gray-100 rounded-xl p-3 text-sm text-gray-800 overflow-x-auto shadow-inner">
                    {command}
                  </code>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(command)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleRunCommand(command)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-sm"
                    >
                      Run
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Instructions */}
            <div className="mt-4 text-sm text-gray-600 space-y-2">
              {getOS(selectedImage._id) === 'ubuntu' &&
                selectedImage.ubuntuInstructions && (
                  <p className="italic">📝 {selectedImage.ubuntuInstructions}</p>
                )}
              {getOS(selectedImage._id) === 'windows' &&
                selectedImage.windowsInstructions && (
                  <p className="italic">📝 {selectedImage.windowsInstructions}</p>
                )}
              {selectedImage.notes && (
                <p className="text-xs text-gray-500">🗒️ {selectedImage.notes}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
