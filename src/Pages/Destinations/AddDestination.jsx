import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useAlert } from "../../Context/AlertContext/AlertContext";
import DestinationServices from "./DestinationServices";

const AddDestination = () => {
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState([]);

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Fetch destinations to populate dropdown
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await DestinationServices.getAll("", "", 1, "");
        setDestination(response.Destinations || []);
      } catch (error) {
        console.error("Failed to fetch destinations", error);
        setDestination([]);
      }
    };

    fetchDestinations();
  }, []);

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
      parent_id: parentId || null,
      status,
      media: mediaFile,
    };

    const result = await DestinationServices.add(data);

    setLoading(false);

    if (result) {
      showAlert("Destination added successfully!");
      navigate("/destinations");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-80 p-4 max-w-5xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center font-slab">
          Add New Destination
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title <span className="text-red-600">*</span>
              </label>
              <input
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
            </div>

            {/* Parent Destination Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Parent Destination
              </label>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None</option>
                {destination.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary text-white lg:px-6 px-3 lg:py-3 py-2 rounded-lg font-semibold transition duration-200 ${
                  loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {loading ? "Adding Destination..." : "Add Destination"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/destinations")}
                className="border lg:px-6 px-3 lg:py-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Media Upload Preview */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 border rounded-lg">
            <input
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

export default AddDestination;
