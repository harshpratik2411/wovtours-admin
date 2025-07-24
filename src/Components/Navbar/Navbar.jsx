// import { useEffect } from 'react';
// import { FiSearch } from 'react-icons/fi';
// import { IoMdNotificationsOutline } from 'react-icons/io';
// import AOS from 'aos';
// import 'aos/dist/aos.css'; 
// import Sidebar from '../Siderbar/Sidebar';

// const Navbar = () => {
//   useEffect(() => {
//     AOS.init({ duration: 600 });
//   }, []);

//   return (  
//      <>
//      <Sidebar/>
//     <div
//       className="max-w-full ml-40 lg:mt-0 -mt-8 flex flex-col sm:flex-row lg:justify-between lg:items-center px-4 sm:px-6 py-3 sm:space-y-0 space-y-4 rounded-lg bg-gray-500"
//     >
//       {/* Title - Visible only on large screens */}
//       <h1 className="text-2xl ml-10 font-bold hidden lg:flex font-Rubik text-gray-800">
//         Dashboard
//       </h1>
                
//       {/* Right side: Icons and Profile */}
//       <div className="flex flex-row  items-center space-x-6 w-full sm:w-auto min-w-0 overflow-hidden">
//         {/* Search Icon */}
//         <FiSearch className="text-xl text-gray-700 cursor-pointer" />

//         {/* Notification Icon */}
//         <div className="relative">
//           <IoMdNotificationsOutline className="text-2xl text-gray-700 cursor-pointer" />
//           <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//         </div>

//         {/* Divider */}
//         <h1 className="text-4xl font-thin hidden sm:block">|</h1>

//         {/* Profile Info */}
//         <div className="flex items-center  space-x-2 min-w-0 overflow-hidden">
//           <img
//             src="https://randomuser.me/api/portraits/women/44.jpg"
//             alt="profile"
//             className="w-10 h-10 mr-12  rounded-full object-cover shrink-0"
//           />
//           <div className="text-sm ">
//             <p className="font-semibold font-Rubik text-gray-800 truncate whitespace-nowrap">
//               Gladys 
//             </p>
//             <p className="text-xs font-Slab text-gray-500 truncate whitespace-nowrap">
//               Admin
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
//   );
// };

// export default Navbar;
import { useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
 import { FiSearch } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { div } from 'motion/react-client'; 


export default function TopNav() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return ( 
   <div className="lg:ml-40 ml-4 lg:-mt-0 -mt-8 lg:mr-[-5.6rem] z-50">
      <nav
        className="flex  justify-between  items-center  py-4"
        data-aos="fade-down"
      >
        {/* Left: Title */} 
       
        <h1 className="text-xl font-medium font-rubik text-black">Dashboard</h1>

        {/* Right: Icons and Profile */}
        <div className="flex items-center  gap-6">
          {/* Search Icon */}
          <button className="text-gray-600 hover:text-black">
            <FiSearch className="w-5 h-5" />
          </button>

          {/* Notification Bell with badge */}
          <div className="relative mt-2">
            <button className="text-gray-600 hover:text-black">
              <IoMdNotificationsOutline className="w-6 h-6" />
            </button>
            <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
          </div>

          {/* Profile */}
          <div className="flex lg:-mr-0 -mr-6 items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {/* <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium font-rubik text-black">Gladys Kanyinda</p>
              <p className="text-xs text-gray-500 font-rubik">Admin</p>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
