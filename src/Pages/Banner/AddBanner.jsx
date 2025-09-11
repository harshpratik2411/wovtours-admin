import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useAlert } from "../../Context/AlertContext/AlertContext";
import BannerServices from "./BannerServices";

const AddBanner = () => {
  const [title, setTitle] = useState("");
  const [bannerType, setBannerType] = useState("");
  const [status, setStatus] = useState("Active");
  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showAlert("Title is required");
      return;
    }

    setLoading(true);

    const data = {
      title,
      banner_type: bannerType,
      status,
      media: mediaFile,
    };

    const result = await BannerServices.add(data);

    setLoading(false);

    if (result) {
      showAlert("Banner added successfully!");
      navigate("/banners");
    }
  };

  return ( 
    <>
      <Navbar />
      <Sidebar />

      <div className="lg:ml-80 p-4 max-w-5xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center font-slab">
          Add New Bannner
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Banner Type - Updated as Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Banner Type
              </label>
              <select
                id="banner_type"
                value={bannerType}
                onChange={(e) => setBannerType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select banner type</option>
                <option value="HOME">HOME</option>
                <option value="ABOUT">ABOUT</option>
                <option value="OUR_TEAM">OUR_TEAM</option>
                <option value="OUR_FAQ">OUR_FAQ</option>
                <option value="OUR_CONTACT">OUR_CONTACT</option>
                <option value="MARKETING">MARKETING</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary text-white lg:px-6 px-3 lg:py-3 py-2 rounded-lg font-semibold transition duration-200 ${
                  loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {loading ? "Adding Banner..." : "Add Banner"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/banners")}
                className="border lg:px-6 px-3 lg:py-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Right: File Upload Preview */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 border rounded-lg">
            <input
              id="mediaFile"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              className="mb-4 w-full max-w-md"
            />
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Media Preview
            </label>
             {mediaFile ? (
  mediaFile.type.startsWith("image/") ? (
    <img
      src={URL.createObjectURL(mediaFile)}
      alt="Preview"
      className="w-full max-w-md h-96 object-cover rounded-md shadow-md"
      onLoad={() => URL.revokeObjectURL(mediaFile)}
    />
  ) : mediaFile.type.startsWith("video/") ? (
    <video
      controls
      src={URL.createObjectURL(mediaFile)}
      className="w-full max-w-md h-96 object-cover rounded-md shadow-md"
      onLoadedData={() => URL.revokeObjectURL(mediaFile)}
    />
  ) : (
    <div className="text-gray-400">Unsupported file type</div>
  )
) : (
  <div className="w-full max-w-md h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
    No file selected
  </div>
)}

          </div> 
        </div>
      </div>
    </>
  );
};

export default AddBanner;
