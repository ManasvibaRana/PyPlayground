import React from "react";

export default function Howitworks() {
  const steps = [
    {
      title: "Choose a Python Tool",
      desc: "Pick from face recognition, gestures, predictions, and more.",
    },
    {
      title: "Try Live Demo",
      desc: "Interact instantly — no setup or installation needed.",
    },
    {
      title: "See Real Results",
      desc: "Watch Python analyze and respond in real time.",
    },
    {
      title: "Learn While Doing",
      desc: "Understand how it works behind the scenes with code previews.",
    },
  ];

  return (
    <section className=" py-20 px-4 md:px-10 text-white">
      <h2 className="text-4xl font-bold text-center mb-20 text-blue-300">
        How It Works
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-blue-950 transform -translate-x-1/2 shadow-md shadow-white"></div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div
                className={`bg-blue-950 p-6 rounded-xl shadow-md shadow-amber-100 w-full md:w-[45%] z-10`}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.desc}</p>
              </div>

              {/* Connector Dot */}
              <div className="w-5 h-5 bg-amber-300 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-sm shadow-white"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
