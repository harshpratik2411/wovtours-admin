import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TagServices from '../../Pages/Tags/TagServices'

const UpdateTag = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  })

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })

    const fetchTag = async () => {
      const tag = await TagServices.get(id)
      if (!tag) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setFormData({
        name: tag.name || '',
        description: tag.desc || '',
        status: tag.status || 'Inactive',
      })
      setLoading(false)
    }

    fetchTag()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  
  const handleSubmit = async (e) => {
  e.preventDefault()
  const updateData = {
    title: formData.name,
    description: formData.description,
    status: formData.status,
  }

  const updated = await TagServices.update(id, updateData)
  if (updated) {
    alert('Tag updated successfully.')
    navigate('/tags') 
  } else {
    alert('Failed to update tag.')
  }
}

  

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this tag?')
    if (!confirmed) return

    const success = await TagServices.delete(id)
    if (success) {
      alert('Tag deleted successfully.')
      navigate('/tags')
    } else {
      alert('Failed to delete tag.')
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (notFound) return <p className="text-center mt-20 text-red-500">Tag not found.</p>

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-60">
        <div className="max-w-3xl mx-auto lg:p-6 p-2 -mt-12 font-rubik">
          <h2
            className="lg:text-4xl text-3xl font-bold text-gray-800 mb-10 font-slab text-center"
            data-aos="fade-up"
          >
            Update Tag
          </h2>

          <div className="bg-white shadow-xl rounded-xl p-8" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tag Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tag Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 required
                />
              </div>



              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                  required
                />
              </div>
              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r lg:-mt-4 bg-primary text-white w-full py-3 rounded-lg font-semibold hover:bg-primary/80 transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 border lg:-mt-4 border-red-300 hover:bg-red-50 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateTag
