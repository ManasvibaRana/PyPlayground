
import { useState } from 'react';
import svg from "./SVG.svg"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={svg} alt="Logo" className="h-8 w-auto rounded" />
         
          </div>
          

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6">
            <a href="#" className="bg-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Python Highlights</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
          </div>

          {/* Login Button */}
          <div className="hidden sm:flex">
            <button className="bg-amber-300 text-blue-900 font-bold px-4 py-1 rounded border border-blue-950 shadow hover:bg-amber-400 transition">
              Login &#x21E5;
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-1">
            <a href="#" className="block bg-gray-900 px-3 py-2 rounded-md">Dashboard</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Team</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Projects</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Calendar</a>
            <button className="block w-full text-left bg-amber-300 text-blue-900 font-bold px-3 py-2 rounded border border-blue-950 shadow hover:bg-amber-400 transition">
              Login &#x21E5;
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;