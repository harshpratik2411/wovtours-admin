import React, { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { FaPlus, FaEnvelope } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import UserServices from "./UserServices";

const User = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserServices.getAll(currentPage);
      setCustomers(response.customers || []);
      setTotalPages(response.totalPages || 1);
    };
    fetchData();
  }, [currentPage]);

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

  const filtered = customers
    .filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.includes(searchText)
    )
    .sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`;
      const nameB = `${b.first_name} ${b.last_name}`;
      if (sortOption === "Name A-Z") return nameA.localeCompare(nameB);
      if (sortOption === "Name Z-A") return nameB.localeCompare(nameA);
      return 0;
    });

  return (
    <>
      <Navbar />
      <Sidebar />
      <header>
        <h1 className="lg:ml-72 text-center font-rubik text-3xl font-bold">Users</h1>
      </header>

      <main className="bg-white p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto mt-10">
        {/* Search and Sort */}
        <section className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-2 relative flex-wrap">
            {/* Search input */}
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
                  aria-label="Clear search"
                >
                  <BsXCircle size={18} />
                </button>
              )}
            </div>

            {/* Sort button */}
            <div className="relative">
              <button
                onClick={toggleSort}
                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100"
                aria-haspopup="true"
                aria-expanded={sortMenuOpen}
                aria-label="Sort options"
              >
                Sort By
              </button>
              {sortMenuOpen && (
                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-44 z-20">
                  {["Name A-Z", "Name Z-A"].map((opt) => (
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
        </section>

        {/* Desktop Table */}
        <section className="overflow-x-auto hidden sm:block">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 font-rubik uppercase border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 text-gray-800 font-medium flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        `${user.first_name} ${user.last_name}`
                      )}&background=0D8ABC&color=fff&size=32`}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-8 h-8 rounded-full"
                    />
                    {user.first_name} {user.last_name}
                  </td>

                  {/* Fix email cell: simple flex to align icon without messing layout */}
                  <td className="py-4 text-gray-700  items-center gap-2">
                    <span>{user.email}</span>
                    <a
                      href={`mailto:${user.email}`}
                      title="Send Email"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEnvelope className="ml-[14.5rem] -mt-[17px]" size={17} />
                    </a>
                  </td>

                  <td className="py-4 text-gray-700">{user.phone}</td>
                  <td className="py-4 text-gray-700">{user.country?.name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Mobile Cards */}
        <section className="sm:hidden space-y-4">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg shadow-sm bg-gray-50 p-4 relative w-[90%] mx-auto"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    `${user.first_name} ${user.last_name}`
                  )}&background=0D8ABC&color=fff&size=40`}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold text-lg text-gray-800">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                Email:
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  {user.email} <FaEnvelope size={14} />
                </a>
              </p>
              <p className="text-sm text-gray-700">Phone: {user.phone}</p>
              <p className="text-xs text-gray-500 mt-1">
                Country: {user.country?.name || "N/A"}
              </p>
            </div>
          ))}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-6 flex justify-center items-center space-x-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-current={currentPage === idx + 1 ? "page" : undefined}
              >
                {idx + 1}
              </button>
            ))}
          </nav>
        )}
      </main>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => navigate("/user/add")}
        className="sm:hidden fixed bottom-8 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add User"
        aria-label="Add User"
      >
        <FaPlus size={15} />
      </button>
    </>
  );
};

export default User;
