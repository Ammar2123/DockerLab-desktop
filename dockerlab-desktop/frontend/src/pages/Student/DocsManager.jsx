import React, { useEffect, useState } from "react";
import axios from "axios";

function DocsManager() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/docs");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please choose a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:5000/api/docs/upload", formData);
      setSelectedFile(null);
      fetchFiles(); // refresh
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/docs/${id}`);
      fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl mb-4 font-semibold">Manage Documents & Images</h2>

      <div className="mb-4">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {files.map((file) => (
          <div
            key={file._id}
            className="border p-4 rounded bg-white shadow-md"
          >
            {file.type.startsWith("image/") ? (
              <img src={file.url} alt={file.name} className="h-40 w-full object-cover" />
            ) : (
              <div className="text-sm">
                <p>{file.name}</p>
                <a
                  href={file.url}
                  download
                  className="text-blue-500 underline text-xs"
                >
                  Download
                </a>
              </div>
            )}
            <button
              onClick={() => handleDelete(file._id)}
              className="mt-2 text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocsManager;
