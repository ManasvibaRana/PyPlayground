import React, { useEffect, useRef, useState } from "react";

export default function HandTester() {
  const videoRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [pos, setPos] = useState({ x: 20, y: 20 }); // draggable position
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Start/stop webcam
  useEffect(() => {
    if (isRunning) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => console.error("Camera error:", err));
    } else {
      // Stop video
      const tracks = videoRef.current?.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;

      // 🔥 Clear processed frame when stopped
      setProcessedFrame(null);
    }
  }, [isRunning]);

  // Send frames every 200ms
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      sendFrame();
    }, 200);
    return () => clearInterval(interval);
  }, [isRunning]);

  const sendFrame = async () => {
    if (!videoRef.current) return;

    // Draw current frame on canvas
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    // Convert to Blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    // Prepare FormData
    const formData = new FormData();
    formData.append("frame", blob, "frame.jpg");

    try {
      const res = await fetch("http://127.0.0.1:8000/handcontrol/recognize_live/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Show processed frame
      if (data.frame) {
        setProcessedFrame(`data:image/jpeg;base64,${data.frame}`);
      }

      // Scroll based on hand position
      if (data.hand) {
        if (data.hand.y < 0.4) window.scrollBy(0, -50);
        else if (data.hand.y > 0.6) window.scrollBy(0, 50);
      }

      if (data.message) {
        console.log("Status:", data.message);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  // --- Drag Handlers ---
  const onMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onMouseMove = (e) => {
    if (dragging) {
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"} Hand Scroll
      </button>

      {/* Hidden raw webcam feed */}
      <video ref={videoRef} style={{ display: "none" }} />

      {/* Floating draggable processed frame */}
      {processedFrame && (
        <img
          src={processedFrame}
          alt="Processed"
          onMouseDown={onMouseDown}
          style={{
            width: "300px",
            position: "fixed",
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            border: "2px solid #4CAF50",
            borderRadius: "10px",
            cursor: dragging ? "grabbing" : "grab",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}
