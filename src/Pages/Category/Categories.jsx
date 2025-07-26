import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsThreeDotsVertical, BsXCircle } from 'react-icons/bs';
import { FaEye, FaEdit, FaPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Trips from '../../Pages/Category/Trips';

const Categories = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });

    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.dropdown-menu') &&
        !event.target.closest('.menu-toggle') &&
        !event.target.closest('.sort-toggle')
      ) {
        setActiveMenu(null);
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Active') return 'bg-blue-100 text-blue-600';
    if (status === 'InActive') return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
  };

  const toggleMenu = (id) => setActiveMenu(activeMenu === id ? null : id);
  const toggleSort = () => setSortMenuOpen(!sortMenuOpen);

  const handleSort = (option) => {
    console.log('Sort by', option);
    setSortMenuOpen(false);
    // apply sorting logic
  };

  const clearSearch = () => setSearchText('');

  const filtered = Trips.filter(trip =>
    trip.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const pages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="bg-white p-6 lg:ml-40 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-10">
        {/* Search + Sort + Add Row */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2 flex-wrap relative">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search..."
                className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-52"
              />
              {searchText && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <BsXCircle size={18} />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleSort}
                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100"
              >
                Sort By
              </button>
              {sortMenuOpen && (
                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-40 z-20">
                  {['Name A-Z', 'Name Z-A', 'Date ASC', 'Date DESC', 'Popularity ASC', 'Popularity DESC'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSort(opt)}
                      className="px-3 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/categories/add')}
            className="hidden sm:flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100"
          >
            <FaPlus size={12} /> Add
          </button>
        </div>

        {/* Table View for sm+ */}
        <div className="overflow-x-auto hidden sm:table w-full">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 font-rubik uppercase border-b">
              <tr>
                <th className="py-2">Trip Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Status</th>
                <th className="py-2">Booked</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(trip => (
                <tr key={trip.id} data-aos="fade-up" className="border-b hover:bg-gray-50 relative">
                  <td className="flex items-center gap-3 py-4">
                    <img src={trip.image} alt={trip.name} className="w-16 h-12 rounded object-cover" />
                    <div>
                      <p className="font-medium text-gray-800">{trip.name}</p>
                      <span className="text-gray-500 text-xs">{trip.id}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700">₹{trip.price}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-700">{trip.booked}</td>
                  <td className="py-4 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => toggleMenu(trip.id)} className="text-gray-600 hover:text-black menu-toggle">
                        <BsThreeDotsVertical size={18} />
                      </button>
                      {activeMenu === trip.id && (
                        <div className="dropdown-menu absolute right-0 lg:-top-20 z-10 bg-white border rounded shadow w-32">
                          <button onClick={() => navigate(`/categories/view/${trip.id}`)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                            <FaEye size={14} /> View
                          </button>
                          <button onClick={() => navigate(`/categories/update/${trip.id}`)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                            <FaEdit size={14} /> Update
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {displayed.map(trip => (
            <div key={trip.id} data-aos="fade-up" className="border rounded-lg shadow-sm bg-gray-50 relative overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
              </div>

              <div className="absolute top-2 right-2 z-10">
                <button onClick={() => toggleMenu(trip.id)} className="text-gray-600 hover:text-black menu-toggle">
                  <BsThreeDotsVertical size={18} />
                </button>
                {activeMenu === trip.id && (
                  <div className="dropdown-menu absolute right-0 top-6 z-10 bg-white border rounded shadow w-32">
                    <button
                      onClick={() => navigate(`/categories/view/${trip.id}`)}
                      className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                    >
                      <FaEye size={14} /> View
                    </button>
                    <button
                      onClick={() => navigate(`/categories/update/${trip.id}`)}
                      className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                    >
                      <FaEdit size={14} /> Update
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1 text-sm text-gray-700">
                <p className="font-medium text-gray-800 text-lg">{trip.name}</p>
                <span className="text-gray-500 text-xs">{trip.id}</span>
                <p><strong>Price:</strong> ₹{trip.price}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${getStatusClass(trip.status)}`}>
                    {trip.status}
                  </span>
                </p>
                <p><strong>Booked:</strong> {trip.booked}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            {[...Array(pages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button on mobile */}
      <button
        onClick={() => navigate('/categories/add')}
        className="sm:hidden fixed bottom-8 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add Trip"
      >
        <FaPlus size={15} />
      </button>
    </>
  );
};

export default Categories;
