import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });

    // You can add authentication logic here

    navigate("/homepage"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br font-Rubik px-4">
      <div
        data-aos="fade-up"
        className="bg-white backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-8 md:p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <FiUser  size={25} className="text-gray-500 mr-2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full outline-none bg-transparent placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <FiLock size={25} className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent placeholder-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 ml-2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
