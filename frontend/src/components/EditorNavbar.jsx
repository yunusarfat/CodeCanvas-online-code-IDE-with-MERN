import React from "react";
import logo from "../images/canvaslogo.png";
import { FaDownload } from "react-icons/fa";

function EditorNavbar() {
  return (
    <header className="EditorNavbar bg-white  shadow-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-32 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity duration-200"
          />
        </div>

        {/* File Path Info */}
        <div className="text-sm sm:text-base font-medium text-gray-700">
          File / <span className="text-gray-400">My first project</span>
        </div>

        {/* Download Icon Button */}
        <button
          title="Download"
          className="btn not-odd:bg-black text-white p-2.5 rounded-md hover:bg-gray-800 transition duration-200"
        >
          <FaDownload className="text-lg" />
        </button>
      </nav>
    </header>
  );
}

export default EditorNavbar;
