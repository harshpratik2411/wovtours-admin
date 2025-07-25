import React from 'react'
import { useParams } from 'react-router-dom'
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
    return <p className="text-center mt-20 text-red-500">Trip not found.</p>
  }

  return (
    <>
      <Navbar />
      <Sidebar /> 
      <div className=" w-full  lg:ml-32 mx-auto p-6 -mt-10 font-rubik">
        <h2 className="text-2xl font-slab font-semibold text-gray-800 mb-6">View Trip</h2>

        {/* ✅ Centered Image */}
        <div className="flex justify-center mb-6">
          <img
            src={trip.image}
            alt={trip.name}
            className="rounded shadow-lg max-w-3xl max-h-[400px] w-full object-cover"
          />
        </div>

        {/* ✅ Trip Details */}
        <div className="space-y-3  font-rubik lg:text-xl text-sm text-gray-700">
          <p><strong>Trip Name:   </strong>{trip.name}</p>
          <p><strong>Trip ID:     </strong> {trip.id}</p>
          <p><strong>Price:       </strong> {trip.price}</p>
          <p><strong>Booked:      </strong> {trip.booked}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(trip.status)}`}>
              {trip.status}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default ViewTrip
