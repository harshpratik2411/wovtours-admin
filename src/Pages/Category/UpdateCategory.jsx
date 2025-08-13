import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CategoryServices from './CategoryServices'
import { useAlert } from '../../Context/AlertContext/AlertContext' 
import { MdDescription } from 'react-icons/md'

const UpdateCategory = () => { 
   const { showAlert } = useAlert();
  const { id } = useParams()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    parent_id: '',
    status: 'Active',
    media_url: '',
    media_id: '',
  })

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewURL, setPreviewURL] = useState('') 
  const [categories, setCategories] = useState([]);


  useEffect(() => {
  AOS.init({ duration: 800, once: true });

  const fetchCategoryDetails = async () => {
    const category = await CategoryServices.get(id);
    if (!category) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setFormData({
      title: category.title || '',
      description: category.description || '',
      parent_id: category.parent_id || '',
      status: category.status || 'Inactive',
      media_url: category.media_url || '',
      media_id: category.media_id || '',
    });
    setPreviewURL(category.media_url || '');
    setLoading(false);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await CategoryServices.getAll("", "", 1, ""); 
      setCategories(response.Categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  fetchCategoryDetails();
  fetchAllCategories();
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToUpdate = { ...formData }

    // Append media file if selected
    if (selectedImage) {
      dataToUpdate.media = selectedImage
    }

    const updated = await CategoryServices.update(id, dataToUpdate, !!selectedImage)

    if (updated) {
      showAlert('Category updated successfully.', 'success')
      navigate('/categories')
    } else {
      showAlert('Failed to update categories.', 'error')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this Category?')
    if (!confirmed) return

    const success = await CategoryServices.delete(id)
    if (success) {
      showAlert('Category deleted successfully.', 'success')
      navigate('/categories')
    } else {
      showAlert('Failed to delete categories.', 'error')
    }
  }

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (notFound) return <p className="text-center mt-20 text-red-500">Category not found.</p>

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-64 mt-8 p-4 max-w-6xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 font-slab" data-aos="fade-up">
          Update Category
        </h2>

        <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-xl overflow-hidden" data-aos="fade-up">
          {/* Left: Form */}
          <div className="lg:w-1/2 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                 Category Title
                </label>
                <input
                  type="text"
                  name="title"
                  maxLength={100}
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> 
               <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <input 
            type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

              {/* Category Type */}
             <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Parent Category
  </label>
  <select
    name="parent_id"
    value={formData.parent_id || ''}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">None</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.title}
      </option>
    ))}
  </select>
</div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white w-full py-3 rounded-lg font-semibold hover:bg-primary/80 transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>

          {/* Right: Image Preview */}
          <div className="lg:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-8 border-t lg:border-t-0 lg:border-l gap-4">
            <img
              src={previewURL || '/placeholder.jpg'}
              alt={formData.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            {/* File Input for Upload */}
            <label className="cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200">
              Select New Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setSelectedImage(file)
                    setPreviewURL(URL.createObjectURL(file))
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateCategory;
