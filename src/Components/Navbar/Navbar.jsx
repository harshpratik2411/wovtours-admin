import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FiSearch } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdShoppingBag,
  MdTrendingUp,
  MdRateReview,
  MdSettings,
  MdLogout,
  MdMenu,
} from 'react-icons/md';

export default function TopNav() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:ml-40 ml-4 lg:-mt-0 -mt-8 lg:mr-[-5.6rem] z-50 relative">
      <nav
        className="flex justify-between items-center py-4 relative z-40"
        data-aos="fade-down"
      >
        {/* Left section with menu button and title */}
        <div className="flex -ml-10 items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-primary text-white p-2 rounded-md shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdMenu className="text-xl" />
          </button>
          <h1 className="text-2xl lg:ml-16 font-medium font-rubik text-black">Dashboard</h1>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-black">
            <FiSearch className="w-5 h-5" />
          </button>
          <div className="relative mt-2">
            <button className="text-gray-600 hover:text-black">
              <IoMdNotificationsOutline className="w-6 h-6" />
            </button>
            <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
          </div>
          <div className="flex lg:-mr-0 -mr-6 items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0  left-0 z-50 h-full bg-primary text-white font-rubik px-6 py-8 flex flex-col justify-between rounded-r-xl
          transition-transform duration-300 ease-in-out
          w-60
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:hidden
        `}
      >
        <div>
          {/* Close Button (✕) */}
          <div className="flex  justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl"
              aria-label="Close Menu"
            >
              &times;
            </button>
          </div>

          <h1 className="text-2xl  font-bold mb-10">Eormi</h1>
          <ul className="space-y-5">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white font-medium">
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </div>
              <span className="text-xs bg-red-500 px-2 py-0.5 rounded-md">2</span>
            </li>
            <li className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdOutlineProductionQuantityLimits className="text-xl" />
              <span>Products</span>
            </li>
            <li className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdShoppingBag className="text-xl" />
              <span>Orders</span>
            </li>
            <li className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdTrendingUp className="text-xl" />
              <span>Sales</span>
            </li>
            <li className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdRateReview className="text-xl" />
              <span>Reviews</span>
            </li>
          </ul>

          <hr className="my-8 border-white/20" />

          <div className="space-y-5">
            <h2 className="text-xs font-robotoSlab  text-white/50 tracking-widest">OTHER</h2>
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdSettings className="text-xl" />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <MdLogout className="text-xl" />
              <span>Logout</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r  from-cyan-500 to-blue-500  rounded-xl  p-4 mt-4 text-center">
          <p className="text-sm font-semibold">Improve Your Sales Efficiency</p>
          <button className="mt-3 bg-white text-primary font-bold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-100 transition">
            Start Now
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
