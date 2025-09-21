

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MediaCoverageServices from './MediaCoverageServices';
import { useAlert } from '../../Context/AlertContext/AlertContext';
const UpdateMediaCoverage = () => {
  const { showAlert } = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    media_url: '',
    media_id: '',
  });

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedMediaFile, setSelectedMediaFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const [allMediaCoverages, setAllMediaCoverages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchMediaCoverageDetails = async () => {
      const mediaCoverage = await MediaCoverageServices.get(id);
      if (!mediaCoverage) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setFormData({
        title: mediaCoverage.title || '',
        description: mediaCoverage.description || '',
        status: mediaCoverage.status || 'Inactive',
        media_url: mediaCoverage.media_url || '',
        media_id: mediaCoverage.media_id || '',
      });
      setPreviewURL(mediaCoverage.media_url || '');
      setLoading(false);
    };

    const fetchAllMediaCoverages = async () => {
      try {
        const response = await MediaCoverageServices.getAll("", "", 1, "");
        setAllMediaCoverages(response.MediaCoverages || []);
      } catch (error) {
        console.error("Failed to fetch media coverages", error);
      }
    };

    fetchMediaCoverageDetails();
    fetchAllMediaCoverages();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpdate = { ...formData };
    if (selectedMediaFile) {
      dataToUpdate.mediaFile = selectedMediaFile;
    }

    const updated = await MediaCoverageServices.update(id, dataToUpdate, !!selectedMediaFile);

    if (updated) {
      showAlert('Media coverage updated successfully.', 'success');
      navigate('/media-coverage');  // adjust route
    } else {
      showAlert('Failed to update media coverage.', 'error');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this media coverage?');
    if (!confirmed) return;

    const success = await MediaCoverageServices.delete(id);
    if (success) {
      showAlert('Media coverage deleted successfully.', 'success');
      navigate('/media-coverage'); 
    } else {
      showAlert('Failed to delete media coverage.', 'error');
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (notFound) return <p className="text-center mt-20 text-red-500">Media coverage not found.</p>;

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-64 mt-8 p-4 max-w-6xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10 font-slab" data-aos="fade-up">
          Update Media Coverage
        </h2>

        <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-xl overflow-hidden" data-aos="fade-up">
          {/* Left: Form */}
          <div className="lg:w-1/2 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  maxLength={200}
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

          {/* Right: Media Preview */}
          <div className="lg:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-8 border-t lg:border-t-0 lg:border-l gap-4">
            <img
              src={previewURL || '/placeholder.jpg'}
              alt={formData.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />

            <label className="cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition duration-200">
              Select New Media
              <input
                type="file"
                accept="image/*,video/*"  // adjust allowed media types
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedMediaFile(file);
                    setPreviewURL(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMediaCoverage;
