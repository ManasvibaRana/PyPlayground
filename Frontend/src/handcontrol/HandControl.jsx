import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../checklogin/CheckLogin";
// import './css/face.css';
import hand_gesture_gif from '../Explore/images/hand.gif';
import HandTester from "./HandTester";

export default function handcontrol() {
  const [activeStep, setActiveStep] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();
   
  const steps = [
    {
      id: 1,
      title: "Capture Live Video",
      desc: "We begin by capturing your webcam feed in Python using OpenCV. This gives us a continuous stream of frames to analyze.",
      img: "/webcam.jpg",
      code: `cap = cv2.VideoCapture(0)`,
    },
    {
      id: 2,
      title: "Detect Hand Landmarks",
      desc: "Using MediaPipe Hands, we detect 21 key points on your hand — from fingertips to wrist. These landmarks form the base for gesture recognition.",
      img: "/landmarks.png",
      code: `results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))`,
    },
    {
      id: 3,
      title: "Track Hand Movement",
      desc: "We calculate the center of your hand's bounding box. Tracking its vertical position lets us detect whether you're moving up or down.",
      img: "/tracking.jpeg",
      code: `center_y = (min_y + max_y) // 2`,
    },
    {
      id: 4,
      title: "Map Gestures to Scrolling",
      desc: "Finally, we connect your hand movement to system scrolling using pyautogui. Move your hand up to scroll up, down to scroll down — touch-free.",
      img: "/scroll.jpg",
      code: `pyautogui.scroll(100)  # up`,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#1c1c3a] text-white overflow-x-hidden font-sans">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-200 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
            Control Your Screen with Just Your Hands
          </h1>
          <p className="text-xs md:text-xl text-gray-300 max-w-md leading-relaxed">
            Control with simple hand gestures — no mouse, no touch, just movement
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={hand_gesture_gif} alt="Hand Gesture" className="w-xs rounded-3xl shadow-[0_20px_50px_rgba(0,255,170,0.3)]" />
        </div>
      </section>

      {/* HISTORY */}
      <section className="min-h-screen px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">📜 How It Evolved</h2>
        <div className="flex overflow-x-scroll gap-8 snap-x no-scrollbar pb-4 bg-gradient-to-b from-[#1c1c3a] to-[#0f0c29]">
          {[
            { img: "/infrared.jpeg", title: "1990s — Infrared Devices", text: "Early gesture control relied on infrared sensors to detect motion." },
            { img: "/kinect.jpeg", title: "2010 — Kinect Era", text: "Microsoft Kinect brought 3D depth-sensing cameras for gaming gestures." },
            { img: "/leapmotion.webp", title: "2013 — Leap Motion", text: "Compact sensors tracked fingers with millimeter precision." },
            { img: "/mediapipe.jpeg", title: "Today — AI Vision", text: "MediaPipe & OpenCV use machine learning to detect hands from a normal webcam." },
          ].map((item, idx) => (
            <div key={idx} className="min-w-[300px] backdrop-blur-lg bg-white/5 border border-white/20 rounded-3xl p-6 snap-center hover:scale-105 transition transform duration-500 shadow-xl">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REAL WORLD */}
      <section className="px-10 py-12 bg-gradient-to-b from-[#1c1c3a] to-[#0f0c29]">
        <h2 className="text-4xl font-bold mb-12 text-center">🌍 Real-World Applications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎮", title: "Gaming", text: "VR and AR games use gestures for immersive control." },
            { icon: "🚗", title: "Cars", text: "Touchless dashboard navigation keeps drivers focused." },
            { icon: "🏥", title: "Healthcare", text: "Surgeons navigate scans without touching any devices." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl hover:scale-[1.03] transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CODE ACCORDION */}
      <section className="px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center"> How It Works — Step by Step</h2>
        {steps.map((step, idx) => (
          <div key={step.id} className="mb-6">
            <div
              className="flex overflow-x-auto justify-between items-center bg-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-700 transition"
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              <code className="text-lg break-all whitespace-pre-wrap">{step.code}</code>
              <button className="ml-4 text-xl bg-gradient-to-r from-green-500 to-yellow-500 px-4 py-2 rounded-full shadow-md">▶️</button>
            </div>
            {activeStep === step.id && (
              <div className={`mt-6 flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-6 items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl`}>
                <div className={`${idx % 2 === 0 ? "md:order-1" : "md:order-2"} md:w-1/2`}>
                  <img src={step.img} alt={step.title} className="w-full max-w-full rounded-2xl shadow-lg" />
                </div>
                <div className={`${idx % 2 === 0 ? "md:order-2" : "md:order-1"} md:w-1/2`}>
                  <h3 className="text-3xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* TRY DEMO */}
      <section className="text-center py-2">
        {!showDemo && (
          <button
            onClick={() => { if (!isLoggedIn()) { navigate('/login'); return; } setShowDemo(true); }}
            className="bg-gradient-to-r from-green-500 to-yellow-600 px-8 py-3 rounded-full text-white text-2xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            ✋ Try Live Demo
          </button>
        )}
      </section>

      {/* ✅ Show ScrollDemo only when clicked */}
      {showDemo && (
        <section className="px-10">
          <HandTester />
        </section>
      )}
    </div>
  );
}
