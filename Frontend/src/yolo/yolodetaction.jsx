import React, { useState } from "react";
import "./css/yolo.css"; // you can reuse same css
import yoloGif from "../Explore/images/yolo.gif"; // placeholder gif/animation
import YoloDemo from "./YoloMain"; // live demo component

export default function YoloPlayground() {
  const [activeStep, setActiveStep] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Load the Model",
      desc: "YOLO starts with pretrained weights. You load a YOLO model (like YOLOv8n) trained on the COCO dataset. This model already knows 80 everyday objects like apples, cars, and people.",
      img: "/yolo_model.jpg", 
      code: `from ultralytics import YOLO\nmodel = YOLO("yolov8n.pt")`,
    },
    {
      id: 2,
      title: "Read the Input",
      desc: "Next, feed in an image or video frame. YOLO accepts OpenCV images, file paths, or even webcam streams.",
      img: "/apple.jpg",
      code: `img = cv2.imread("apple.jpg")`,
    },
    {
      id: 3,
      title: "Run Detection",
      desc: "The model scans the input, predicts bounding boxes and class names, and attaches a confidence score for each object.",
      img: "/cat.jpg",
      code: `results = model(img)\nfor box in results[0].boxes:\n    print(box.cls, box.conf)`,
    },
    {
      id: 4,
      title: "Visualize",
      desc: "Finally, YOLO draws boxes and labels over the detected objects, making results easy to interpret. You can display with OpenCV or save the annotated image.",
      img: "/catdecode.png",
      code: `annotated = results[0].plot()\ncv2.imshow("YOLO", annotated)`,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#1c1c3a] text-white overflow-x-hidden font-sans">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-200 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            Explore YOLO Object Detection — Step by Step
          </h1>
          <p className="text-xs md:text-xl text-gray-300 max-w-md leading-relaxed">
            Learn how <span className="font-bold text-green-400">YOLO</span> detects everyday objects.  
            From loading the model to detecting apples and cars — all visualized in an interactive journey.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={yoloGif}
            alt="YOLO Demo"
            className="w-xs rounded-3xl shadow-[0_20px_50px_rgba(46,170,240,0.3)]"
          />
        </div>
      </section>

      {/* HISTORY */}
      <section className="min-h-screen px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">📜 Evolution of Object Detection</h2>
        <div className="flex overflow-x-scroll gap-8 snap-x no-scrollbar pb-4 bg-gradient-to-b from-[#1c1c3a] to-[#0f0c29]">
          {[
            { img: "/sliding_window.png", title: "Pre-2010s — Sliding Windows", text: "Manually scanning every patch of an image. Accurate but very slow." },
            { img: "/rcnn.png", title: "2014 — R-CNN", text: "Deep learning enters detection. Region proposals plus CNNs improve accuracy but are still slow." },
            { img: "/yolo.png", title: "2016 — YOLO v1", text: "You Only Look Once. End-to-end detection in a single pass — real-time speed." },
            { img: "/yolov5.jpg", title: "2020 — YOLOv5", text: "Optimized for speed, accuracy, and ease of training." },
            { img: "/yolov8.png", title: "Today — YOLOv8", text: "Latest YOLO versions achieve state-of-the-art detection on diverse tasks." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="min-w-[300px] backdrop-blur-lg bg-white/5 border border-white/20 rounded-3xl p-6 snap-center hover:scale-105 transition transform duration-500 shadow-xl"
            >
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CODE ACCORDION */}
      <section className="px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center"> Try the Steps Yourself</h2>
        {steps.map((step, idx) => (
          <div key={step.id} className="mb-6">
            <div
              className="flex overflow-x-auto justify-between items-center bg-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-700 transition"
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              <code className="text-lg break-all whitespace-pre-wrap">{step.code}</code>
              <button className="ml-4 text-xl bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-full shadow-md">▶️</button>
            </div>
            {activeStep === step.id && (
              <div
                className={`mt-6 flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-6 items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl`}
              >
                <div className={`${idx % 2 === 0 ? "md:order-1" : "md:order-2"} md:w-1/2`}>
                  <img src={step.img} alt={step.title}   className="w-full max-w-[500px] max-h-[300px] object-contain rounded-2xl shadow-lg"/>
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

      <section className="text-center py-2">
        {!showDemo && (
          <button
            onClick={() => setShowDemo(true)}
            className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-3 rounded-full text-white text-2xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            🚀 Try Live Demo
          </button>
        )}
      </section>

      {/* ✅ Show YoloMain only when clicked */}
      {showDemo && (
        <section className="px-10">
          <YoloDemo />
        </section>
      )}
    </div>
  );
}
