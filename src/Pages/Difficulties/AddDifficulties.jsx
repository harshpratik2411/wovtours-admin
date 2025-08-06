import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import APIService from '../APIServices'; 
import DifficultiesServices from '../../Pages/Difficulties/DifficultiesServices' 
import { useAlert } from '../../Context/AlertContext/AlertContext';
 
  function CharacterLimitInput() {
 const [value, setValue] = useState('');  
  }  
const AddDifficulties = () => {
  const navigate = useNavigate(); 
   const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    level: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting Difficulties:', formData);
      const result = await DifficultiesServices.add(formData);
      if (result) {
        showAlert(
          'Diffiiculties added successfully!',
          'success'
        );
        navigate('/difficulties');
      } else {
        showAlert(
          'Failed to add difficulties.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showAlert(
        'An error occurred.',
        'error'
      ); 

    } finally {
      setLoading(false); 
    }};

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
            Add New Difficulties
          </h2>

          <div className="bg-white shadow-xl rounded-xl p-8" data-aos="fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Difficulties Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulties Title</label>
                <input
                  type="text"
                  name="title" 
                   maxLength={50} 
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
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
                   maxLength={255} 
                  onChange={handleChange} 
                  
                  placeholder="Enter description" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
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
                <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                
              </div>
             

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className={`bg-gradient-to-r bg-primary text-white w-full py-3 rounded-lg font-semibold transition duration-200 ${
                    loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/80'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Adding Difficulties...' : 'Add Difficulties'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDifficulties;