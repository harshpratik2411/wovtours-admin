import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-purple-300 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
