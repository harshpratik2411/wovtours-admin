import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    tripId: '',
    tripdescription: '',
    price: '',
    status: 'active',
    image: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({ ...formData, image: imageUrl });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trip added:', formData);
    navigate('/categories');
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="lg:ml-72 max-w-7xl mx-auto lg:p-6 p-2 -mt-12 font-rubik">
        <h2 className="lg:text-4xl text-3xl font-bold text-gray-800 mb-10 font-slab text-center" data-aos="fade-up">
          Add New Category
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Form */}
          <form onSubmit={handleSubmit} className="space-y-6 order-2 lg:order-1" data-aos="fade-up">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="name"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description.."
                className="w-full border border-gray-300 rounded-lg px-4 py-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
      
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r bg-primary text-white w-full py-3 rounded-lg font-semibold hover:bg-primary/80 transition duration-200"
              >
                Add Trip
              </button>
            </div>
          </form>

          {/* Right Column: Image Upload */}
          <div className="flex flex-col gap-4 items-center justify-center order-1 lg:order-2" data-aos="zoom-in">
            {/* Image Upload */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {formData.image ? (
              <img
                src={formData.image}
                alt="Trip Preview"
                className="rounded-xl shadow-md w-full h-auto object-contain border border-gray-200"
              />
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl border border-dashed">
                No Image Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
