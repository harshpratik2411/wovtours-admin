import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityServices from "./ActivityServices"; 
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from "../../Components/Siderbar/Sidebar"; 
import { useAlert } from "../../Context/AlertContext/AlertContext";


const AddActivity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaId, setMediaId] = useState("");
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
      description,
      media_id: mediaId,
      status,
      media: mediaFile,
    };

    const result = await ActivityServices.add(data);

    setLoading(false);

    if (result) {
      showAlert("Activity added successfully!");
      navigate("/activities");
    }
  };

  return ( 
    <> 
    <Navbar/>
    <Sidebar/>
    
    <div className="lg:ml-80 p-4 max-w-5xl mx-auto font-rubik">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center font-slab">
        Add New Activity
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

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Media ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Media ID
            </label>
            <input
              id="mediaId"
              type="text"
              value={mediaId}
              onChange={(e) => setMediaId(e.target.value)}
              placeholder="Enter media ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              className={`bg-primary text-white px-6 py-3 rounded-lg font-semibold transition duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Adding Activity..." : "Add Activity"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/activities")}
              className="border px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
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
          {mediaFile && mediaFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(mediaFile)}
              alt="Preview"
              className="w-full max-w-md h-auto object-cover rounded-md shadow-md"
              onLoad={() => URL.revokeObjectURL(mediaFile)}
            />
          ) : (
            <div className="w-full max-w-md h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              No image selected
            </div>
          )}
        </div>
      </div>
    </div> 
  </>
  );
};

export default AddActivity;

