import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { FaInfoCircle, FaClipboardList } from "react-icons/fa";
import DateFormatter from "../../Services/DateFormatter";
import StatusClassMap from "../../Services/StatusClassMap"; 
import CategoryServices from "./CategoryServices";
 
  

const ViewCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryServices.get(id);
        setCategory(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Category:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-xl font-semibold text-gray-600">
          Loading Category...
        </div>
      </>
    );
  }

  if (!category) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-red-500 font-semibold flex items-center justify-center gap-2">
          <FaInfoCircle className="text-2xl" />
          Category not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full -mt-5 lg:ml-32 mx-auto p-6 font-rubik bg-custom-gray min-h-screen">
        <div className="rounded-xl -mt-10 bg-white shadow-lg p-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-primary border-b pb-4">
            <FaInfoCircle className="text-3xl text-black" />
            <h2 className="lg:text-3xl text-2xl font-bold text-gray-800">
              View category Details
            </h2>
          </div>

          {/* Image */}
       <div className="flex justify-center mb-10">
  {category.media_url ? (
    category.media_url.match(/\.(mp4|webm|ogg)$/i) ? (
      <video
        controls
        className="rounded-lg  object-cover shadow-md max-h-[400px] w-full border"
      >
        <source src={category.media_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        src={category.media_url}
        alt={category.title}
        className="rounded-lg object-cover shadow-md max-h-[400px] w-full border"
      />
    )
  ) : (
    <img
      src="/placeholder.jpg"
      alt="Placeholder"
      className="rounded-lg  shadow-md max-h-[400px] w-full border"
    />
  )}
</div>



          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700 text-xs  lg:text-lg mb-10">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-40">Title:</span>
                <span>{category.title}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Description:</span>
                <span>{category.description || "N/A"}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Parent Id:</span>
                <span>{category.parent_id || "N/A"}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Created At:</span>
                <span>{DateFormatter.formatDate(category.created_at)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Updated At:</span>
                <span>{DateFormatter.formatDate(category.updated_at)}</span>
              </div>
            </div>

            <div className="flex  items-start lg:items-center gap-3 lg:mt-4 ">
              <span className="font-semibold mt-2">Status:</span>
              <span
                className={`lg:px-4 px-2  py-2 lg:mt-2  rounded-full lg:text-sm  font-medium ${StatusClassMap.getClass(
                category.status
                )}`}
              >
                {category.status}
              </span>
            </div>
          </div>

          {/* Full Description */}
          {category.description && (
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FaClipboardList className="text-lg text-gray-700" />
                <h3 className="lg:text-xl text-lg font-semibold text-gray-800">
                  banner Full Description
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {category.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewCategory;
