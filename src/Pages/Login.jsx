import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Keep track of previous location so we can revert navigation
  const prevLocation = useRef(location);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) return;

    if (location !== prevLocation.current) {
      const confirmLeave = window.confirm("You must log in before accessing other pages. Proceed?");
      if (!confirmLeave) {
        // revert navigation by going back to previous location
        navigate(prevLocation.current.pathname, { replace: true });
      } else {
        prevLocation.current = location;
      }
    }
  }, [location, isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 font-Rubik px-4">
      <div
        className="bg-white backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-8 md:p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
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

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
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
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
