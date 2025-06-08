import React from "react";
import Pythonlogo from "./Pythonlogo.png"
import techw from "./techw.png";
import community from "./community.png"
import endless from "./endless.png"
const cardsData = [
  {
    frontTitle: "Why Python?",
    frontText: "Simple, powerful, and beginner-friendly — Python makes coding fun.",
    frontImage: Pythonlogo, // replace with your image path
    backText:
      "Python’s easy syntax and huge community make learning programming smooth and enjoyable for everyone — from newbies to pros.",
  },
  {
    frontTitle: "Real-World Impact",
    frontText: "From self-driving cars to space missions, Python powers innovation.",
    frontImage: techw,
    backText:
      "Python is behind groundbreaking projects like autonomous vehicles and NASA space explorations, driving the future of tech.",
  },
  {
    frontTitle: "Community Support",
    frontText: "Millions of developers worldwide ready to help and collaborate.",
    frontImage: community,
    backText:
      "Join forums, coding meetups, and open-source projects to learn, share, and grow with Python enthusiasts worldwide.",
  },
  {
    frontTitle: "Endless Possibilities",
    frontText: "Build anything you imagine — Python grows with you.",
    frontImage: endless,
    backText:
      "From web apps to AI and games, Python’s versatility lets you create projects limited only by your imagination.",
  },
];

export default function FlipCard() {
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto p-6">
      {cardsData.map((card, idx) => (
        <div key={idx} className="group perspective w-full h-56 cursor-pointer shadow-md shadow-amber-200"  data-aos="zoom-in" data-aos-delay="100">
          <div className="relative w-full h-full duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
            {/* Front Side with Image */}
            <div className="absolute w-full h-full backface-hidden bg-blue-950 rounded-lg shadow-lg flex flex-col items-center p-5 text-blue-200">
              <img
                src={card.frontImage}
                alt={card.frontTitle}
                className="w-20 h-20 mb-4 object-contain"
              />
              <h3 className="text-xl font-bold mb-2">{card.frontTitle}</h3>
              <p className="text-center">{card.frontText}</p>
            </div>

            {/* Back Side - Text Only */}
            <div className="absolute w-full h-full backface-hidden font-bold bg-gray-800 text-blue-400 rounded-lg shadow-lg flex items-center justify-center p-5 rotate-y-180">
              <p className="text-center">{card.backText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
