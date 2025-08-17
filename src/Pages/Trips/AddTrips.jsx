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
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tripTypeList, setTripTypeList] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);

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
        setTagList(tagRes.tags || []);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }

      try {
        const tripTypeRes = await TripTypeServices.getAll("", "", 1, "");
        console.log("Trip Types fetched successfully 1:", tripTypeRes.TripTypes);
        setTripTypeList(tripTypeRes.TripTypes || []);
      } catch (err) {
        console.error("Failed to fetch trip types", err);
      }
    };

    fetchData();
  }, []);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleTagSelect = (e) => {
  const value = parseInt(e.target.value); // convert to number
  if (value && !selectedTags.includes(value)) {
    setSelectedTags([...selectedTags, value]);
  }
};


  const removeTag = (id) => {
    setSelectedTags(selectedTags.filter((t) => t !== id));
  };

  const handleTripTypeSelect = (e) => {
    const value = parseInt(e.target.value);
    console.log("Selected Trip Type:", value);
    console.log("Type of Selected Trip Type:", typeof(value));
    
    if (value && !selectedTripTypes.includes(value)) {
      setSelectedTripTypes([...selectedTripTypes, value]);
    }
  };

  const removeTripType = (id) => {
    setSelectedTripTypes(selectedTripTypes.filter((t) => t !== id));
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
      tags: selectedTags,
      tripType: selectedTripTypes,
      status,
      media: mediaFiles,
    };

    console.log("Submitting trip data:", data);
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

            {/* Tag Selection (Multi-Select) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tags
              </label>
              <select
                onChange={handleTagSelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a tag</option>
                {tagList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>

              {/* Selected Tags */}
              <div className="flex flex-wrap mt-3 gap-2">
                {selectedTags.map((tagId) => {
                  const tag = tagList.find((t) => t.id === tagId);
                  return (
                    <span
                      key={tagId}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {tag ? tag.title : "Unknown Tag"}
                      <button
                        type="button"
                        onClick={() => removeTag(tagId)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Trip Type Selection (Multi-Select) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Trip Type
              </label>
              <select
                onChange={handleTripTypeSelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a trip type</option>
                {tripTypeList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>

              {/* Selected Trip Types */}
              <div className="flex flex-wrap mt-3 gap-2">
                {selectedTripTypes.map((typeId) => {
                  const type = tripTypeList.find((t) => t.id === typeId);
                  return (
                    <span
                      key={typeId}
                      className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {type ? type.title : "Unknown Type"}
                      <button
                        type="button"
                        onClick={() => removeTripType(typeId)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
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
 