import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdOutlineCategory,
  MdLabel,
  MdTerrain,
  MdHiking,
  MdPublic,
  MdTour,
  MdOutlineProductionQuantityLimits,
  MdPeople,
  MdSettings,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { HiOutlineDocumentCurrencyRupee } from "react-icons/hi2";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { LuFullscreen } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const openConfirmLogout = () => setShowConfirmLogout(true);
  const closeConfirmLogout = () => setShowConfirmLogout(false);

  const confirmLogout = () => {
    handleLogout();
    closeConfirmLogout();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="hidden fixed top-7 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenu className="text-2xl" />
      </button>

      <div className="mt-10">
        <div
          className={`
            fixed top-0 left-0 z-40 h-full bg-primary text-white font-rubik px-6 mt-0 lg:mt-6 py-8 flex flex-col justify-between rounded-xl
            transition-transform duration-300 ease-in-out
            w-60 overflow-y-auto max-h-screen
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 static lg:ml-3 -mt-2
          `}
        >
          <div>
            <h1 className="text-2xl font-bold mb-10">Wov Tours</h1>
            <ul className="space-y-6">
              <li className="flex items-center justify-between">
                <a
                  href="/"
                  className={`flex items-center gap-3 font-medium ${
                    isActive("/")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdDashboard className="text-xl" />
                  <span>Dashboard</span>
                </a>
                <span className="text-xs bg-red-500 px-2 py-0.5 rounded-md">
                  2
                </span>
              </li>
              <li>
                <a
                  href="/categories"
                  className={`flex items-center gap-3 ${
                    isActive("/categories")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdOutlineCategory className="text-xl" />
                  <span>Categories</span>
                </a>
              </li>
              <li>
                <a
                  href="/tags"
                  className={`flex items-center gap-3 ${
                    isActive("/tags")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdLabel className="text-xl" />
                  <span>Tags</span>
                </a>
              </li>
              <li>
                <a
                  href="/difficulties"
                  className={`flex items-center gap-3 ${
                    isActive("/difficulties")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdTerrain className="text-xl" />
                  <span>Difficulties</span>
                </a>
              </li>
              <li>
                <a
                  href="/activities"
                  className={`flex items-center gap-3 ${
                    isActive("/activities")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdHiking className="text-xl" />
                  <span>Activities</span>
                </a>
              </li>
              <li>
                <a
                  href="/pricing-category"
                  className={`flex items-center gap-3 ${
                    isActive("/pricing category")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <HiOutlineDocumentCurrencyRupee className="text-xl" />
                  <span>Pricing Category</span>
                </a>
              </li>
              <li>
                <a
                  href="/destinations"
                  className={`flex items-center gap-3 ${
                    isActive("/destinations")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdPublic className="text-xl" />
                  <span>Destinations</span>
                </a>
              </li>
              <li>
                <a
                  href="/banners"
                  className={`flex items-center gap-3 ${
                    isActive("/banners")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <LuFullscreen className="text-xl" />
                  <span>Banners</span>
                </a>
              </li>
              <li>
                <a
                  href="/trip-type"
                  className={`flex items-center gap-3 ${
                    isActive("/trip-type")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdTour className="text-xl" />
                  <span>Trip Type</span>
                </a>
              </li>
              <li>
                <a
                  href="/trips"
                  className={`flex items-center gap-3 ${
                    isActive("/trips")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdOutlineProductionQuantityLimits className="text-xl" />
                  <span>Trips</span>
                </a>
              </li>
              <li>
                <a
                  href="/trip-enquiry"
                  className={`flex items-center gap-3 ${
                    isActive("/trip-enquiry")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdOutlineProductionQuantityLimits className="text-xl" />
                  <span>Trip Enquiry</span>
                </a>
              </li>
              <li>
                <a
                  href="/bookings"
                  className={`flex items-center gap-3 ${
                    isActive("/trip-enquiry")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <BsBookmarkCheckFill className="text-xl" />
                  <span>Bookings</span>
                </a>
              </li>
              <li>
                <a
                  href="/users"
                  className={`flex items-center gap-3 ${
                    isActive("/users")
                      ? "text-white"
                      : "text-white/50 hover:text-white transition"
                  }`}
                >
                  <MdPeople className="text-xl" />
                  <span>Users</span>
                </a>
              </li>
            </ul>
            <hr className="my-8 border-white/20" />

            <div className="space-y-6">
              <h2 className="text-xs font-robotoSlab text-white/50 tracking-widest">
                OTHER
              </h2>
              <div className="flex items-center gap-3 text-white/50 hover:text-white transition">
                <ul>
                  <li>
                    <a
                      href="/settings"
                      className={`flex items-center gap-3 ${
                        isActive("/settings")
                          ? "text-white"
                          : "text-white/80 hover:text-white transition"
                      }`}
                    >
                      <MdSettings className="text-xl" />
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-3 text-white/80 hover:text-white transition cursor-pointer">
                <MdLogout className="text-xl" />
                <button
                  onClick={openConfirmLogout}
                  className="bg-primary text-white -ml-4 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 mb-4 to-blue-500 h-52 rounded-xl p-4 mt-8 text-center">
            <p className="text-md text-xl mt-10 font-bold">
             WOV Tours 
            </p> 
            <p className="text-sm mt-1 font-semibold">Every Step Has A Story</p>
           <a
  href="/"
  className="mt-10 bg-white text-primary font-rubik font-bold text-sm px-4 py-1 rounded-xl shadow-md hover:bg-custom-gray transition inline-block"
>
  Get Started
</a>

          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Logout Confirmation Popup */}
      {showConfirmLogout && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={closeConfirmLogout}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-slate-100 rounded-xl shadow-2xl max-w-sm w-full p-8 mx-4"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Confirm Logout
            </h2>
            <p className="text-primary mb-8">
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
                onClick={closeConfirmLogout}
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

export default Sidebar;
