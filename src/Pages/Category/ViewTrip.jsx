import React from 'react'
import { useParams } from 'react-router-dom'
import {
  FaInfoCircle,
  FaClipboardList,
} from 'react-icons/fa'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import Trips from '../../Pages/Category/Trips'

const getStatusClass = (status) => {
  if (status === 'Available') return 'bg-blue-100 text-blue-600'
  if (status === 'Few Left') return 'bg-yellow-100 text-yellow-600'
  return 'bg-red-100 text-red-600'
}

const ViewTrip = () => {
  const { id } = useParams()
  const trip = Trips.find((t) => t.id === id)

  if (!trip) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="w-full  lg:ml-32 mx-auto p-6 font-rubik">
          <p className="text-center text-xl text-red-500 font-semibold flex items-center justify-center gap-2">
            <FaInfoCircle className="text-2xl" />
            Trip not found.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full -mt-5   lg:ml-32 mx-auto p-6 font-rubik bg-custom-gray min-h-screen">
        <div className="rounded-xl -mt-10 bg-white shadow-lg p-10 max-w-6xl mx-auto ">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-primary border-b pb-4">
            <FaInfoCircle className="text-3xl text-black" />
            <h2 className="text-3xl font-slab font-bold text-gray-800">
              View Trip Details
            </h2>
          </div>

          {/* Trip Image */}
          <div className="flex justify-center mb-10">
            <img
              src={trip.image}
              alt={trip.name}
              className="rounded-lg shadow-md max-h-[400px] w-full object-cover border"
            />
          </div>

          {/* Trip Info */}
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700 text-base lg:text-lg mb-10">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-32">Trip Name:</span>
                <span>{trip.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-32">Trip ID:</span>
                <span>{trip.id}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-32">Booked:</span>
                <span>{trip.booked}</span>
              </div>
            </div>

            <div className="flex items-start lg:items-center gap-3">
              <span className="font-semibold mt-1">Status:</span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusClass(
                  trip.status
                )}`}
              >
                {trip.status}
              </span>
            </div>
          </div>

          {/* Static Description */}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center gap-3 mb-2">
              <FaClipboardList className="text-lg text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-800">Trip Description</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu
              metus condimentum, finibus eros nec, volutpat odio. Integer et nisi a
              sem gravida sollicitudin. Suspendisse potenti. Sed cursus nunc sit amet
              ex rutrum, non pulvinar magna porta. Etiam ut enim nec nulla tincidunt
              tempus. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTrip
