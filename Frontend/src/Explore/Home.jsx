import "../App.css";
import Nav from "./nav";
import Face_recognition from "./images/Face_recognition.gif";
import hand from "./images/hand.gif";
import yolo from "./images/voice.gif"; // new image for YOLO
import deepface from "./images/voice.gif"; // new image for DeepFace
import bg from "./images/bg.mp4";
import Button from "./Button";
import "./css/explore.css";
import Footer from "../Landing/Footer";
import community from "../Landing/images/community.png";
import techw from "../Landing/images/techw.png";

function Home() {
  const tools = [
    {
      img: Face_recognition,
      title: "Face Recognition",
      desc: "Detect and recognize human faces in real-time using your webcam.",
      link: "/facereco",
    },
    {
      img: hand,
      title: "Hand Gesture Control",
      desc: "Control apps or systems with hand gestures using OpenCV.",
      link: "/handco",
    },
    {
      img: yolo,
      title: "YOLO Object Detection",
      desc: "Detect multiple objects in images or video streams with YOLOv8.",
      link: "/yolo",
    },
    {
      img: deepface,
      title: "DeepFace Recognition",
      desc: "Accurately recognize faces using DeepFace models.",
      link: "/deepface",
    },
  ];

  return (
    <div className="relative w-full h-full">
     

      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" data-aos="zoom-in">
            Explore Powerful Python Libraries in Action
          </h1>
          <h3 className="text-2xl font-bold text-blue-300">
            Click. Run. See Python magic live
          </h3>
        </div>
      </div>

      {/* Featured Tools */}
      <section className="w-full flex flex-col items-center py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Featured Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-6xl px-4">
          {tools.map((tool, i) => (
            <div
              key={i}
              className={`relative group flex flex-col p-6 md:p-8 bg-slate-800/60 border border-slate-700/70 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-blue-900/40 transition-all duration-300 hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-gradient-to-br from-indigo-500/20 to-purple-400/20 blur-2xl"></div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 blur"></div>
                    <img
                      src={tool.img}
                      alt={tool.title}
                      className="relative w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl ring-1 ring-slate-700/60"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-300 mt-2 md:mt-3 text-base leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {tool.link && (
                <div className="mt-5 flex justify-end">
                  <Button to={tool.link} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Informative: Highlights with imagery */}
      <section id="pythonhighlight" className="w-full py-16 bg-gradient-to-b from-black via-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Why These Tools Stand Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src={yolo} alt="Real-time" className="w-10 h-10 rounded-lg ring-1 ring-slate-700/60" />
                <h3 className="text-xl font-semibold text-white">Real-time Performance</h3>
              </div>
              <p className="mt-2 text-slate-300">Experience instant results with optimized models and efficient pipelines designed for live demos.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src={Face_recognition} alt="CV" className="w-10 h-10 rounded-lg ring-1 ring-slate-700/60" />
                <h3 className="text-xl font-semibold text-white">Modern Computer Vision</h3>
              </div>
              <p className="mt-2 text-slate-300">From YOLOv8 object detection to DeepFace recognition and classical face pipelines.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <img src={hand} alt="Interactive" className="w-10 h-10 rounded-lg ring-1 ring-slate-700/60" />
                <h3 className="text-xl font-semibold text-white">Interactive & Intuitive</h3>
              </div>
              <p className="mt-2 text-slate-300">Clean UI/UX that lets you focus on experimenting without configuration overhead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Informative: Collaboration & Chatbot (with imagery) */}
      <section className="w-full py-16 bg-gradient-to-b from-black via-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center gap-6">
              <img src={community} alt="Collaboration" className="w-24 h-24 object-contain rounded-xl ring-1 ring-slate-700/60" />
              <h3 className="text-2xl font-bold text-white">Collaborate on Projects</h3>
              <p className="mt-3 text-slate-300">Use the Collab section to create, discover, and join AI projects. Share ideas, tasks, and progress—all in one place.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700/60 flex items-center gap-6">
              <img src={techw} alt="Chatbot" className="w-24 h-24 object-contain rounded-xl ring-1 ring-slate-700/60" />
              <h3 className="text-2xl font-bold text-white">Chat with PyTutor</h3>
              <p className="mt-3 text-slate-300">Got questions? The Chatbot is powered by Gemini to assist you with explanations, tips, and debugging guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Removed: What You'll Learn */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
