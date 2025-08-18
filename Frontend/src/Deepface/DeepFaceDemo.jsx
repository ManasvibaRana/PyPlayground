"use client";

import React, { useRef, useState, useEffect } from "react";

export default function DeepFaceDemo() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    async function initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    if (running) {
      initCamera();
      interval = setInterval(captureFrame, 500);
    } else {
      stopDetection();
    }

    return () => clearInterval(interval);
  }, [running]);

  async function captureFrame() {
    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const overlayCanvas = canvasRef.current;

    if (!video || !hiddenCanvas || !overlayCanvas) return;

    hiddenCanvas.width = video.videoWidth;
    hiddenCanvas.height = video.videoHeight;
    const ctx = hiddenCanvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const frame = hiddenCanvas.toDataURL("image/jpeg");

    try {
      const res = await fetch("http://127.0.0.1:8000/deepface/detect_emotion/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frame }),
      });

      const data = await res.json();
      const overlay = overlayCanvas.getContext("2d");
      overlay.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      overlayCanvas.width = video.videoWidth;
      overlayCanvas.height = video.videoHeight;

      data.predictions?.forEach((face) => {
        const [x, y, w, h] = face.box;
        overlay.strokeStyle = "lime";
        overlay.lineWidth = 2;
        overlay.strokeRect(x, y, w, h);
        overlay.fillStyle = "lime";
        overlay.font = "18px Arial";
        overlay.fillText(face.emotions, x, y - 10);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function stopDetection() {
    const video = videoRef.current;
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
    const overlay = canvasRef.current?.getContext("2d");
    overlay?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <video ref={videoRef} autoPlay muted className="rounded-xl shadow-md" />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none"
        />
      </div>
      <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />
      <button
        onClick={() => setRunning(!running)}
        className={`mt-4 px-4 py-2 rounded-lg ${
          running ? "bg-red-600" : "bg-blue-600"
        } text-white`}
      >
        {running ? "Stop Detection" : "Start Detection"}
      </button>
    </div>
  );
}
