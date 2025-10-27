import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Type, Languages, Brain } from "lucide-react";

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-blue-600 transition font-medium text-base dark:text-gray-300 dark:hover:text-blue-400"
  >
    {children}
  </Link>
);

const Navbar = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("base");

  const toggleFontSize = () => {
    const newSize = fontSize === "base" ? "large" : "base";
    setFontSize(newSize);
    document.documentElement.style.fontSize =
      newSize === "large" ? "108%" : "100%";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm dark:bg-gray-900/90 dark:border-gray-700">
      <div className="max-w-[90rem] mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/app-home"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            <Brain className="w-6 h-6" />
            <span>MemoryMate</span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/app-home">Home</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/patient-dashboard">Patient Dashboard</NavLink>
            <NavLink to="/cognitive-support">Cognitive Support</NavLink>
            <NavLink to="/caregiver-dashboard">Caregiver</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Font Size Button */}
            <button
              onClick={toggleFontSize}
              className={`p-1.5 rounded-full border text-gray-600 dark:text-gray-300 dark:border-gray-600 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                fontSize === "large" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
              aria-label="Toggle Font Size"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <Languages className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 pointer-events-none" />
              <select
                onChange={(e) => toggleLanguage(e.target.value)}
                value={language}
                className="appearance-none bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-full pl-9 pr-6 py-1 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer transition"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (HI)</option>
              </select>
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="hidden sm:block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium px-2"
            >
              Login
            </Link>

            {/* Sign Up Button */}
            <Link to="/signup">
              <button className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300">
                Sign Up
              </button>
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-8 py-4 space-y-3">
          <NavLink to="/app-home" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/features" onClick={() => setIsOpen(false)}>
            Features
          </NavLink>
          <NavLink to="/patient-dashboard" onClick={() => setIsOpen(false)}>
            Patient Dashboard
          </NavLink>
          <NavLink to="/cognitive-support" onClick={() => setIsOpen(false)}>
            Cognitive Support
          </NavLink>
          <NavLink to="/caregiver-dashboard" onClick={() => setIsOpen(false)}>
            Caregiver
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/login" onClick={() => setIsOpen(false)}>
            Login
          </NavLink>
          <NavLink to="/signup" onClick={() => setIsOpen(false)}>
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
