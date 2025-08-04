import React, { useEffect, useState } from "react";
import AOS from "aos";
import { format } from "date-fns";
import "aos/dist/aos.css";
import { BsThreeDotsVertical, BsXCircle } from "react-icons/bs";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useNavigate } from "react-router-dom";
import TagServices from "../../Pages/Tags/TagServices";
import DateFormatter from "../../Services/DateFormatter";

const Tags = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tagList, setTagList] = useState([]);
  const perPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });

    TagServices.getAll("", "").then((data) => {
      setTagList(data);
    });

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".menu-toggle") &&
        !event.target.closest(".sort-toggle")
      ) {
        setActiveMenu(null);
        setSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id) => setActiveMenu(activeMenu === id ? null : id);
  const toggleSort = () => setSortMenuOpen(!sortMenuOpen);
  const handleSort = (option) => {
    console.log("Sort by", option);
    setSortMenuOpen(false);
  };

  const clearSearch = () => setSearchText("");

  const filtered = tagList.filter((tag) =>
    tag.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const pages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const updateBooked = (id, delta) => {
    setTagList((prev) =>
      prev.map((tag) =>
        tag.id === id
          ? { ...tag, booked: Math.max(0, tag.booked + delta) }
          : tag
      )
    );
  };

  const getStatusClass = (status) => {
    if (status === "Active") return "bg-blue-100 text-blue-600";
    if (status === "InActive") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
        Tags
      </h1>
      <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2">
        {/* Search, Sort, Add */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                size={18}
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="border pl-10 pr-8 py-1 rounded text-sm focus:outline-none focus:ring w-full sm:w-52"
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

            <div className="relative w-full sm:w-auto">
              <button
                onClick={toggleSort}
                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100 w-full sm:w-auto"
              >
                Sort By
              </button>
              {sortMenuOpen && (
                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-40 z-20">
                  {[
                    "Name A‑Z",
                    "Name Z‑A",
                    "Date ASC",
                    "Date DESC",
                    "Popularity ASC",
                    "Popularity DESC",
                  ].map((opt) => (
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

          <button
            onClick={() => navigate("/tags/add-tag")}
            className="flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100"
          >
            <FaPlus size={12} /> Add
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-500 font-rubik uppercase border-b">
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Description</th>
                <th className="py-2">Status</th>
                <th className="py-2">Created At</th>
                <th className="py-2">Updated At</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((tag) => (
                <tr
                  key={tag.id}
                  data-aos="fade-up"
                  className="border-b hover:bg-gray-50 relative"
                >
                  <td className="py-4">
                    <p className="font-medium text-gray-800">{tag.name}</p>
                  </td>
                  <td className="py-4 text-gray-700">{tag.desc}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        tag.status
                      )}`}
                    >
                      {tag.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-700">
                    {DateFormatter.formatDate(tag.created_at)}
                  </td>
                  <td className="py-4 text-gray-700">
                    {DateFormatter.formatDate(tag.updated_at)}
                  </td>
                  <td className="py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleMenu(tag.id)}
                        className="text-gray-600 hover:text-black menu-toggle"
                      >
                        <BsThreeDotsVertical size={18} />
                      </button>
                      {activeMenu === tag.id && (
                        <div className="dropdown-menu absolute right-0 -top-[4rem]  z-10 bg-white border rounded shadow w-32">
                          <button
                            onClick={() => navigate(`/tags/view/${tag.id}`)}
                            className="flex items-center gap-2 px-3  py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                          >
                            <FaEye size={14} /> View
                          </button>
                          <button
                            onClick={() => navigate(`/tags/update/${tag.id}`)}
                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                          >
                            <FaEdit size={14} /> Update
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden space-y-5">
          {displayed.map((tag) => (
            <div
              key={tag.id}
              className="bg-gray-50 px-5 py-4 rounded-xl shadow-md border"
              data-aos="fade-up"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold ml-1 text-gray-800 mb-2">
                    {tag.name}
                  </h2>
                  <p
                    className={`text-xs inline-block px-2 py-1 rounded ${getStatusClass(
                      tag.status
                    )}`}
                  >
                    {tag.status}
                  </p>
                </div>
                <button
                  onClick={() => toggleMenu(tag.id)}
                  className="text-gray-600 menu-toggle"
                >
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
              <div className="mt-4 ml-1 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-bold">Description:</span> {tag.desc}
                </p>
                <p>
                  <span className="font-bold">Created At:</span>{" "}
                  {DateFormatter.formatDate(tag.created_at)}
                </p>
                <p>
                  <span className="font-bold">Updated At:</span>{" "}
                  {DateFormatter.formatDate(tag.updated_at)}
                </p>
              </div>
              {activeMenu === tag.id && (
                <div className="mt-3 dropdown-menu bg-white border rounded shadow w-full z-10">
                  <button
                    onClick={() => navigate(`/tags/view/${tag.id}`)}
                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                  >
                    <FaEye size={14} /> View
                  </button>
                  <button
                    onClick={() => navigate(`/tags/update/${tag.id}`)}
                    className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                  >
                    <FaEdit size={14} /> Update
                  </button>
                </div>
              )}
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

      {/* Floating Add Button on Mobile */}
      <button
        onClick={() => navigate("/tags/add-tag")}
        className="sm:hidden fixed bottom-3 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        title="Add tag"
      >
        <FaPlus size={15} />
      </button>
    </>
  );
};

export default Tags;
