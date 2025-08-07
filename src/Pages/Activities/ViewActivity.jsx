import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import ActivityServices from "./ActivityServices";
import { FaInfoCircle, FaClipboardList } from "react-icons/fa";
import DateFormatter from "../../Services/DateFormatter";
import StatusClassMap from "../../Services/StatusClassMap";

const ViewActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const data = await ActivityServices.get(id);
        setActivity(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-xl font-semibold text-gray-600">
          Loading activity...
        </div>
      </>
    );
  }

  if (!activity) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-red-500 font-semibold flex items-center justify-center gap-2">
          <FaInfoCircle className="text-2xl" />
          Activity not found.
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
              View Activity Details
            </h2>
          </div>

          {/* Image */}
         <div className="flex justify-center mb-10">
  <img
    src={activity.media_url || "/placeholder.jpg"}
    alt={activity.title}
    className="rounded-lg shadow-md max-h-[400px] w-full  border"
  />
</div>


          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700 text-xs  lg:text-lg mb-10">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-40">Title:</span>
                <span>{activity.title}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Description:</span>
                <span>{activity.description || "N/A"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Media ID:</span>
                <span>{activity.media_id || "N/A"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Created At:</span>
                <span>{DateFormatter.formatDate(activity.created_at)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Updated At:</span>
                <span>{DateFormatter.formatDate(activity.updated_at)}</span>
              </div>
            </div>

            <div className="flex items-start lg:items-center gap-3 mt-4 lg:mt-0">
              <span className="font-semibold mt-1">Status:</span>
              <span
                className={`lg:px-4 px-2 py-2 -mt-1 rounded-full lg:text-sm  font-medium ${StatusClassMap.getClass(
                  activity.status
                )}`}
              >
                {activity.status}
              </span>
            </div>
          </div>

          {/* Full Description */}
          {activity.full_description && (
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FaClipboardList className="text-lg text-gray-700" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Activity Full Description
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {activity.full_description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewActivity;
