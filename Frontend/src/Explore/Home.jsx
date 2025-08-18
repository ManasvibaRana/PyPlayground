import "../App.css";
import Nav from "./nav";
import Face_recognition from "./images/Face_recognition.gif";
import hand from "./images/hand.gif";
import yolo from "./images/voice.gif"; // new image for YOLO
import deepface from "./images/voice.gif"; // new image for DeepFace
import bg from "./images/bg.mp4";
import Button from "./Button";
import "./css/explore.css";

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
      <Nav />

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
      <section className="w-full flex flex-col items-center py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <h2 className="text-4xl font-bold text-blue-300 mb-12 text-center">
          Featured Tools
        </h2>

        <div className="flex flex-col gap-12 w-full max-w-6xl px-4">
          {tools.map((tool, i) => (
            <div
              key={i}
              className={`flex items-center p-8 bg-blue-900/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] md:flex-nowrap ${
                i % 2 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="flex-shrink-0 mr-6 md:mr-6">
                <img
                  src={tool.img}
                  alt={tool.title}
                  className="w-36 h-36 object-contain rounded-lg shadow-md"
                />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-3xl font-bold text-white">{tool.title}</h3>
                <p className="text-blue-200 mt-3 text-base">{tool.desc}</p>
                {tool.link && (
                  <div className="mt-4">
                    <Button to={tool.link} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
