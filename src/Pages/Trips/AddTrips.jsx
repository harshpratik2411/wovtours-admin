import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useAlert } from "../../Context/AlertContext/AlertContext";
import TripServices from "./TripsServices";
import TagServices from "../../Pages/Tags/TagServices";
import TripTypeServices from "../../Pages/TripType/TripTypeServices";

const AddTrips = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState(false);
  const [tripType, setTripType] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsRes = await TripServices.getAll("", "", 1, "");
        setTrips(tripsRes.Trips || []);
      } catch (err) {
        console.error("Failed to fetch trips", err);
      }

      try {
        const tagRes = await TagServices.getAll("", "", 1, "");
        console.log("REsponse = ", tagRes.tags);
        console.log("REsponse = ", tagRes.tags || []);

        setTagList(tagRes.tags || []);
        console.log("After setting = ", tagList);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };

    fetchData();
  }, []);
  // Handle adding multiple images one by one
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

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
      tag: tagList,
      status,
      media: mediaFiles, // Send all selected files
    };

    const result = await TripServices.add(data);

    setLoading(false);

    if (result) {
      showAlert("Trip added successfully!");
      navigate("/trips");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-80 p-4 max-w-5xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center font-slab">
          Add New Trip
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
                Tags
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None</option>
                {tagList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
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
                {loading ? "Adding Trip..." : "Add Trip"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/trips")}
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
              accept="image/*"
              onChange={handleMediaChange}
              className="mb-4 w-full max-w-md"
              multiple
            />
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Media Preview
            </label>
            {mediaFiles.length > 0 ? (
              <div className="w-full max-w-md grid grid-cols-2 gap-4 overflow-auto max-h-96">
                {mediaFiles.map((file, idx) =>
                  file.type.startsWith("image/") ? (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-md shadow-md"
                      onLoad={() => URL.revokeObjectURL(file)}
                    />
                  ) : (
                    <div
                      key={idx}
                      className="text-gray-400 border rounded-md p-4 flex items-center justify-center"
                    >
                      Unsupported file type
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="w-full max-w-md h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                No files selected
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTrips;
