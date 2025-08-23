import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "./APIServices";
import LocalStorage from "./LocalStorage";

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const confirmLogout = () => {
    closeConfirm();
    LocalStorage.logout();
    
  };

  return (
    <>
      <button
        onClick={openConfirm}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition"
      >
        Logout
      </button>

      {showConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closeConfirm}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white b rounded-xl shadow-2xl max-w-sm w-full p-8 mx-4 transform transition-transform scale-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-8">
              Are you sure you want to log out from your account?
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
              >
                Yes
              </button>
              <button
                onClick={closeConfirm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-md shadow-sm transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
