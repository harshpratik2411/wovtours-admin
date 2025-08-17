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
    return field.length ? field.join(", ") : "none";
  }
  if (typeof field === "object" && field !== null) {
    return JSON.stringify(field);
  }
  return field || "none";
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
        setTrip(data);
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
    if (!trip.media_urls || trip.media_urls.length === 0) {
      return (
        <img
          src="/placeholder.jpg"
          alt="Placeholder"
          className="rounded-lg shadow-md max-h-[400px] w-full border"
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {trip.media_urls.map((mediaObj, index) => {
          const media = mediaObj.media;
          const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
          const isImage = /\.(jpeg|jpg|gif|png|webp)$/i.test(media);

          return (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md aspect-[4/3] w-full border bg-black flex items-center justify-center"
            >
              {isVideo ? (
                <video controls className="object-cover w-full h-full">
                  <source src={media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : isImage ? (
                <img
                  src={media}
                  alt={`Media ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  Unsupported file type
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full -mt-5 lg:ml-32 mx-auto p-6 font-rubik bg-custom-gray min-h-screen">
        <div className="rounded-xl -mt-10 bg-white shadow-lg p-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 border-primary border-b pb-4">
            <FaInfoCircle className="text-3xl text-black" />
            <h2 className="lg:text-3xl text-2xl font-bold text-gray-800">
              View Trip Details
            </h2>
          </div>

          <div className="flex justify-center mb-10">{renderMedia()}</div>

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
  <span className="font-semibold w-40">Category:</span>
  <span>{trip.category?.title || "None"}</span>
</div>
             <div className="flex gap-3">
  <span className="font-semibold w-40">Destination:</span>
  <span>{trip.destination?.title || "None"}</span>
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
                {trip.tags.map((tags, index) => (
                  <span key={index}>{renderField(tags.title)}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Types:</span>
                {trip.trip_types.map((trip_type, index) => (
                  <span key={index}>{renderField(trip_type.title)}</span>
                ))}
              </div>

              {/* <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Types:</span>
                {trip.category.map((category, index) => (
                  <span key={index}>{renderField(category.title)}</span>
                ))}
              </div> */}
            
           
              {/* <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Activity:</span>
                {trip.trip_activity.map((activity, index) => (
                  <span key={index}>{renderField(activity.title)}</span>
                ))}
              </div> */}

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

          {trip.description && (
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center gap-3 mb-2">
                <FaClipboardList className="text-lg text-gray-700" />
                <h3 className="lg:text-xl text-lg font-semibold text-gray-800">
                  Full Description
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {trip.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTrips;
