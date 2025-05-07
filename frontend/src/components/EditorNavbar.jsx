import React from "react";
import logo from "../images/canvaslogo.png";

import { Link } from "react-router-dom";

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
        
        {/* Download Icon Button */}
     
        <Link
            to="/"
            className=" bg-blue-500 rounded-2xl p-2 transition-colors duration-200"
          >
            Back
          </Link>
         
      </nav>
    </header>
  );
}

export default EditorNavbar;
