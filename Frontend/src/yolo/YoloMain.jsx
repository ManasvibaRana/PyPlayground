"use client";

import React, { useRef, useEffect, useState } from "react";

export default function YoloDemo() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null); // offscreen canvas for snapshots
  const [running, setRunning] = useState(false);

  // Initialize camera whenever running becomes true
  useEffect(() => {
    let interval;

    async function initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    if (running) {
      initCamera();
      interval = setInterval(captureFrame, 300);
    } else {
      stopDetection();
    }

    return () => clearInterval(interval);
  }, [running]);

  async function captureFrame() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;

    hiddenCanvas.width = video.videoWidth;
    hiddenCanvas.height = video.videoHeight;

    const ctx = hiddenCanvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const frame = hiddenCanvas.toDataURL("image/jpeg");

    try {
      const res = await fetch("http://127.0.0.1:8000/objectdetaction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frame }),
      });

      const data = await res.json();

      const overlay = canvasRef.current.getContext("2d");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      overlay.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      data.predictions?.forEach((box) => {
        overlay.strokeStyle = "lime";
        overlay.lineWidth = 2;
        overlay.strokeRect(box.x, box.y, box.width, box.height);
        overlay.fillStyle = "lime";
        overlay.font = "16px Arial";
        overlay.fillText(box.label, box.x, box.y - 5);
      });
    } catch (error) {
      console.error("Error fetching YOLO predictions:", error);
    }
  }

  // Stop detection and webcam
  function stopDetection() {
    // Clear overlay
    const overlay = canvasRef.current?.getContext("2d");
    if (overlay && canvasRef.current) {
      overlay.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    // Stop webcam stream
    const video = videoRef.current;
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-xl shadow-md"
        />
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
