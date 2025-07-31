import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";

const bookingData = [
  {
    id: 1,
    name: "Alice Johnson",
    bookingDate: "2025-07-20",
    tripDate: "2025-08-01",
    tripName: "Beach Paradise",
    travellers: 2,
    status: "Confirmed",
    amount: 1200,
  },
  {
    id: 2,
    name: "Bob Smith",
    bookingDate: "2025-07-18",
    tripDate: "2025-08-05",
    tripName: "Mountain Escape",
    travellers: 4,
    status: "Pending",
    amount: 1800,
  },
  {
    id: 3,
    name: "Charlie Brown",
    bookingDate: "2025-07-15",
    tripDate: "2025-08-10",
    tripName: "City Lights",
    travellers: 1,
    status: "Cancelled",
    amount: 0,
  },
  {
    id: 4,
    name: "Diana Prince",
    bookingDate: "2025-07-10",
    tripDate: "2025-08-03",
    tripName: "Safari Adventure",
    travellers: 3,
    status: "Confirmed",
    amount: 2100,
  },
];

const Booking = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 className="lg:ml-72 text-center font-rubik text-3xl font-bold mt-6">
        Bookings
      </h1>
      <div className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-8">
        {/* Desktop Table */}
        <div className="overflow-x-auto hidden sm:table w-full">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 uppercase border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Booking Date</th>
                <th className="py-2">Trip Date</th>
                <th className="py-2">Trip Name</th>
                <th className="py-2">Travellers</th>
                <th className="py-2">Status</th>
                <th className="py-2">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-medium text-gray-800 flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        booking.name
                      )}&background=0D8ABC&color=fff&size=32`}
                      alt={booking.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {booking.name}
                  </td>
                  <td className="py-4 text-gray-700">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-gray-700">
                    {new Date(booking.tripDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-gray-700">{booking.tripName}</td>

                  <td className="py-4 text-gray-700">
                    <span className="lg:ml-8">{booking.travellers}</span>
                  </td>
                  <td
                    className={`py-4 text-sm font-semibold ${
                      booking.status === "Confirmed"
                        ? " text-green-600"
                        : booking.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {booking.status}
                  </td>
                  <td className="py-4 text-gray-700">${booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-5">
          {bookingData.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 mx-auto w-[90%]"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    booking.name
                  )}&background=0D8ABC&color=fff&size=40`}
                  alt={booking.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {booking.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Booking Date:{" "}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-700 mb-2">
                <p>
                  <span className="font-medium">Trip Name:</span>{" "}
                  {booking.tripName}
                </p>
                <p>
                  <span className="font-medium">Trip Date:</span>{" "}
                  {new Date(booking.tripDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Travellers:</span>.
                  {booking.travellers}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {booking.status}
                </span>
                <span className="text-base font-semibold text-gray-800">
                  ${booking.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking;
