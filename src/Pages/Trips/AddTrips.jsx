import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useAlert } from "../../Context/AlertContext/AlertContext";
import TripServices from "./TripsServices";
import TagServices from "../../Pages/Tags/TagServices";
import TripTypeServices from "../../Pages/TripType/TripTypeServices";
import CategoryServices from "../../Pages/Category/CategoryServices";
import DestinationServices from "../../Pages/Destinations/DestinationServices";
import PricingCatServices from "../../Pages/PricingCategory/PricingCatServices";
import DifficultiesServices from "../../Pages/Difficulties/DifficultiesServices";
import ActivityServices from "../../Pages/Activities/ActivityServices";

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
  const [oldPrice, setOldPrice] = useState("");
const [newPrice, setNewPrice] = useState(""); 
const [highlights, setHighlights] = useState([""]);  




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
        console.log(
          "Trip Types fetched successfully 1:",
          tripTypeRes.TripTypes
        );
        setTripTypeList(tripTypeRes.TripTypes || []);
      } catch (err) {
        console.error("Failed to fetch trip types", err);
      }

      try {
        const CategoriesRes = await CategoryServices.getAll("", "", 1, "");
        console.log(
          "Category fetched successfully 1:",
          CategoriesRes.Categories
        );
        setCategory(CategoriesRes.Categories || []);
      } catch (err) {
        console.error("Failed to fetch categories types", err);
      }
      try {
        const destinationRes = await DestinationServices.getAll("", "", 1, "");
        console.log("Destinations fetched:", destinationRes.Destinations);
        setDestinationList(destinationRes.Destinations || []);
      } catch (err) {
        console.error("Failed to fetch destinations", err);
      }
      try {
        const pricingCatRes = await PricingCatServices.getAll("", "", 1, "");
        console.log(
          "Pricing Categories fetched:",
          pricingCatRes.PricingCategory
        );
        setPricingCategories(pricingCatRes.PricingCategory || []);
        console.log(
          "Pricing Categories fetched successfully:",
          pricingCatRes.PricingCategory
        );
      } catch (err) {
        console.error("Failed to fetch pricing categories", err);
      }
      try {
        const difficultyRes = await DifficultiesServices.getAll(
          "",
          "",
          1,
          "",
          ""
        );
        console.log("Difficulties fetched:", difficultyRes.difficulties);
        setDifficulties(difficultyRes.difficulties || []);
      } catch (err) {
        console.error("Failed to fetch difficulties", err);
      }

      try {
        const activityRes = await ActivityServices.getAll("", "", 1, "");
        console.log("Activities fetched:", activityRes.Activities);
        setActivityList(activityRes.Activities || []);
      } catch (err) {
        console.error("Failed to fetch activities", err);
      }
    };

    fetchData();
  }, []);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleTagSelect = (e) => {
    const value = parseInt(e.target.value);
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
    console.log("Type of Selected Trip Type:", typeof value);

    if (value && !selectedTripTypes.includes(value)) {
      setSelectedTripTypes([...selectedTripTypes, value]);
    }
  };

  const removeTripType = (id) => {
    setSelectedTripTypes(selectedTripTypes.filter((t) => t !== id));
  };

  const handleCategorySelect = (e) => {
    const value = parseInt(e.target.value);
    setSelectedCategory(value || null);
  };
  const handleDestinationSelect = (e) => {
    const value = parseInt(e.target.value);
    setSelectedDestination(value || null);
  };
  const handlePricingCategorySelect = (e) => {
    const value = parseInt(e.target.value);
    setSelectedPricingCategory(value || null);
  };
  const handleDifficultySelect = (e) => {
    const value = parseInt(e.target.value);
    setSelectedDifficulty(value || null);
  };
  const handleActivitySelect = (e) => {
    const value = parseInt(e.target.value);
    if (value && !selectedActivities.includes(value)) {
      setSelectedActivities([...selectedActivities, value]);
    }
  };

  const removeActivity = (id) => {
    setSelectedActivities(selectedActivities.filter((a) => a !== id));
  };

  const handleIncludeChange = (index, value) => {
    const updatedIncludes = [...includes];
    updatedIncludes[index] = value;
    setIncludes(updatedIncludes);

    // Add new field if last one is not empty
    if (index === includes.length - 1 && value.trim() !== "") {
      setIncludes([...updatedIncludes, ""]);
    }
  };

  const handleExcludeChange = (index, value) => {
    const updatedExcludes = [...excludes];
    updatedExcludes[index] = value;
    setExcludes(updatedExcludes);

    if (index === excludes.length - 1 && value.trim() !== "") {
      setExcludes([...updatedExcludes, ""]);
    }
  };

  const removeInclude = (index) => {
    const updatedIncludes = includes.filter((_, i) => i !== index);
    setIncludes(updatedIncludes.length ? updatedIncludes : [""]);
  };

  const removeExclude = (index) => {
    const updatedExcludes = excludes.filter((_, i) => i !== index);
    setExcludes(updatedExcludes.length ? updatedExcludes : [""]);
  }; 
    
   const handleHighlightChange = (index, value) => {
  const updatedHighlights = [...highlights];
  updatedHighlights[index] = value;
  setHighlights(updatedHighlights);

  if (index === highlights.length - 1 && value.trim() !== "") {
    setHighlights([...updatedHighlights, ""]);
  }
};

const removeHighlight = (index) => {
  const updatedHighlights = highlights.filter((_, i) => i !== index);
  setHighlights(updatedHighlights.length ? updatedHighlights : [""]);
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
     old_price: parseFloat(oldPrice) || 0,
     new_price: parseFloat(newPrice) || 0, 
     highlights: highlights.filter((h) => h.trim() !== ""),

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
              <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Highlights
  </label>
  {highlights.map((highlight, index) => (
    <div key={index} className="flex gap-2 items-center mb-2">
      <input
        type="text"
        value={highlight}
        onChange={(e) =>
          handleHighlightChange(index, e.target.value)
        }
        placeholder="Enter highlight point"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
      />
      {highlights.length > 1 && highlight.trim() !== "" && (
        <button
          type="button"
          onClick={() => removeHighlight(index)}
          className="text-red-600 font-bold px-2"
        >
          ×
        </button>
      )}
    </div>
  ))}
</div>

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
{/* Old Price */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Old Price
  </label>
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
    <input
      type="number"
      step="0.01"
      value={oldPrice}
      onChange={(e) => setOldPrice(e.target.value)}
      placeholder="Enter old price"
      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>

{/* New Price */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    New Price
  </label>
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
    <input
      type="number"
      step="0.01"
      value={newPrice}
      onChange={(e) => setNewPrice(e.target.value)}
      placeholder="Enter new price"
      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div> 
</div>

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
            {/* Old Price */}

          {/* Media Upload Preview */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 border rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              className="mb-4 w-full max-w-md"
              multiple
              required
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