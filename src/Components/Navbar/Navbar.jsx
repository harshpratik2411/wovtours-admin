import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  return ( 
    <div
      className="w-full ml-32 lg:mt-0 -mt-8 flex flex-col sm:flex-row lg:justify-between lg:items-center px-4 sm:px-6 py-3 sm:space-y-0 space-y-4 rounded-lg bg-custom-gray"
    >
      {/* Title - Visible only on large screens */}
      <h1 className="text-2xl ml-10 font-bold hidden lg:flex font-Rubik text-gray-800">
        Dashboard
      </h1>

      {/* Right side: Icons and Profile */}
      <div className="flex flex-row  items-center space-x-6 w-full sm:w-auto min-w-0 overflow-hidden">
        {/* Search Icon */}
        <FiSearch className="text-xl text-gray-700 cursor-pointer" />

        {/* Notification Icon */}
        <div className="relative">
          <IoMdNotificationsOutline className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Divider */}
        <h1 className="text-4xl font-thin hidden sm:block">|</h1>

        {/* Profile Info */}
        <div className="flex items-center  space-x-2 min-w-0 overflow-hidden">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-10 h-10 mr-12  rounded-full object-cover shrink-0"
          />
          <div className="text-sm ">
            <p className="font-semibold font-Rubik text-gray-800 truncate whitespace-nowrap">
              Gladys 
            </p>
            <p className="text-xs font-Slab text-gray-500 truncate whitespace-nowrap">
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
