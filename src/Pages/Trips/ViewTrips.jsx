import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { FaInfoCircle, FaClipboardList } from "react-icons/fa";
import DateFormatter from "../../Services/DateFormatter";
import StatusClassMap from "../../Services/StatusClassMap";
import TripServices from "./TripsServices";

const renderField = (field) => {
  if (Array.isArray(field)) {
    return field.length ? field.join(", ") : "N/A";
  }
  if (typeof field === "object" && field !== null) {
    // If object, stringify or customize this rendering as needed
    return JSON.stringify(field);
  }
  return field || "N/A";
};

const ViewTrips = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const data = await TripServices.get(id);

        // Map all the fields explicitly if needed
        const mappedTrip = {
          id: data.id,
          title: data.title,
          description: data.description,
          hilights: data.hilights,
          includes: data.includes,
          excludes: data.excludes,
          faqs: data.faqs,
          tags: data.tags,
          trip_types: data.trip_types,
          trip_activity: data.trip_activity,
          media_urls: data.media_urls,
          status: data.status,
          created_at: data.created_at,
          updated_at: data.updated_at,
          parent_id: data.parent_id,
        };

        setTrip(mappedTrip);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Trip:", error);
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-xl font-semibold text-gray-600">
          Loading Trip...
        </div>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="lg:ml-32 mx-auto p-6 text-center text-red-500 font-semibold flex items-center justify-center gap-2">
          <FaInfoCircle className="text-2xl" />
          Trip not found.
        </div>
      </>
    );
  }

  const renderMedia = () => {
    if (trip.media_urls) {
      if (/\.(mp4|webm|ogg)$/i.test(trip.media_urls)) {
        return (
          <video
            controls
            className="rounded-lg object-cover shadow-md max-h-[400px] w-full border"
          >
            <source src={trip.media_urls} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else if (/\.(jpeg|jpg|gif|png|webp)$/i.test(trip.media_urls)) {
        return (
          <img
            src={trip.media_urls}
            alt={trip.title}
            className="rounded-lg object-cover shadow-md max-h-[400px] w-full border"
          />
        );
      }
    }

    return (
      <img
        src="/placeholder.jpg"
        alt="Placeholder"
        className="rounded-lg shadow-md max-h-[400px] w-full border"
      />
    );
  };

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
              View Trip Details
            </h2>
          </div>

          {/* Media */}
          <div className="flex justify-center mb-10">{renderMedia()}</div>

          {/* Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700 text-xs lg:text-lg mb-10">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-40">ID:</span>
                <span>{trip.id}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Title:</span>
                <span>{trip.title}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Description:</span>
                <span>{renderField(trip.description)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Highlights:</span>
                <span>{renderField(trip.hilights)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Includes:</span>
                <span>{renderField(trip.includes)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Excludes:</span>
                <span>{renderField(trip.excludes)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">FAQs:</span>
                <span>{renderField(trip.faqs)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Tags:</span>
                <span>{renderField(trip.tags)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Types:</span>
                <span>{renderField(trip.trip_types)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Activity:</span>
                <span>{renderField(trip.trip_activity)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Parent Id:</span>
                <span>{renderField(trip.parent_id)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Created At:</span>
                <span>{DateFormatter.formatDate(trip.created_at)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Updated At:</span>
                <span>{DateFormatter.formatDate(trip.updated_at)}</span>
              </div>
            </div>

            <div className="flex items-start lg:items-center gap-3 lg:mt-4">
              <span className="font-semibold mt-2">Status:</span>
              <span
                className={`lg:px-4 px-2 py-2 lg:mt-2 rounded-full lg:text-sm font-medium ${StatusClassMap.getClass(
                  trip.status
                )}`}
              >
                {trip.status}
              </span>
            </div>
          </div>

          {/* Full Description */}
          {trip.description && (
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FaClipboardList className="text-lg text-gray-700" />
                <h3 className="lg:text-xl text-lg font-semibold text-gray-800">
                  Full Description
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{trip.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTrips;
