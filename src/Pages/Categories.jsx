import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEye, FaPlus, FaEdit } from 'react-icons/fa' 
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Siderbar/Sidebar'

const trips = [
  {
    id: 'TRP134890',
    name: 'Bali Adventure',
    image: 'https://source.unsplash.com/80x80/?bali,beach',
    price: '$1200.00',
    status: 'Available',
    booked: '206 people',
  },
  {
    id: 'TRP192846',
    name: 'Sahara Desert Safari',
    image: 'https://source.unsplash.com/80x80/?desert,camel',
    price: '$850.00',
    status: 'Few Left',
    booked: '124 people',
  },
  {
    id: 'TRP1110998',
    name: 'Himalayan Expedition',
    image: 'https://source.unsplash.com/80x80/?mountains,travel',
    price: '$1500.00',
    status: 'Available',
    booked: '1000 people',
  },
  {
    id: 'TRP223344',
    name: 'Venice Getaway',
    image: 'https://source.unsplash.com/80x80/?venice,canal',
    price: '$980.00',
    status: 'Available',
    booked: '72 people',
  },
  {
    id: 'TRP556677',
    name: 'Tokyo Explorer',
    image: 'https://source.unsplash.com/80x80/?tokyo,city',
    price: '$1330.00',
    status: 'Few Left',
    booked: '58 people',
  },
  {
    id: 'TRP889900',
    name: 'Alaskan Cruise',
    image: 'https://source.unsplash.com/80x80/?alaska,cruise',
    price: '$2100.00',
    status: 'Available',
    booked: '305 people',
  },
]

const TopTrips = () => {
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    AOS.init({ duration: 800 })
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
    <Navbar/>
    <Sidebar/>
    <div className="bg-white p-6 ml-40 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-slab font-semibold text-gray-800">Top Selling Trips</h2>
        <button className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
          Sort by
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 uppercase border-b">
            <tr>
              <th className="py-2">Trip Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Booked</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                data-aos="fade-up"
                className="border-b hover:bg-gray-50 relative"
              >
                <td className="flex items-center gap-3 py-4">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{trip.name}</p>
                    <span className="text-gray-500 text-xs">{trip.id}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-700">{trip.price}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      trip.status
                    )}`}
                  >
                    {trip.status}
                  </span>
                </td>
                <td className="py-4 text-gray-700">{trip.booked}</td>
                <td className="py-4 text-right relative">
                  <button
                    onClick={() => toggleMenu(trip.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <BsThreeDotsVertical size={18} />
                  </button>

                  {activeMenu === trip.id && (
                    <div className="absolute right-2 top-10 z-10 bg-white border rounded shadow w-32">
                      <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                        <FaEye size={14} /> View
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                        <FaPlus size={14} /> Add
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700">
                        <FaEdit size={14} /> Update
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
    </>
  )
}

export default TopTrips
