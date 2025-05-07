import React, { useEffect, useState } from "react";
import codelogo from "../images/canvaslogo.png";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import { MdLightMode } from "react-icons/md";
import { LuGrid2X2Check } from "react-icons/lu";
import { api_base_url, toggleClass } from "../helper";


function Navbar({isGridLayout,setIsGridLayout}) {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  return (
    <header className="bg-gray-50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={codelogo}
            alt="Logo"
            className="w-36 cursor-pointer rounded-2xl hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium text-sm md:text-base">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
         
        
          <Link
            to="/services"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            onClick={logout}
            to="/logout"
            className="hover:text-blue-600 p-1 rounded-lg bg-red-700 transition-colors duration-200"
          >
            Logout
          </Link>

          {/* Avatar */}
          <Avatar
            onClick={() => toggleClass(".dropDownNavbar", "hidden")}
            size={36}
            name={data ? data.name : "Arfat"}
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
        <div className="dropDownNavbar absolute right-16 top-20 bg-white shadow-xl rounded-xl w-44 py-2 z-50 transition-all duration-300 ease-in-out">
          {/* Username section */}
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-gray-800 text-sm font-semibold">{data.name}</p>
          </div>

          {/* Light Mode Option */}
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm text-gray-700 transition">
            <MdLightMode className="text-lg text-yellow-500" />
            Light Mode
          </button>

          {/* Grid Mode Option */}
          <button onClick={() => setIsGridLayout(!isGridLayout)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm text-gray-700 transition">
            <LuGrid2X2Check className="text-lg text-blue-600" />
            Grid Mode
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
