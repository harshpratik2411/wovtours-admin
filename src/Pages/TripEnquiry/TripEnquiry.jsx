import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import TripEnquiryServices from "./TripEnquiryServices";

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
    // media URL is inside enquiry.trip.media_urls[0].media
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
              <table className="w-full  text-sm text-left">
                <thead className="text-gray-500  font-semibold uppercase border-b">
                  <tr>
                    <th className="py-2">Media</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Trip Name</th>
                    <th className="py-2">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{renderMedia(enquiry)}</td>
                      <td className="py-3 mt-2 flex items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            enquiry.name
                          )}&background=0D8ABC&color=fff&size=32`}
                          alt={enquiry.name}
                          className="w-8 h-8  rounded-full"
                        />
                        {enquiry.name}
                      </td>
                      <td>{enquiry.email}</td>
                      {/* Trip title is inside enquiry.trip.title */}
                      <td>{enquiry.trip?.title || "N/A"}</td>
                      <td>
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
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            enquiry.name
                          )}&background=0D8ABC&color=fff&size=40`}
                          alt={enquiry.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold  text-lg">{enquiry.name}</p>
                          <p className="text-sm text-gray-600">{enquiry.email}</p>
                          {/* No contactedAt in your data, use created_at */}
                          <p className="text-xs text-gray-500">
                            {new Date(enquiry.created_at).toLocaleString()}
                          </p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white space-y-4 rounded-lg p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Enquiry Details</h2>
            <p>
              <strong>Name:</strong> {selectedEnquiry.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedEnquiry.email}
            </p>
            <p>
              <strong>Country:</strong> {selectedEnquiry.country?.name || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {selectedEnquiry.mobile || "N/A"}
            </p>
            <p>
              <strong>Adults:</strong> {selectedEnquiry.adult || 0}
            </p>
            <p>
              <strong>Children:</strong> {selectedEnquiry.children || 0}
            </p>
            <p>
              <strong>Subject:</strong> {selectedEnquiry.subject || "N/A"}
            </p>
            <p>
              <strong>Message:</strong> {selectedEnquiry.body || "N/A"}
            </p>
            <p>
              <strong>Trip:</strong> {selectedEnquiry.trip?.title || "N/A"}
            </p>
            <p>
              <strong>Package Price:</strong> ₹{selectedEnquiry.trip?.new_price || "N/A"}
            </p>
            <p>
              <strong>Contacted On:</strong>{" "}
              {new Date(selectedEnquiry.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TripEnquiry;
