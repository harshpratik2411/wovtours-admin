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
      className="w-full flex ml-24 items-center justify-between px-6 py-3 bg-custom-gray shadow-sm"
      //data-aos="fade-down"
    >
      {/* Left side - Title */}
      <h1 className="text-2xl font-bold font-['Rubik'] text-gray-800">Dashboard</h1>

      {/* Right side - Icons and profile */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <FiSearch className="text-xl text-gray-700 cursor-pointer" />

        {/* Notification Icon with red dot */}
        <div className="relative">
          <IoMdNotificationsOutline className="text-2xl text-gray-700 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div> 
        <h1 className='text-4xl font-thin'>|</h1>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-semibold font-Rubik text-gray-800">Gladys Kanyinda</p>
            <p className="text-xs font-Slab text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
