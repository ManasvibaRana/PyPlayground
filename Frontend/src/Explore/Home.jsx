import Input from "./Input";
import "../App.css"
import Nav from "./nav";
import Face_recognition from "./images/Face_recognition.gif"
import hand from "./images/hand.gif"
import prediction from "./images/prediction.gif"
import voice from "./images/voice.gif"
import bg from "./images/bg.mp4"

function Home() {
    return(
        <>
        <div>
       
            <Nav/>
      
 <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden   flex-col r text-center bg-cover bg-center">
  {/* Video background */}
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
            <h1 className="text-4xl md:text-5xl   font-extrabold text-white" data-aos="zoom-in" data-aos-delay="200">Explore powerful Python libraries through live demos</h1>
            <h3 className="text-2xl font-bold text-blue-300 py-5">Click. Run. See Python in action</h3>
           <Input/>
        </div>

<div className="w-full flex flex-col items-center py-10" id="bgcolor">
  <h1 className="text-4xl font-bold text-blue-300 mb-10 text-center">Featured Tools</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl md:px-35">
    
    {/* Card 1 */}
    <div className="md:w-96 h-60  transition-transform duration-400 transform hover:scale-105 hover:shadow-amber-200 shadow-amber-100 bg-blue-950 rounded-lg shadow-md  p-5 text-blue-200 flex flex-col items-center cursor-pointer"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <img
        src={Face_recognition}
        alt="Face Recognition"
        className="w-20 h-20 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold mb-2">face_recognition</h3>
      <p className="text-center text-sm">Detect and recognize human faces using just your webcam.</p>
    </div>

    {/* Card 2 */}
    <div className="md:w-96 h-60 bg-blue-950 rounded-lg shadow-md transition-transform duration-400 transform hover:scale-105 hover:shadow-amber-200 shadow-amber-100 p-5 text-blue-200 flex flex-col items-center cursor-pointer"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <img
        src={hand}
        alt="Hand Gesture"
        className="w-20 h-20 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold mb-2">handgesture</h3>
      <p className="text-center text-sm">Control your system or apps with hand gestures using OpenCV.</p>
    </div>

    {/* Card 3 */}
    <div className="md:w-96 h-60 bg-blue-950 rounded-lg shadow-md transition-transform duration-400 transform hover:scale-105 hover:shadow-amber-200 shadow-amber-100 p-5 text-blue-200 flex flex-col items-center cursor-pointer"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <img
        src={prediction}
        alt="Predictor"
        className="w-20 h-20 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold mb-2">predictor</h3>
      <p className="text-center text-sm">A simple ML model to predict outcomes from data inputs.</p>
    </div>

    {/* Card 4 */}
    <div className="md:w-96 h-60 bg-blue-950 rounded-lg shadow-md transition-transform duration-400 transform hover:scale-105 hover:shadow-amber-200 shadow-amber-100 p-5 text-blue-200 flex flex-col items-center cursor-pointer"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <img
        src={voice}
        alt="Voice Assistant"
        className="w-20 h-20 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold mb-2">voice_assistant</h3>
      <p className="text-center text-sm">Your own Jarvis-like assistant using Python’s speech recognition.</p>
    </div>

  </div>
</div>

      
    </div>
        </>
    )
}

export default Home;
