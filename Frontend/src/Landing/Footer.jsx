
import Footercard from "./Footercard";
        

export default function Footer() {
  return (
    <footer className=" text-white py-10 px-6 md:px-16 mt-20" id="bgcolor">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

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
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="#explore" className="hover:text-blue-200">Explore Tools</a></li>
            <li><a href="#howitworks" className="hover:text-blue-200">How It Works</a></li>
            <li><a href="#about" className="hover:text-blue-200">About Us</a></li>
            <li><a href="#contact" className="hover:text-blue-200">Contact</a></li>
          </ul>
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
      

      <div className="text-start text-sm text-gray-500 mt-10">
          <div className="flex justify-end">
         <Footercard/>
        </div>
        © {new Date().getFullYear()} PyPlayground. All rights reserved.
      </div>
    </footer>
  );
}


        

