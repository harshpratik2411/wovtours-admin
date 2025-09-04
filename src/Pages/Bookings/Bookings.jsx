import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import BookingServices from "./BookingServices";
import { FiSearch } from "react-icons/fi";
import DateFormatter from '../../Services/DateFormatter'
import StatusClassMap from "../../Services/StatusClassMap";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const result = await BookingServices.getAll(page);
      setBookings(result.bookings || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const renderMedia = (booking, fullWidth = false) => {
    const url =
      booking?.trip?.media_urls && booking.trip.media_urls.length > 0
        ? booking.trip.media_urls[0].media
        : null;

    const className = fullWidth
      ? "w-full h-40 object-cover rounded-md"
      : "h-12 w-16 object-cover rounded-md";

    if (!url) {
      return <img src="/placeholder.jpg" alt="No media" className={className} />;
    }

    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return <img src={url} alt="media" className={className} />;
    }

    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return <video src={url} className={className} controls />;
    }

    return <img src="/placeholder.jpg" alt="Unsupported" className={className} />;
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 className="lg:ml-72 text-center lg:-mt-0 -mt-6 font-rubik text-3xl font-bold">
        Bookings
      </h1>
      <div className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-6">
        {loading && <p className="text-center text-gray-500">Loading bookings...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}

        {!loading && bookings.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden sm:table w-full">
              <div className="relative w-full sm:w-auto mb-4">
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
                    <th className="py-2 pl-2">Media</th>
                    <th className="py-2 ">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Trip Name</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{renderMedia(booking)}</td>
                      <td className="py-3">
                        {booking.customer
                          ? `${booking.customer.first_name} ${booking.customer.last_name}`
                          : "N/A"}
                      </td>
                      <td className="py-3">{booking.customer?.email || "N/A"}</td>
                      <td className="py-3">{booking.trip?.title || "N/A"}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${StatusClassMap.getClass(
                            booking.trip?.status
                          )}`}
                        >
                          {booking.trip?.status || "N/A"}
                        </span>
                      </td>
                      <td className="py-3">
                        {DateFormatter.formatDate(booking.date)}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
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
            <div className="sm:hidden space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg bg-gray-50 p-5 shadow flex flex-col gap-4"
                >
                  <div>{renderMedia(booking, true)}</div>
                  <div className="flex flex-col gap-1 text-sm text-gray-800">
                    <p><span className="font-semibold">Name:</span> {booking.customer ? `${booking.customer.first_name} ${booking.customer.last_name}` : "N/A"}</p>
                    <p><span className="font-semibold">Email:</span> {booking.customer?.email || "N/A"}</p>
                    <p><span className="font-semibold">Trip:</span> {booking.trip?.title || "N/A"}</p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${StatusClassMap.getClass(booking.trip?.status)}`}>
                        {booking.trip?.status || "N/A"}
                      </span>
                    </p>
                    <p><span className="font-semibold">Date:</span> {DateFormatter.formatDate(booking.date)}</p>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-blue-500 text-sm mt-2 hover:underline flex items-center gap-1"
                    >
                      <FaEye className="text-blue-800" /> Preview
                    </button>
                  </div>
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
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 sm:p-8">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl relative transition-all duration-300 ease-in-out overflow-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-semibold transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Booking Details
            </h2>

            <div className="w-full mb-6 rounded-lg overflow-hidden max-h-60 sm:max-h-72">
              {renderMedia(selectedBooking)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {selectedBooking.customer
                  ? `${selectedBooking.customer.first_name} ${selectedBooking.customer.last_name}`
                  : "N/A"}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedBooking.customer?.email || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedBooking.customer?.phone || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Country:</span>{" "}
                {selectedBooking.customer?.country?.name || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Persons:</span>{" "}
                {selectedBooking.person}
              </div>
              <div>
                <span className="font-semibold">Date:</span>{" "}
                {DateFormatter.formatDate(selectedBooking.date)}
              </div>
              <div>
                <span className="font-semibold">City:</span>{" "}
                {selectedBooking.city || "N/A"}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold">Address:</span>{" "}
                {selectedBooking.address || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Trip:</span>{" "}
                {selectedBooking.trip?.title || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full ml-2 text-sm font-medium ${StatusClassMap.getClass(
                    selectedBooking.trip?.status
                  )}`}
                >
                  {selectedBooking.trip?.status || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Price:</span> ₹
                {selectedBooking.trip?.new_price || "N/A"}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold">Booked On:</span>{" "}
                {DateFormatter.formatDate(selectedBooking.created_at)}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold">Updated On:</span>{" "}
                {DateFormatter.formatDate(selectedBooking.updated_at)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
