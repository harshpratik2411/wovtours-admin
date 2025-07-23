import React, { useEffect, useState } from 'react';
import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdShoppingBag,
  MdTrendingUp,
  MdRateReview,
  MdSettings,
  MdLogout,
  MdMenu
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-7 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenu className="text-2xl" />
      </button>

      {/* Sidebar for all screens */}
      <div>
        <div
          className={`
            fixed top-0 left-0 z-40 h-full bg-primary text-white font-rubik px-6 mt-0 lg:mt-6 py-8 flex flex-col justify-between rounded-xl
            transition-transform duration-300 ease-in-out
            w-60 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 static lg:ml-3 -mt-2
          `}
        >
          <div>
            <h1 className="text-2xl font-bold mb-10">Eormi</h1>
            <ul className="space-y-6">
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

            <div className="space-y-6">
              <h2 className="text-xs font-robotoSlab text-white/50 tracking-widest">OTHER</h2>
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

          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-4 mt-8 text-center">
            <p className="text-sm font-semibold">Improve Your Sales Efficiency</p>
            <button className="mt-3 bg-white text-primary font-bold text-sm px-4 py-1 rounded-full shadow-md hover:bg-gray-100 transition">
              Start Now
            </button>
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
    </>
  );
};

export default Sidebar;
