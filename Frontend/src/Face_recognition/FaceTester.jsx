import React, { useRef, useState, useEffect } from 'react';
import './css/tester.css'

export default function FaceTester() {
  const [faces, setFaces] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const startTesting = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setIsTesting(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 100);
        intervalRef.current = setInterval(captureFrame, 1000);
      })
      .catch(err => console.error('Camera error:', err));
  };

  const stopTesting = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    clearInterval(intervalRef.current);
    setIsTesting(false);
    setFaces([]);
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(sendFrame, 'image/jpeg');
  };

  const sendFrame = async (blob) => {
    const formData = new FormData();
    formData.append('frame', blob);

    const res = await fetch('http://localhost:8000/facereco/recognize_live/', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setFaces(data.faces || []);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faces.forEach(face => {
      const { top, right, bottom, left, name } = face;
      ctx.strokeStyle = '#22c55e'; // neon green
      ctx.lineWidth = 2;
      ctx.strokeRect(left, top, right - left, bottom - top);

      ctx.fillStyle = '#22c55e';
      ctx.font = '16px monospace';
      ctx.fillText(name || 'Unknown', left, top - 10);
    });
  }, [faces]);

  useEffect(() => {
    return () => {
      stopTesting();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-6">
      {!isTesting && (
        <button
          onClick={startTesting}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition px-6 py-3 rounded-xl text-white font-bold shadow-lg"
        >
          📷 Start Face Test
        </button>
      )}

      {isTesting && (
        <div className="relative rounded-xl overflow-hidden border-4 border-green-600 shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="640"
            height="480"
            className="rounded-xl"
          />
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="absolute top-0 left-0 rounded-xl"
          />
          <button
            onClick={stopTesting}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg"
          >
            ❌ Stop
          </button>
        </div>
      )}

      {isTesting && (
        <div className="text-white text-center mt-4">
          <h3 className="text-lg font-semibold mb-2">Detected Faces:</h3>
          {faces.length > 0 ? (
            <ul className="space-y-1">
              {faces.map((face, idx) => (
                <li key={idx} className="bg-white/10 px-4 py-1 rounded-lg inline-block">
                  {face.name || 'Unknown'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 italic">No face detected yet...</p>
          )}
        </div>
      )}
    </div>
  );
}
