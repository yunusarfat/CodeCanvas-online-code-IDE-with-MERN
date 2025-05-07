import React, { useState } from "react";
import logo from "../images/canvaslogo.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/banner.png";
import { api_base_url } from "../helper";

function SignUp() {
  const [Username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ Username, name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("Account Created Successfully");
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0]">
      <div className="w-[90%] max-w-6xl flex flex-col md:flex-row shadow-xl rounded-3xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="w-full md:w-[50%] p-10 flex flex-col justify-center">
          <img src={logo} alt="Logo" className="w-22 rounded-2xl mb-6" />
          <h2 className="text-4xl font-bold mb-2 text-gray-800">Join Canvas</h2>
          <p className="mb-6 text-gray-600 text-sm">
            Design, code, and create your ideas beautifully.
          </p>
          <form onSubmit={submitForm} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Create Account
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[50%] hidden md:flex items-center justify-center bg-indigo-50">
          <img
            src={image}
            alt="Sign up visual"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
