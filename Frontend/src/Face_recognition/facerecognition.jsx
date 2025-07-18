import React, { useState } from "react";
import './css/face.css';

export default function PlaygroundScroll() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Load the Image",
      desc: "Everything starts with clear input data. Here you load your face image into memory using the face_recognition library. It reads the file and converts it to an array of pixel values. This is your raw material for detection.",
      img: "/First.jpg",
      code: `image = face_recognition.load_image_file("First.jpg")`,
    },
    {
      id: 2,
      title: "Find the Face",
      desc: "After loading, the library locates all faces in the image by scanning pixel regions. It returns coordinates for each face it finds. These coordinates become bounding boxes that guide landmark detection and encoding.",
      img: "/second.jpeg",
      code: `face_locations = face_recognition.face_locations(image)`,
    },
    {
      id: 3,
      title: "Detect Landmarks",
      desc: "Next, facial landmarks — like eyes, eyebrows, nose, mouth and jawline — are marked. These key points help align the face and boost accuracy for encoding and comparison.",
      img: "/Third.jpg",
      code: `face_landmarks = face_recognition.face_landmarks(image)`,
    },
    {
      id: 4,
      title: "Generate Encodings",
      desc: "Finally, you generate a 128-dimension vector representation. This encoding is your unique face signature — used for comparison. The same process works whether you’re building attendance systems or door locks.",
      img: "/neural.jpg",
      code: `face_encodings = face_recognition.face_encodings(image, face_locations)`,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#1c1c3a] text-white overflow-x-hidden font-sans">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-200 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Unfold the Python Face Recognition Library — Visually & Practically
          </h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed">
            Dive deep into the <span className="font-bold text-pink-400">face_recognition</span> library.  
            Learn how modern face detection works: from raw images to encodings — step by step.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/faceicon.webp" alt="Face Icon" className="w-full max-w-xs md:max-w-md rounded-3xl shadow-[0_20px_50px_rgba(240,46,170,0.3)]" />
        </div>
      </section>

      {/* HISTORY */}
      <section className="min-h-screen px-10 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">📜 How It Evolved</h2>
        <div className="flex overflow-x-scroll gap-8 snap-x no-scrollbar pb-4">
          {[
            { img: "/computerpix.jpg", title: "1960s — Pixels", text: "Comparing raw pixel grids to match faces. Tedious, inaccurate, but historic." },
            { img: "/algo.jpg", title: "1990s — Algorithms", text: "Rise of Haar cascades. Automated matching made real-time detection possible." },
            { img: "/neural.jpg", title: "2000s — Deep Learning", text: "CNNs learn to detect faces with thousands of examples, boosting accuracy." },
            { img: "/open-source.png", title: "2014 — Open Source", text: "Libraries like dlib & face_recognition made face AI accessible to all coders." },
            { img: "/future.jpg", title: "Today — Ubiquitous", text: "Phones, airports, doors — face recognition is now a daily reality." },
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
      <section className="min-h-screen px-10 py-20 bg-gradient-to-b from-[#1c1c3a] to-[#0f0c29]">
        <h2 className="text-4xl font-bold mb-12 text-center">🌍 Real-World Applications</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "📱", title: "Phone Unlock", text: "Most phones unlock with face data. Infrared sensors map your features and compare them to your saved encoding." },
            { icon: "🛫", title: "Border Checks", text: "Smart e-gates match live camera feeds with your passport photo to clear you in seconds." },
            { icon: "🏠", title: "Smart Homes", text: "Doorbells scan visitors, match faces with household members, and auto-unlock or alert." },
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
        <h2 className="text-4xl font-bold mb-12 text-center">🧪 Try the Steps Yourself</h2>
        {steps.map((step, idx) => (
          <div key={step.id} className="mb-6">
            <div
              className="flex justify-between items-center bg-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-700 transition"
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              <code className="text-lg">{step.code}</code>
              <button className="ml-4 text-xl bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full shadow-md">▶️</button>
            </div>
            {activeStep === step.id && (
              <div className={`mt-6 flex flex-col md:flex-row gap-6 items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl`}>
                <div className={`${idx % 2 === 0 ? "md:order-1" : "md:order-2"} md:w-1/2`}>
                  <img src={step.img} alt={step.title} className="w-full rounded-2xl shadow-lg" />
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

    </div>
  );
}
