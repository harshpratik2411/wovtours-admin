import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsXCircle } from "react-icons/bs";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";

const userList = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", createdAt: "2025-07-20" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", createdAt: "2025-07-18" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", createdAt: "2025-07-15" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", createdAt: "2025-07-10" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", createdAt: "2025-07-25" },
  { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", createdAt: "2025-07-19" },
  { id: 7, name: "George Lucas", email: "george@example.com", createdAt: "2025-07-22" },
  { id: 8, name: "Hannah Baker", email: "hannah@example.com", createdAt: "2025-07-14" },
];

const User = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".menu-toggle") &&
        !event.target.closest(".sort-toggle")
      ) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSort = () => setSortMenuOpen(!sortMenuOpen);
  const clearSearch = () => setSearchText("");

  const handleSort = (option) => {
    setSortOption(option);
    setSortMenuOpen(false);
  };

  const filtered = userList
    .filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Name A-Z") return a.name.localeCompare(b.name);
      if (sortOption === "Name Z-A") return b.name.localeCompare(a.name);
      if (sortOption === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "Oldest First") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const pages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <Navbar />
      <Sidebar />
      <span>
        <h1 className="lg:ml-72 text-center font-rubik text-3xl font-bold">Users</h1>
      </span>
      <div className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-10">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2 relative flex-wrap">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-52"
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
                onClick={toggleSort}
                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100"
              >
                Sort By
              </button>
              {sortMenuOpen && (
                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-44 z-20">
                  {["Name A-Z", "Name Z-A", "Newest First", "Oldest First"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSort(opt)}
                      className="px-3 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden sm:table w-full">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 font-rubik uppercase border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Contacted On</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 relative">
                  <td className="py-4 text-gray-800 font-medium flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=32`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {user.name}
                  </td>
                  <td className="py-4 text-gray-700">{user.email}</td>
                  <td className="py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {displayed.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg shadow-sm bg-gray-50 p-4 relative w-[90%] mx-auto"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=40`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
              </div>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Contacted on: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center items-center space-x-2">
            {[...Array(pages)].map((_, idx) => (
              <button
                key={idx + 1}
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

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => navigate("/user/add")}
        className="sm:hidden fixed bottom-8 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add User"
      >
        <FaPlus size={15} />
      </button>
    </>
  );
};

export default User;
