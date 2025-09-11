import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { FaInfoCircle, FaClipboardList, FaCalendarAlt, FaQuestionCircle, FaMapMarkerAlt, FaClock, FaRoute } from "react-icons/fa";
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
  const [activeTab, setActiveTab] = useState("general");

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

          {/* Media Display moved to top */}
          <div className="flex justify-center mb-10">{renderMedia()}</div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`py-3 px-6 text-sm font-medium ${activeTab === "general"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
              `}
            >
              General Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("extra")}
              className={`py-3 px-6 text-sm font-medium ${activeTab === "extra"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
              `}
            >
              Extra Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("faqs")}
              className={`py-3 px-6 text-sm font-medium ${activeTab === "faqs"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
              `}
            >
              FAQs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("itinerary")}
              className={`py-3 px-6 text-sm font-medium ${activeTab === "itinerary"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
              `}
            >
              Itinerary
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Title:</span>
                <span>{trip.title || "Untitled"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Description:</span>
                <span>{renderField(trip.description)}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Places covered:</span>
                <span>{renderField(trip.places_covered)}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Meeting Point:</span>
                <span>{renderField(trip.meeting_point)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Status:</span>
                <span
                  className={`lg:px-4 px-2 py-2 lg:mt-2 rounded-full lg:text-sm font-medium ${StatusClassMap.getClass(
                    trip.status
                  )}`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Old Price:</span>
                <span>{DateFormatter.formatCurrency(trip.old_price)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">New Price:</span>
                <span>{DateFormatter.formatCurrency(trip.new_price)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Duration:</span>
                <span>{renderField(trip.duration)}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Duration Unit:</span>
                <span>{renderField(trip.duration_unit)}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Duration Note:</span>
                <span>{renderField(trip.duration_note)}</span>
              </div>
            </div>
          )}

          {activeTab === "extra" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-semibold w-40">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {trip.tags?.length ? (
                    trip.tags.map((tag, index) => (
                      <span key={index}>{renderField(tag.title)}</span>
                    ))
                  ) : (
                    <span>None</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Types:</span>
                {trip.trip_types.map((trip_type, index) => (
                  <span key={index}>{renderField(trip_type.title)}</span>
                ))}
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
                <span className="font-semibold w-40">Pricing Category:</span>
                <span>{trip.pricing_category.title || "None"}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Difficulty:</span>
                <span>{trip.difficulty.title || "None"}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Trip Activity:</span>
                {trip.trip_activity.map((trip_activity, index) => (
                  <span key={index}>{renderField(trip_activity.title)}</span>
                ))}
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-semibold w-40">Highlights:</span>
                <ul className="flex flex-col gap-1 list-disc pl-5">
                  {trip.highlights?.map((highlight, index) => (
                    <li key={index} className="font-medium text-gray-800">
                      {highlight}
                    </li>
                  ))}
                </ul>
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
                <span className="font-semibold w-40">Minimum Pax:</span>
                <span>{renderField(trip.min_pax)}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-40">Maximum Pax:</span>
                <span>{renderField(trip.max_pax)}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold w-40">Special Note:</span>
                <span>{renderField(trip.special_note)}</span>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="font-semibold w-40 flex items-center gap-2">
                  <FaQuestionCircle className="text-blue-600" />
                  FAQs:
                </span>
                <div className="flex flex-col gap-3 w-full">
                  {trip.faqs?.length ? (
                    trip.faqs.map((faq, index) => (
                      <div key={index} className="border border-blue-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">Q</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 mb-2 text-lg">
                              {faq.q}
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold text-sm">A</span>
                              </div>
                              <div className="text-gray-700 leading-relaxed">
                                {faq.a}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                      No FAQs available for this trip
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "itinerary" && (
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="font-semibold w-40 flex items-center gap-2">
                  <FaRoute className="text-green-600" />
                  Itinerary:
                </span>
                <div className="flex flex-col gap-4 w-full">
                  {trip.itinerary?.length ? (
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-green-300 to-green-200"></div>
                      
                      {trip.itinerary.map((item, index) => (
                        <div key={index} className="relative flex items-start gap-4 pb-6 last:pb-0">
                          {/* Timeline dot */}
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg z-10">
                            <FaCalendarAlt className="text-white text-sm" />
                          </div>
                          
                          {/* Content card */}
                          <div className="flex-1 bg-white border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full border border-green-200">
                                Day {item.day_number}
                              </span>
                              <div className="flex items-center gap-2 text-green-600">
                                <FaMapMarkerAlt className="text-xs" />
                                <span className="text-xs font-medium">ITINERARY</span>
                              </div>
                            </div>
                            
                            <h4 className="font-bold text-gray-800 text-lg mb-3 leading-tight">
                              {item.title}
                            </h4>
                            
                            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-400">
                              <p className="text-gray-700 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
                      <FaRoute className="text-4xl text-gray-400 mx-auto mb-3" />
                      <p>No itinerary available for this trip</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Old content removed after tab implementation */}
          <div className="flex gap-3">
            <span className="font-semibold w-40">Created At:</span>
            <span>{DateFormatter.formatDate(trip.created_at)}</span>
          </div>

          <div className="flex gap-3">
            <span className="font-semibold w-40">Updated At:</span>
            <span>{DateFormatter.formatDate(trip.updated_at)}</span>
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
