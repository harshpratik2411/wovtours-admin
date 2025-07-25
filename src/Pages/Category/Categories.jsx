import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEye, FaPlus, FaEdit } from 'react-icons/fa'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import { useNavigate } from 'react-router-dom'
import Trips from '../../Pages/Category/Trips' 
import { FiSearch } from 'react-icons/fi'

const Categories = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 800 })

    // ✅ Click outside to close any open dropdown
    const handleClickOutside = (event) => {
      const isInside = event.target.closest('.dropdown-menu') || event.target.closest('.menu-toggle')
      if (!isInside) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getStatusClass = (status) => {
    if (status === 'Available') return 'bg-blue-100 text-blue-600'
    if (status === 'Few Left') return 'bg-yellow-100 text-yellow-600'
    return 'bg-red-100 text-red-600'
  }

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="bg-white p-6 lg:ml-40 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-10">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          {/* Left Side: Search + ADD */}
          <div className="flex items-center gap-2 flex-wrap">
            <FiSearch className='text-bold text-gray-600' size={22}/>
            <input  
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm focus:outline-none focus:ring"
            />
            <button className="flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100">
              <FaPlus size={12} /> Add
            </button>
          </div>

          {/* Right Side: Sort */}
          <button className="text-sm text-gray-600 border lg:mt-0 mt-3 px-3 py-1 rounded hover:bg-gray-100">
            Sort by
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm hidden sm:table">
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
              {Trips.map((trip) => (
                <tr key={trip.id} data-aos="fade-up" className="border-b hover:bg-gray-50 relative">
                  <td className="flex items-center gap-3 py-4">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="lg::w-16 lg:h-12 rounded object-cover"
                    />
                    <div className='lg:space-y-0 space-y-5'>
                      <p className="font-medium font-rubik text-gray-800">{trip.name}</p>
                      <span className="text-gray-500 text-xs">{trip.id}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700">{trip.price}</td>
                  <td className="lg:py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-4 font-rubik text-gray-700">{trip.booked}</td>
                  <td className="py-4 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => toggleMenu(trip.id)} className="text-gray-600 hover:text-black menu-toggle">
                        <BsThreeDotsVertical size={18} />
                      </button>
                      {activeMenu === trip.id && (
                        <div className="dropdown-menu absolute right-0 -top-16 z-10 bg-white border rounded shadow w-32">
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

          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {Trips.map((trip) => (
              <div key={trip.id} data-aos="fade-up" className="border p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={trip.image} alt={trip.name} className="w-20 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium text-gray-800">{trip.name}</p>
                    <span className="text-gray-500 text-xs">{trip.id}</span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-700 space-y-2">
                  <p><strong>Price:</strong> {trip.price}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${getStatusClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </p>
                  <p><strong>Booked:</strong> {trip.booked}</p>
                </div>

                <div className="mt-2 text-right relative">
                  <button onClick={() => toggleMenu(trip.id)} className="text-gray-600 hover:text-black menu-toggle">
                    <BsThreeDotsVertical size={18} />
                  </button>
                  {activeMenu === trip.id && (
                    <div className="dropdown-menu absolute right-0 top-3 z-10 bg-white border rounded shadow w-32">
                      <button onClick={() => navigate(`/categories/view/${trip.id}`)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                        <FaEye size={14} /> View
                      </button>
                      <button onClick={() => navigate(`/categories/update/${trip.id}`)} className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                        <FaEdit size={14} /> Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
