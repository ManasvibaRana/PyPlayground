import React, { useState } from 'react';
import './css/tester.css'

export default function FaceTrainer({ onTrainComplete }) {
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const [isTraining, setIsTraining] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || files.length === 0) {
      setStatus('❌ Please enter a name and select images.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith('image/')) {
        setStatus('❌ Only image files are allowed.');
        return;
      }
    }

    setIsTraining(true);
    setStatus('⏳ Training in progress...');

    const formData = new FormData();
    formData.append('name', name);
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await fetch('http://localhost:8000/facereco/upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.message && data.message.toLowerCase().includes('done')) {
        setStatus('✅ Training complete!');
        onTrainComplete();
      } else {
        setStatus(`⚠️ ${data.error || data.message}`);
      }
    } catch (err) {
      setStatus('❌ Something went wrong.');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="bg-gradient-to-br from-[#15192e] to-[#1f2450] p-10 m-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          📸 Upload & Train
        </h2>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="px-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />

          <button
            type="submit"
            disabled={isTraining}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition text-white font-semibold py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {isTraining ? 'Training...' : 'Upload & Train'}
          </button>

          {status && (
            <div
              className={`mt-2 px-4 py-2 rounded-lg text-white text-sm ${
                status.startsWith('✅') ? 'bg-green-600' :
                status.startsWith('⚠️') ? 'bg-yellow-500 text-black' :
                status.startsWith('❌') ? 'bg-red-600' :
                'bg-gray-700'
              }`}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
