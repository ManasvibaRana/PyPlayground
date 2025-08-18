import React, { useState } from "react";
import "./css/deep.css"; // reuse same css
import deepfaceGif from "../Explore/images/voice.gif"; // placeholder gif/animation
import DeepFaceDemo from "./DeepFaceDemo"; // live demo component

export default function DeepFacePlayground() {
  const [activeStep, setActiveStep] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Load the Model",
      desc: "DeepFace loads pretrained models (like VGG-Face, Facenet, or OpenFace) to extract face embeddings for recognition.",
      img: "/deepface_model.png",
      code: `from deepface import DeepFace\nmodel = DeepFace.build_model("VGG-Face")`,
    },
    {
      id: 2,
      title: "Prepare the Image",
      desc: "Load the image you want to recognize or compare. DeepFace handles preprocessing automatically.",
      img: "/face.png",
      code: `img_path = "face.jpg"\nimg = DeepFace.detectFace(img_path)`,
    },
    {
      id: 3,
      title: "Run Recognition",
      desc: "DeepFace compares face embeddings with the target database and returns similarity scores.",
      img: "/face_compare.png",
      code: `result = DeepFace.find(img_path, db_path = "faces_db")\nprint(result)`,
    },
    {
      id: 4,
      title: "Visualize",
      desc: "You can annotate recognized faces with bounding boxes or similarity scores using OpenCV.",
      img: "/face_output.png",
      code: `cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)\ncv2.putText(frame, name, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,255,0), 2)`,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#1c1c3a] text-white overflow-x-hidden font-sans">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Explore DeepFace Recognition — Step by Step
          </h1>
          <p className="text-xs md:text-xl text-gray-300 max-w-md leading-relaxed">
            Learn how <span className="font-bold text-purple-400">DeepFace</span> recognizes faces.  
            From loading the model to detecting people in your dataset — all visualized interactively.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={deepfaceGif}
            alt="DeepFace Demo"
            className="w-xs rounded-3xl shadow-[0_20px_50px_rgba(200,100,250,0.3)]"
          />
        </div>
      </section>

      {/* HISTORY */}
      <section className="min-h-screen px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">📜 Evolution of Face Recognition</h2>
        <div className="flex overflow-x-scroll gap-8 snap-x no-scrollbar pb-4 bg-gradient-to-b from-[#1c1c3a] to-[#0f0c29]">
          {[
            { img: "/eigenfaces.png", title: "1990s — Eigenfaces", text: "Early method using PCA to recognize faces." },
            { img: "/fisherfaces.png", title: "2000s — Fisherfaces", text: "Improved accuracy using LDA for face classification." },
            { img: "/deepface.png", title: "2014 — DeepFace", text: "Facebook's model achieved near-human accuracy using deep learning." },
            { img: "/facenet.png", title: "2015 — FaceNet", text: "Introduced embeddings and triplet loss for robust recognition." },
            { img: "/today.png", title: "Today", text: "Multiple pretrained models like VGG-Face, OpenFace, ArcFace dominate modern recognition tasks." },
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
              <button className="ml-4 text-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full shadow-md">▶️</button>
            </div>
            {activeStep === step.id && (
              <div
                className={`mt-6 flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-6 items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl`}
              >
                <div className={`${idx % 2 === 0 ? "md:order-1" : "md:order-2"} md:w-1/2`}>
                  <img src={step.img} alt={step.title} className="w-full max-w-[500px] max-h-[300px] object-contain rounded-2xl shadow-lg"/>
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
            className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-3 rounded-full text-white text-2xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            🚀 Try Live Demo
          </button>
        )}
      </section>

      {/* ✅ Show DeepFaceDemo only when clicked */}
      {showDemo && (
        <section className="px-10">
          <DeepFaceDemo />
        </section>
      )}
    </div>
  );
}
