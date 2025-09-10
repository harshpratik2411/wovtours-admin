import React, { useEffect, useState } from "react";
import { FaEye, FaEnvelope } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import TripEnquiryServices from "./TripEnquiryServices";
import { FiSearch } from "react-icons/fi";

const TripEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnquiries = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const result = await TripEnquiryServices.getAll(page);
      setEnquiries(result.enquiries || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError("Failed to fetch enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(currentPage);
  }, [currentPage]);

  const renderMedia = (enquiry) => {
    const url =
      enquiry?.trip?.media_urls && enquiry.trip.media_urls.length > 0
        ? enquiry.trip.media_urls[0].media
        : null;

    if (!url) {
      return (
        <img
          src="/placeholder.jpg"
          alt="No media"
          className="h-12 w-16 object-cover rounded-md"
        />
      );
    }

    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return (
        <img
          src={url}
          alt="media"
          className="h-12 w-16 object-cover rounded-md"
        />
      );
    }

    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={url}
          className="h-12 w-16 object-cover rounded-md"
          controls
        />
      );
    }

    return (
      <img
        src="/placeholder.jpg"
        alt="Unsupported"
        className="h-12 w-16 object-cover rounded-md"
      />
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 className="lg:ml-72 text-center lg:-mt-0 -mt-6 font-rubik text-3xl font-bold">
        Trip Enquiries
      </h1>
      <div className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-6">
        {loading && (
          <p className="text-center text-gray-500">Loading enquiries...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && enquiries.length === 0 && (
          <p className="text-center text-gray-500">No enquiries found.</p>
        )}

        {!loading && enquiries.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden sm:table w-full">
              <div className="relative w-full sm:w-auto">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-full sm:w-52"
                />
              </div>
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 font-semibold uppercase border-b">
                  <tr>
                    <th className="py-2">Trip Media</th>
                    <th className="py-2">Trip Name</th>
                    <th className="py-2">User Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{renderMedia(enquiry)}</td>
                      <td className="py-3">{enquiry.trip?.title || "N/A"}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              enquiry.name
                            )}&background=0D8ABC&color=fff&size=32`}
                            alt={enquiry.name}
                            className="w-8 h-8 rounded-full"
                          />
                          {enquiry.name}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {enquiry.email}
                          <a
                            href={`mailto:${enquiry.email}?subject=Regarding your query : ${enquiry.subject}`}
                            title="Send Email"
                            className="text-blue-600 hover:text-blue-800 text-lg"
                          >
                            <FaEnvelope />
                          </a>
                        </div>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="text-blue-500 hover:underline flex items-center gap-1"
                        >
                          <FaEye className="text-blue-800" /> Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="border rounded-lg bg-gray-50 p-4 shadow"
                >
                  <div className="flex gap-3 mb-2">
                    {renderMedia(enquiry)}
                    <div>
                      <div className="flex -mt-4 items-center gap-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            enquiry.name
                          )}&background=0D8ABC&color=fff&size=40`}
                          alt={enquiry.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="mt-3">
                            <p className="font-semibold  text-lg">
                              {enquiry.name}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            {enquiry.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(enquiry.created_at).toLocaleString()}
                          </p>
                          <a
                            href={`mailto:${enquiry.email}`}
                            title="Send Email"
                            className="text-blue-600 flex hover:text-blue-800 text-base"
                          >
                            <FaEnvelope />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="text-blue-500 text-sm mt-2 hover:underline flex items-center gap-1"
                  >
                    <FaEye className="text-blue-800" /> Preview
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === idx + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Modal */}
      {selectedEnquiry && (
       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-3xl relative transition-all duration-300 ease-in-out">
    {/* Close Button */}
    <button
      onClick={() => setSelectedEnquiry(null)}
      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-semibold transition-colors"
      aria-label="Close"
    >
      &times;
    </button>

    {/* Header */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-b-primary  pb-2">
      Enquiry Details
    </h2>

    {/* Media Preview */}
    <div className="w-full mb-6 rounded-lg overflow-hidden ">
      {renderMedia(selectedEnquiry)}
    </div>

    {/* Enquiry Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
      <div>
        <span className="font-semibold text-gray-900">Name:</span> {selectedEnquiry.name}
      </div>
      <div>
        <span className="font-semibold text-gray-900">Email:</span> {selectedEnquiry.email}
      </div>
      <div>
        <span className="font-semibold text-gray-900">Country:</span> {selectedEnquiry.country?.name || "N/A"}
      </div>
      <div>
        <span className="font-semibold text-gray-900">Contact:</span> {selectedEnquiry.mobile || "N/A"}
      </div>
      <div>
        <span className="font-semibold text-gray-900">Adults:</span> {selectedEnquiry.adult || 0}
      </div>
      <div>
        <span className="font-semibold  text-gray-900">Children:</span> {selectedEnquiry.children || 0}
      </div>
      <div className="sm:col-span-1 mt-1">
        <span className="font-semibold m text-gray-900">Subject:</span> {selectedEnquiry.subject || "N/A"}
      </div>
      <div className="sm:col-span-1">
        <span className="font-semibold text-gray-900">Message:</span>
        <p className="mt-1 text-gray-600 whitespace-pre-line">{selectedEnquiry.body || "N/A"}</p>
      </div>
      <div>
        <span className="font-semibold text-gray-900">Trip:</span> {selectedEnquiry.trip?.title || "N/A"}
      </div>
      <div>
        <span className="font-semibold text-gray-900">Package Price:</span> ₹{selectedEnquiry.trip?.new_price || "N/A"}
      </div>
      <div className="sm:col-span-2">
        <span className="font-semibold text-gray-900">Contacted On:</span>{" "}
        {new Date(selectedEnquiry.created_at).toLocaleString()}
      </div>
    </div>
  </div>
</div>

      )}
    </>
  );
};

export default TripEnquiry;
