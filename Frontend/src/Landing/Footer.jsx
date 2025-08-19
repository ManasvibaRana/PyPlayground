
import Footercard from "./Footercard";
        

export default function Footer() {
  return (
    <footer className=" text-white py-12 px-6 md:px-16 mt-20 bg-gradient-to-b from-slate-950 via-slate-900 to-black" id="bgcolor">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-blue-200 mb-2">PyPlayground</h3>
          <p className="text-sm text-gray-400">
            Explore Python’s coolest tools in one click. Hands-on, real-time, no setup needed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-blue-200 mb-2">Quick Links</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-200">
            <a href="/" className="hover:text-blue-200">Home</a>
            <a href="/explore" className="hover:text-blue-200">Explore</a>
            <a href="/facereco" className="hover:text-blue-200">Face Recognition</a>
            <a href="/handco" className="hover:text-blue-200">Hand Control</a>
            <a href="/yolo" className="hover:text-blue-200">YOLO Detection</a>
            <a href="/deepface" className="hover:text-blue-200">DeepFace</a>
            <a href="/collab" className="hover:text-blue-200">Collab</a>
            <a href="/chatbot" className="hover:text-blue-200">Chatbot</a>
          </div>
        </div>

        {/* Social / Connect */}
      

        {/* Made With */}
        <div>
          <h4 className="text-lg font-semibold text-blue-200 mb-2">Built With</h4>
          <p className="text-sm text-gray-400">
            React + Tailwind <br />
            Open source & made for learning.
          </p>
        </div>
      </div>
      

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} PyPlayground. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <Footercard/>
        </div>
      </div>
    </footer>
  );
}


        

