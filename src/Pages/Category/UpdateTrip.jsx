import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import Trips from '../../Pages/Category/Trips'

const UpdateTrip = () => {
  const { id } = useParams()
  const trip = Trips.find((t) => t.id === id)

  const [formData, setFormData] = useState({
    name: trip?.name || '',
    price: trip?.price || '',
    image: trip?.image || '',
  })

  if (!trip) {
    return <p className="text-center mt-20 text-red-500">Trip not found.</p>
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image' && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0])
      setFormData({ ...formData, image: imageUrl })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can integrate an API or state update logic here
    alert('Trip updated (in-memory).')
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-96 max-w-3xl  mx-auto p-6 -mt-10 font-rubik">

          <div>
            <h2 className="text-2xl mt-4 font-slab font-semibold text-gray-800 mb-6">Update Trip</h2>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-sm"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-4 rounded shadow w-full max-h-[300px] object-cover"
              />
            )}
          </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block  text-sm font-medium text-gray-700">Trip Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  )
}

export default UpdateTrip
