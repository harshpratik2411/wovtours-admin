import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useAlert } from "../../Context/AlertContext/AlertContext";
import TripServices from "./TripsServices";
import TripTypeServices from "../TripType/TripTypeServices";
import TagServices from "../Tags/TagServices";
import DifficultiesServices from "../Difficulties/DifficultiesServices";
import CategoryServices from "../Category/CategoryServices";
import DestinationServices from "../Destinations/DestinationServices";
import PricingCatServices from "../PricingCategory/PricingCatServices";
import ActivityServices from "../Activities/ActivityServices";

const UpdateTrips = () => {
  const { id } = useParams(); // Get trip ID from URL
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [existingMedia, setExistingMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tripTypeList, setTripTypeList] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [destinationList, setDestinationList] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [pricingCategories, setPricingCategories] = useState([]);
  const [selectedPricingCategory, setSelectedPricingCategory] = useState(null);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [includes, setIncludes] = useState([""]);
  const [excludes, setExcludes] = useState([""]);

  useEffect(() => {
   const fetchTrip = async () => {
  try {
    const res = await TripServices.getAll("", "", 1, ""); // Optional pagination or query params
    const allTrips = res?.Trips || [];

    const trip = allTrips.find((t) => t.id === parseInt(id));

    if (trip) {
      setTitle(trip.title || "");
      setDescription(trip.description || "");
      setStatus(trip.status || "Active");
      setSelectedTags(trip.tag_ids || []);
      setSelectedTripTypes(trip.trip_type_ids || []);
      setSelectedActivities(trip.trip_activity_ids || []);
      setSelectedCategory(trip.category_id || null);
      setSelectedDestination(trip.destination_id || null);
      setSelectedPricingCategory(trip.pricing_category_id || null);
      setSelectedDifficulty(trip.difficulty_id || null);
      setIncludes(trip.includes?.length ? trip.includes : [""]);
      setExcludes(trip.excludes?.length ? trip.excludes : [""]);
     setExistingMedia(
  trip.media_urls?.map((item) => item.media) || []
);

    } else {
      showAlert("Trip not found");
    }
  } catch (err) {
    console.error("Error fetching trip", err);
    showAlert("Failed to load trip data");
  
};

    };

    const fetchMeta = async () => {
      try {
        const [tags, tripTypes, categories, destinations, pricing, difficulties, activities] =
          await Promise.all([
            TagServices.getAll("", "", 1, ""),
            TripTypeServices.getAll("", "", 1, ""),
            CategoryServices.getAll("", "", 1, ""),
            DestinationServices.getAll("", "", 1, ""),
            PricingCatServices.getAll("", "", 1, ""),
            DifficultiesServices.getAll("", "", 1, "", ""),
            ActivityServices.getAll("", "", 1, "")
          ]);

        setTagList(tags?.tags || []);
        setTripTypeList(tripTypes?.TripTypes || []);
        setCategory(categories?.Categories || []);
        setDestinationList(destinations?.Destinations || []);
        setPricingCategories(pricing?.PricingCategory || []);
        setDifficulties(difficulties?.difficulties || []);
        setActivityList(activities?.Activities || []);
      } catch (err) {
        console.error("Error fetching metadata", err);
      }
    };

    fetchTrip();
    fetchMeta();
  }, [id, showAlert]);
 
    const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

   const handleTagSelect = (e) => {
  const value = parseInt(e.target.value);
  if (value && !selectedTags.includes(value)) {
    setSelectedTags([...selectedTags, value]);
  }
};
  const handleTripTypeSelect = (e) => {
  const value = parseInt(e.target.value);
  if (value && !selectedTripTypes.includes(value)) {
    setSelectedTripTypes([...selectedTripTypes, value]);
  }
};

const handleActivitySelect = (e) => {
  const value = parseInt(e.target.value);
  if (value && !selectedActivities.includes(value)) {
    setSelectedActivities([...selectedActivities, value]);
  }
};

const handleCategorySelect = (e) => {
  setSelectedCategory(parseInt(e.target.value));
};
 const handlePricingCategorySelect = (e) => {
  setSelectedPricingCategory(parseInt(e.target.value));
};
 const handleDestinationSelect = (e) => {
  setSelectedDestination(parseInt(e.target.value));
};
 const handleDifficultySelect = (e) => {
  setSelectedDifficulty(parseInt(e.target.value));
};

  const removeTag = (id) => {
    setSelectedTags(selectedTags.filter((t) => t !== id));
  };

  const removeTripType = (id) => {
    setSelectedTripTypes(selectedTripTypes.filter((t) => t !== id));
  };

  const removeActivity = (id) => {
    setSelectedActivities(selectedActivities.filter((a) => a !== id));
  };

  const removeInclude = (index) => {
    const updatedIncludes = includes.filter((_, i) => i !== index);
    setIncludes(updatedIncludes.length ? updatedIncludes : [""]);
  };

  const removeExclude = (index) => {
    const updatedExcludes = excludes.filter((_, i) => i !== index);
    setExcludes(updatedExcludes.length ? updatedExcludes : [""]);
  };

  const handleIncludeChange = (index, value) => {
    const updated = [...includes];
    updated[index] = value;
    if (index === includes.length - 1 && value.trim() !== "") {
      updated.push("");
    }
    setIncludes(updated);
  };

  const handleExcludeChange = (index, value) => {
    const updated = [...excludes];
    updated[index] = value;
    if (index === excludes.length - 1 && value.trim() !== "") {
      updated.push("");
    }
    setExcludes(updated);
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
      tag_ids: selectedTags,
      trip_type_ids: selectedTripTypes,
      trip_activity_ids: selectedActivities,
      status,
      media: mediaFiles,
      category_id: selectedCategory,
      destination_id: selectedDestination,
      pricing_category_id: selectedPricingCategory,
      difficulty_id: selectedDifficulty,
      includes: includes.filter((i) => i.trim() !== ""),
      excludes: excludes.filter((e) => e.trim() !== ""),
    };

    try {
      const result = await TripServices.update(id, data);
      setLoading(false);

      if (result) {
        showAlert("Trip updated successfully!");
        navigate("/trips");
      }
    } catch (error) {
      setLoading(false);
      console.error("Update failed", error);
      showAlert("Failed to update trip");
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:ml-80 p-4 max-w-5xl mx-auto font-rubik">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center font-slab">
          Update Trip
        </h2>

        <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            {/* Reuse the same form controls from AddTrips, e.g.: */}
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

            <select
              value={selectedCategory || ""}
              onChange={handleCategorySelect}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            {/* Destination Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Destination
              </label>
              <select
                value={selectedDestination || ""}
                onChange={handleDestinationSelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a destination</option>
                {destinationList.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pricing Category
              </label>
              <select
                value={selectedPricingCategory || ""}
                onChange={handlePricingCategorySelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a pricing category</option>
                {pricingCategories.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={selectedDifficulty || ""}
                onChange={handleDifficultySelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a difficulty</option>
                {difficulties.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Activities
              </label>
              <select
                onChange={handleActivitySelect}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an activity</option>
                {activityList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>

              {/* Selected Activities */}
              <div className="flex flex-wrap mt-3 gap-2">
                {selectedActivities.map((activityId) => {
                  const activity = activityList.find(
                    (a) => a.id === activityId
                  );
                  return (
                    <span
                      key={activityId}
                      className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {activity ? activity.title : "Unknown Activity"}
                      <button
                        type="button"
                        onClick={() => removeActivity(activityId)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Includes
              </label>
              {includes.map((inc, index) => (
                <div key={index} className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => handleIncludeChange(index, e.target.value)}
                    placeholder="Enter include item"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {includes.length > 1 && inc.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => removeInclude(index)}
                      className="text-red-600 font-bold px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Excludes
              </label>
              {excludes.map((exc, index) => (
                <div key={index} className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    value={exc}
                    onChange={(e) => handleExcludeChange(index, e.target.value)}
                    placeholder="Enter exclude item"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {excludes.length > 1 && exc.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => removeExclude(index)}
                      className="text-red-600 font-bold px-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
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
                {loading ? "Updating Trip..." : "Update Trip"}
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
            {(existingMedia.length > 0 || mediaFiles.length > 0) ? (
              <div className="w-full max-w-md grid grid-cols-2 gap-4 overflow-auto max-h-96">
                {/* Existing media */}
                {existingMedia.map((fileUrl, idx) => (
                  <img
                    key={`existing-${idx}`}
                    src={fileUrl}
                    alt={`Existing Media ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-md shadow-md"
                  />
                ))}
                {/* New media */}
                {mediaFiles.map((file, idx) =>
                  file.type.startsWith("image/") ? (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`New Preview ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-md shadow-md"
                      onLoad={() => URL.revokeObjectURL(file)}
                    />
                  ) : (
                    <div
                      key={idx}
                      className="text-gray-400 border rounded-md p-4 flex items-center justify-center"
                    >
                      Unsupported file
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="w-full max-w-md h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                No media to show
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTrips;

