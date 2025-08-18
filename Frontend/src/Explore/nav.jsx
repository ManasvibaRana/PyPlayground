import { useState, useEffect } from 'react';
import svg from "../Landing/images/SVG.svg"
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../checklogin/CheckLogin";

function Nav({ scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    setLoggedIn(isLoggedIn());
    console.log("isLoggedIn:", isLoggedIn());
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className=" text-white sticky top-0 z-50 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 ">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={svg} alt="Logo" className="h-8 w-auto rounded" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6">
            <a href="#home" onClick={() => scrollToSection('home')} className="hover:bg-blue-950 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#pythonhighlight" onClick={() => scrollToSection('pythonhighlight')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Python Highlights</a>
            <a href="#howitworks" onClick={() => scrollToSection('howitworks')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">How it works</a>
            <a href="#link" onClick={() => scrollToSection('link')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Links</a>
          </div>

          {/* Desktop Login Button */}
          {!loggedIn && (
            <div className="hidden sm:flex">
              <button
                className="login bg-amber-300 text-blue-900 font-bold px-4 py-1 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
                onClick={handleLoginClick}
              >
                Login &#x21E5;
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-1">
            <a href="#home" onClick={() => scrollToSection('home')} className="block hover:bg-blue-950 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#pythonhighlight" onClick={() => scrollToSection('pythonhighlight')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Python Highlights</a>
            <a href="#howitworks" onClick={() => scrollToSection('howitworks')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">How it works</a>
            <a href="#link" onClick={() => scrollToSection('link')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Links</a>
            
            {/* Mobile Login Button */}
            {!loggedIn && (
              <button
                className="login block w-full text-left bg-amber-300 text-blue-900 font-bold px-3 py-2 rounded border border-blue-950 shadow hover:bg-amber-400 transition"
                onClick={handleLoginClick}
              >
                Login &#x21E5;
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
