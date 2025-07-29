import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsThreeDotsVertical, BsXCircle } from 'react-icons/bs';
import { FaEye, FaEdit, FaPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import { useNavigate } from 'react-router-dom';
import DifficultiesUI from './DifficultiesUI';

const Difficulties = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyList, setDifficultyList] = useState(DifficultiesUI);
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

  const toggleMenu = (id) => setActiveMenu(activeMenu === id ? null : id);
  const toggleSort = () => setSortMenuOpen(!sortMenuOpen);
  const handleSort = (option) => {
    console.log('Sort by', option);
    setSortMenuOpen(false);
  };

  const clearSearch = () => setSearchText('');

  const filtered = difficultyList.filter(difficulty =>
    difficulty.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const pages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const updateBooked = (id, delta) => {
    setDifficultyList(prev =>
      prev.map(difficulty =>
        difficulty.id === id ? { ...difficulty, booked: Math.max(0, difficulty.booked + delta) } : difficulty
      )
    );
  };

  const getStatusClass = (status) => {
    if (status === 'Active') return 'bg-blue-100 text-blue-600';
    if (status === 'InActive') return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2">

        {/* Search, Sort, Add */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search..."
                className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-full sm:w-52"
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

            <div className="relative w-full sm:w-auto">
              <button
                onClick={toggleSort}
                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100 w-full sm:w-auto"
              >
                Sort By
              </button>
              {sortMenuOpen && (
                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-40 z-20">
                  {['Name A‑Z', 'Name Z‑A', 'Date ASC', 'Date DESC', 'Popularity ASC', 'Popularity DESC'].map(opt => (
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
            onClick={() => navigate('/difficulties/add-difficulties')}
            className="flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100 w-full sm:w-auto"
          >
            <FaPlus size={12} /> Add
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto ">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-500  font-rubik uppercase border-b">
              <tr className="hidden sm:table-row">
                <th className="lg:py-2">Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Description</th>
                <th className="py-2">Slug</th>
                <th className="py-2 ">Didfficulty Levels</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(difficulty => (
                <tr
                  key={difficulty.id}
                  data-aos="fade-up"
                  className="border-b hover:bg-gray-50 relative  flex flex-col sm:table-row sm:flex-row"
                >
                  <td className="py-2 px-2  sm:px-0">
                    <p className="font-medium lg:ml-0 ml-[2px] text-gray-800">{difficulty.name}</p>
                  </td>

                  <td className="py-2 px-2 sm:px-0">
                    <span className={`px-3 py-1  rounded-full text-left text-xs font-medium ${getStatusClass(difficulty.status)}`}>
                      {difficulty.status}
                    </span>
                  </td>

                  <td className="py-2 px-2 lg:ml-0 ml-[2px] -mr-40  lg:block sm:px-0 text-gray-700 whitespace-normal break-words max-w-xs">
                    {difficulty.desc}
                  </td> 
                  <td className="py-2 px-2 lg:ml-0 ml-[2px] sm:px-0 text-gray-700">{difficulty.slug}</td> 
            
                 <td className="py-2 px-2 sm:px-0 text-gray-700">
      <span className='ml-16'>{difficulty?.level || 'N/A'}</span>
</td>

 
                  <td className="py-2 px-2  sm:px-0 text-right sm:text-left">
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleMenu(difficulty.id)}
                        className="text-gray-600 hover:text-black menu-toggle"
                      >
                        <BsThreeDotsVertical className='' size={18} />
                      </button>
                      {activeMenu === difficulty.id && (
                                        <div className="dropdown-menu absolute right-0 -top-20 z-10 bg-white border rounded shadow w-32">
                                          <button
                                            onClick={() => navigate(`/difficulties/view/${difficulty.id}`)}
                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                          >
                                            <FaEye size={14} /> View
                                          </button>
                                          <button
                                            onClick={() => navigate(`//update/${difficulty.id}`)}
                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                          >
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

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            {[...Array(pages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${currentPage === idx + 1
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'           
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button on Mobile */}
      <button
        onClick={() => navigate('/difficulties/add-difficulty')}
        className="sm:hidden fixed bottom-3 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add difficulty"
      >
        <FaPlus size={15} />
      </button>
    </>
  );
};

export default Difficulties;
