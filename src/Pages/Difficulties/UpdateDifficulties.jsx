import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import DifficultiesServices from './DifficultiesServices' 
import { useAlert } from '../../Context/AlertContext/AlertContext'; 

 function CharacterLimitInput () {
   const [value ,setValue] = useState('')
 }

const UpdateDifficulties = () => {
  const { id } = useParams()
  const navigate = useNavigate() 
   const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    level: '',
  })

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })

    const fetchdifficulties = async () => {
      const difficulty = await DifficultiesServices.get(id)
      if (!difficulty) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setFormData({
        title: difficulty.title || '',
        description: difficulty.description || '',
        status: difficulty.status || 'Inactive', 
        level: difficulty.level || "",
      })
      setLoading(false)
    }

    fetchdifficulties()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  
  const handleSubmit = async (e) => {
  e.preventDefault()
  const updateData = {
    title: formData.title,
    description: formData.description,
    status: formData.status,
    level: formData.level,
  }

  const updated = await DifficultiesServices.update(id, updateData)
  if (updated) {
    showAlert('Difficulties updated successfully.','success')
    navigate('/difficulties') 
  } else {
    showAlert('Failed to update Difficulties.','success')
  }
}


  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this Difficulties?')
    if (!confirmed) return

    const success = await DifficultiesServices.delete(id)
    if (success) { 
      showAlert('Difficulties deleted successfully.')
      navigate('/difficulties')
    } else {
      showAlert('Failed to delete Difficulties.',"error")
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (notFound) return <p className="text-center mt-20 text-red-500">Difficulty not found.</p>

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
            Update Difficulty
          </h2>

          <div className="bg-white shadow-xl rounded-xl p-8" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tag Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulty Name</label>
                <input
                  type="text"
                  name="name" 
                  maxLength={50}
                  value={formData.title}
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
                  maxLength={250}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                  required
                />
              </div>
              {/* Status */} 
               
                {/* Level  */} 
            <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
  <select
    name="level"
    value={formData.level}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Level</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>

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

export default UpdateDifficulties;
