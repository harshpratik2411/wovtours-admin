import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsXCircle } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";

const enquiryList = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    contactedAt: "2025-07-28T10:15:00",
    country: "USA",
    contact: "+1 555-1234",
    adults: 2,
    children: 1,
    subject: "Summer Vacation",
    message: "Looking for a 7-day trip to Hawaii.",
    trip: "Hawaii Getaway",
    packageName: "Sunset Deluxe",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    contactedAt: "2025-07-25T08:30:00",
    country: "Canada",
    contact: "+1 604-4567",
    adults: 4,
    children: 0,
    subject: "Winter Trip",
    message: "Interested in skiing trip in Whistler.",
    trip: "Whistler Snow Adventure",
    packageName: "Ski Max Pro",
  },
  // Add more entries as needed
];

const TripEnquiry = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const perPage = 5;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".sort-toggle")
      ) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    setSortMenuOpen(false);
  };

  const filtered = enquiryList
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Name A-Z") return a.name.localeCompare(b.name);
      if (sortOption === "Name Z-A") return b.name.localeCompare(a.name);
      if (sortOption === "Email A-Z") return a.email.localeCompare(b.email);
      if (sortOption === "Email Z-A") return b.email.localeCompare(a.email);
      return 0;
    });

  const pages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const clearSearch = () => setSearchText("");

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 className="lg:ml-72 text-center lg:-mt-0 -mt-6 font-rubik text-3xl font-bold ">Trip Enquiries</h1>
      <div className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email..."
              className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-60"
            />
            {searchText && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <BsXCircle size={18} />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="sort-toggle border px-3 py-1 rounded text-sm bg-white hover:bg-gray-100 text-gray-700"
            >
              Sort By
            </button>
            {sortMenuOpen && (
              <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-44 z-10">
                {["Name A-Z", "Name Z-A", "Email A-Z", "Email Z-A"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSort(opt)}
                    className="block px-4 py-2 text-left w-full text-sm hover:bg-gray-100"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden sm:table w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-semibold uppercase border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Contacted On</th>
                <th className="py-2">Preview</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=32`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{new Date(user.contactedAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => setSelectedEnquiry(user)}
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
          {displayed.map((user) => (
            <div key={user.id} className="border rounded-lg bg-gray-50 p-4 shadow">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=40`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{new Date(user.contactedAt).toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(user)}
                className="text-blue-500 text-sm mt-2 hover:underline flex items-center gap-1"
              >
                <FaEye className="text-blue-800" /> Preview
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: pages }, (_, idx) => (
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
            <h2 className="text-xl  font-bold mb-4">Enquiry Details</h2>
            <p><strong>Name:</strong> {selectedEnquiry.name}</p>
            <p><strong>Email:</strong> {selectedEnquiry.email}</p>
            <p><strong>Country:</strong> {selectedEnquiry.country}</p>
            <p><strong>Contact:</strong> {selectedEnquiry.contact}</p>
            <p><strong>Adults:</strong> {selectedEnquiry.adults}</p>
            <p><strong>Children:</strong> {selectedEnquiry.children}</p>
            <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
            <p><strong>Message:</strong> {selectedEnquiry.message}</p>
            <p><strong>Trip:</strong> {selectedEnquiry.trip}</p>
            <p><strong>Package:</strong> {selectedEnquiry.packageName}</p>
            <p><strong>Contacted On:</strong> {new Date(selectedEnquiry.contactedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TripEnquiry;
