
import { useEffect, useState } from 'react';
import svg from "./images/SVG.svg"

import { useNavigate,} from "react-router-dom";
import { isLoggedIn, logout as clearSession } from "../checklogin/CheckLogin";





function Navbar({scrollToSection}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

 const handleLoginClick = () => {
  navigate('/login');
};

  return (
    
  <>
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={svg} alt="Logo" className="h-8 w-auto rounded" />
         
          </div>
          

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-6">
            <a href="#home" onClick={() => scrollToSection('home')} className=" hover:bg-blue-950 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#pythonhighlight" onClick={() => scrollToSection('pythonhighlight')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Python Highlights</a>
            <a href="#howitworks" onClick={() => scrollToSection('howitworks')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">How it works</a>
            <a  href="#link" onClick={() => scrollToSection('link')} className="px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Links</a>
          </div>

          {/* Login / Profile */}
          <div className="hidden sm:flex relative items-center">
            {!loggedIn ? (
              <button className="bg-amber-300 text-blue-900 font-bold px-4 py-1 rounded border border-blue-950 shadow hover:bg-amber-400 transition" onClick={handleLoginClick} >
                Login &#x21E5;
              </button>
            ) : (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 hover:border-slate-600">
                  <span className="h-6 w-6 rounded-full bg-indigo-500/80 flex items-center justify-center text-xs">
                    {(sessionStorage.getItem('username') || 'U').charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-200">Profile</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-md shadow-lg">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800"
                      onClick={async () => {
                        try {
                          await fetch("http://localhost:8000/api/logout/", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" } });
                        } catch {}
                        clearSession();
                        setProfileOpen(false);
                        setLoggedIn(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
           <a href="#home" onClick={() => scrollToSection('home')} className="block hover:bg-blue-950 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#pythonhighlight" onClick={() => scrollToSection('pythonhighlight')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Python Highlights</a>
            <a href="#howitworks" onClick={() => scrollToSection('howitworks')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">How it works</a>
            <a  href="#link" onClick={() => scrollToSection('link')} className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-blue-950 hover:text-white">Links</a>
            {!loggedIn ? (
              <button className="block w-full text-left bg-amber-300 text-blue-900 font-bold px-3 py-2 rounded border border-blue-950 shadow hover:bg-amber-400 transition" onClick={handleLoginClick}>
                Login &#x21E5;
              </button>
            ) : (
              <button className="block w-full text-left bg-slate-800 border border-slate-700 px-3 py-2 rounded hover:bg-slate-700" onClick={async () => {
                try {
                  await fetch("http://localhost:8000/api/logout/", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" } });
                } catch {}
                clearSession();
                setMenuOpen(false);
                setLoggedIn(false);
                navigate("/");
              }}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>

   

</>
  
  );
}
export default Navbar;