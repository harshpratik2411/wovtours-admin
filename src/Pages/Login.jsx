import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import login from "../assets/login/login.jpg";
import logo from "../assets/logo/logo.webp";
import AuthService from "../Pages/AuthService";
import APIService from "./APIServices";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const prevLocation = useRef(location);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) return;
    if (location !== prevLocation.current) {
      const confirmLeave = window.confirm(
        "You must log in before accessing other pages. Proceed?"
      );
      if (!confirmLeave) {
        navigate(prevLocation.current.pathname, { replace: true });
      } else {
        prevLocation.current = location;
      }
    }
  }, [location, isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await AuthService.login(username, password);
      navigate("/");
    } catch (error) {
      console.log("Error = ",error);
      
      if (APIService.isUnauthenticated(error.status)) {
        alert(error.response.data.detail);
      } else if (APIService.isError(error.status)===true) {
        alert(error.response.data.detail);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center lg:p-52 p-2 justify-center bg-primary font-Rubik">
      <div className="flex flex-col lg:flex-row  lg:h-[43rem]  lg:-mt-36  w-full max-w-6xl bg-custom-gray rounded-xl shadow-lg overflow-hidden">
        {/* Left Image */}
        <div className=" lg:block lg:w-1/2">
          <img
            src={login}
            alt="Login Visual"
            className="h-full w-full object-cover"
            style={{ height: "100%" }}
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex  items-center justify-center p-8 bg-custom-gray">
          <div className="w-full max-w-md">
            <img
              src={logo}
              alt="logo"
              className="w-30 h-16 lg:ml-28 ml-8 mb-8 -mt-8"
            />
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Admin Login
            </h2>

            <form
              onSubmit={handleLogin}
              className="space-y-5 lg:ml-14 ml-5 mr-5 lg:mr-14"
            >
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="flex items-center mb-2 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 ml-2 focus:outline-none hover:text-gray-600"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg shadow hover:bg-primary/80 active:scale-95 transition duration-200"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
