import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import TagUi from '../Tags/TagUi'
import AOS from 'aos'
import 'aos/dist/aos.css'

const UpdateTag = () => {
  const { id } = useParams()
  const Tag = TagUi.find((t) => t.id === id)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  const [formData, setFormData] = useState({
    name: Tag?.name || '',
    slug: Tag?.slug || '',
    description: Tag?.description || '',
    status: Tag?.status || 'active',
   
  })

  if (!Tag) {
    return <p className="text-center mt-20 text-red-500">Tag not found.</p>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Tag updated (in-memory).')
  }

  const handleDelete = () => {
    alert(`Tag "${Tag.name}" deleted (in-memory).`)
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-60">
        <div className="max-w-3xl mx-auto lg:p-6 p-2 lg:-mt-16 -mt-12 font-rubik">
          <h2
            className="lg:text-4xl text-3xl font-bold text-gray-800 mb-10 font-slab text-center"
            data-aos="fade-up"
          >
            Update Difficutly
          </h2>

          <div className="bg-white shadow-xl rounded-xl p-8" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tag Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1"> Difficulty Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
                 <div>
              <label className="block text-sm font-semibold  text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300   rounded-lg px-4  py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active"  >Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
                 <div>
              <label className="block text-sm font-semibold  text-gray-700 mb-1">Parent Difficulty</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300   rounded-lg px-4  py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active"  >None</option>
                <option value="inactive">Easy</option>
                <option value="active"  >Medium</option>
                <option value="inactive">Hard</option>
                <option value="inactive">Extreme</option>
              </select>
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
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r lg:-mt-6 -mt-8 bg-primary text-white w-full py-3 rounded-lg font-semibold hover:bg-primary/80 transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 border lg:-mt-6 -mt-8 border-red-300 hover:bg-red-50 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
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
