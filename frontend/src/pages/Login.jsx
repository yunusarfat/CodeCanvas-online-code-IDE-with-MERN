import React, { useState } from "react";
import logo from "../images/canvaslogo.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/banner.png";
import { api_base_url } from "../helper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          alert("Login Successful");
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] max-w-6xl flex shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left Side */}
        <div className="w-[50%] p-12 flex flex-col justify-center">
          <img src={logo} alt="Logo" className="rounded-2xl w-32 mb-8" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Login</h2>
          <p className="mb-6 text-gray-600">Join us and start your journey</p>
          <form onSubmit={submitForm} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side */}
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

export default Login;
