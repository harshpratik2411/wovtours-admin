import React, { useEffect, useState } from "react";
import AOS from "aos";
import { format } from "date-fns";
import "aos/dist/aos.css";
import { BsThreeDotsVertical, BsXCircle } from "react-icons/bs";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { FiSearch, FiFilter } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../../Services/DateFormatter";
import FilterOptions from "../../Services/FilterOptions";
import StatusClassMap from "../../Services/StatusClassMap";
import FeaturedTripServices from "./FeaturedTripServices";


const FeaturedTrips = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [sortMenuOpen, setSortMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [FeaturedTripList, setFeaturedTripList] = useState([]);
    const [status, setStatus] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const [selectedSortLabel, setSelectedSortLabel] = useState("Sort By");
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    function apiCall(
        search = searchText,
        order = orderBy,
        page = currentPage,
        currentStatus = status
    ) {
        setLoading(true);

        FeaturedTripServices.getAll(search, order, page, currentStatus)
            .then((response) => {
                setFeaturedTripList(response.featuredTrips);
                setTotalPages(response.totalPages);
                setCurrentPage(response.currentPage);
                setLoading(false);
            })
            .catch((err) => {
                setFeaturedTripList([]);
                setTotalPages(1);
                setLoading(false);
            });
    }

    useEffect(() => {
        AOS.init({ duration: 800 });

        apiCall();

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
        const newOrder = FilterOptions.filterMap[option];
        setOrderBy(newOrder);
        setSelectedSortLabel(option);
        setSortMenuOpen(false);
        apiCall(searchText, newOrder, currentPage, status);
    };

    const clearSearch = () => {
        setSearchText("");
        apiCall("", orderBy, currentPage, status);
    };

    const getStatusClass = (status) => StatusClassMap.getClass(status);

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                Trips
            </h1>
            <div className="bg-white  p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                {/* Search, Sort, Filter, Add */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 relative w-full sm:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-auto">
                            <FiSearch
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                                size={18}
                            />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchText(val);
                                    apiCall(val, orderBy, currentPage, status);
                                }}
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

                        {/* Sort Dropdown */}
                        <div className="relative w-full sm:w-auto">
                            <button
                                onClick={toggleSort}
                                className="sort-toggle flex items-center gap-1 border text-sm text-gray-600 bg-white px-3 py-1 rounded hover:bg-gray-100 w-full sm:w-auto"
                            >
                                {selectedSortLabel}
                            </button>
                            {sortMenuOpen && (
                                <div className="dropdown-menu absolute left-0 mt-1 bg-white border rounded shadow w-40 z-20">
                                    {[
                                        FilterOptions.nameAsc,
                                        FilterOptions.nameDesc,
                                        FilterOptions.dateAsc,
                                        FilterOptions.dateDesc,
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

                        {/* Status Filter */}
                        <select
                            value={status}
                            onChange={async (e) => {
                                const newStatus = e.target.value;
                                const newPage = 1;

                                const result = await apiCall(
                                    searchText,
                                    orderBy,
                                    newPage,
                                    newStatus
                                );

                                if (!result || result.length === 0) {
                                    setCurrentPage(1);
                                } else {
                                    setCurrentPage(newPage);
                                }

                                setStatus(newStatus);
                            }}
                            className="border text-sm text-gray-600 bg-white px-3 py-1 rounded w-full sm:w-auto focus:outline-none"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => navigate("/trips/add")}
                        className="flex items-center gap-1 border text-sm text-gray-600 bg-white px-2 py-2 rounded hover:bg-gray-100"
                    >
                        <FaPlus size={12} /> Add
                    </button>
                </div>
                {/* Table View */}
                <div className="overflow-x-auto hidden sm:block">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-gray-500 font-rubik uppercase border-b">
                            <tr>
                                <th className="py-2 w-[10%]">Image</th>
                                <th className="py-2 w-[10%]">Title</th>
                                <th className="py-2 pl-3 w-[20%]">Order </th>
                                <th className="py-2 w-[10%]">Status</th>
                                <th className="py-2 w-[15%]">Created At</th>
                                <th className="py-2 w-[15%]">Updated At</th>
                                <th className="py-2 w-[10%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center text-lg py-20 text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : FeaturedTripList.length > 0 ? (
                                FeaturedTripList.map((featuredTrip) => (
                                    <tr key={featuredTrip.trip.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4">
                                            {featuredTrip.trip.media_urls && featuredTrip.trip.media_urls.length > 0 ? (
                                                /\.(jpeg|jpg|gif|png|webp)$/i.test(
                                                    featuredTrip.trip.media_urls[0].media
                                                ) ? (
                                                    <img
                                                        src={featuredTrip.trip.media_urls[0].media}
                                                        alt={featuredTrip.trip.title}
                                                        className="h-14 w-20 object-cover rounded-md"
                                                    />
                                                ) : /\.(mp4|webm|ogg)$/i.test(
                                                    featuredTrip.trip.media_urls[0].media
                                                ) ? (
                                                    <video
                                                        src={featuredTrip.trip.media_urls[0]}
                                                        className="h-14 w-20 object-cover rounded-md"
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src="/placeholder.jpg"
                                                        alt="Unsupported file"
                                                        className="h-14 w-20 object-cover rounded-md"
                                                    />
                                                )
                                            ) : (
                                                <img
                                                    src="/placeholder.jpg"
                                                    alt="No media"
                                                    className="h-14 w-20 object-cover rounded-md"
                                                />
                                            )}
                                        </td>
                                        <td className="py-6">
                                            <p className="font-medium text-gray-800">{featuredTrip.trip.title}</p>
                                        </td>

                                        <td className="py-6">
                                            <p className="font-medium ml-3  text-gray-800">
                                                {featuredTrip.order}
                                            </p>
                                        </td>



                                        <td className="py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                    featuredTrip.status
                                                )}`}
                                            >
                                                {featuredTrip.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-700">
                                            {DateFormatter.formatDate(featuredTrip.created_at)}
                                        </td>
                                        <td className="py-4 text-gray-700">
                                            {DateFormatter.formatDate(featuredTrip.updated_at)}
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => toggleMenu(featuredTrip.id)}
                                                    className="text-gray-600 hover:text-black menu-toggle"
                                                >
                                                    <BsThreeDotsVertical size={18} />
                                                </button>
                                                {activeMenu === featuredTrip.id && (
                                                    <div className="dropdown-menu absolute right-0 -top-[4rem] z-10 bg-white border rounded shadow w-32">
                                                        <button
                                                            onClick={() => navigate(`/trips/view/${featuredTrip.id}`)}
                                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                                        >
                                                            <FaEye size={14} /> View
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/trips/update/${featuredTrip.id}`)
                                                            }
                                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                                        >
                                                            <FaEdit size={14} /> Update
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center text-3xl py-40 font-semibold text-gray-600"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="block sm:hidden space-y-5 flex-col items-center justify-center">
                    {!loading && FeaturedTripList && FeaturedTripList.length > 0 ? (
                        FeaturedTripList.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-white px-4 py-5 rounded-xl shadow-md border w-full"
                                data-aos="fade-up"
                            >
                                {trip.media_urls && trip.media_urls.length > 0 ? (
                                    /\.(jpeg|jpg|gif|png|webp)$/i.test(trip.media_urls[0].media) ? (
                                        <img
                                            src={trip.media_urls[0].media}
                                            alt={trip.title}
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                    ) : /\.(mp4|webm|ogg)$/i.test(trip.media_urls[0].media) ? (
                                        <video
                                            src={trip.media_urls[0].media}
                                            controls
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                    ) : (
                                        <img
                                            src="/placeholder.jpg"
                                            alt="Unsupported file"
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                    )
                                ) : (
                                    <img
                                        src="/placeholder.jpg"
                                        alt="No media"
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                )}


                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <strong className="text-sm text-gray-700 mr-2">
                                                Title:
                                            </strong>
                                            <p className="text-sm text-gray-800">
                                                {trip.title}
                                            </p>
                                        </div>

                                        {/* Description line */}
                                        <div className="flex items-center mb-2">
                                            <strong className="text-sm text-gray-700 mr-2">
                                                Description:
                                            </strong>
                                            <p className="text-sm text-gray-800">
                                                {trip.description}
                                            </p>
                                        </div>

                                        {/* Status line */}
                                        <div className="flex items-center">
                                            <strong className="text-sm text-gray-700 mr-2">
                                                Status:
                                            </strong>
                                            <p
                                                className={`text-xs inline-block px-2 py-1 rounded-full font-medium ml-2 ${getStatusClass(
                                                    trip.status
                                                )}`}
                                            >
                                                {trip.status}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleMenu(trip.id)}
                                        className="text-gray-600 menu-toggle"
                                    >
                                        <BsThreeDotsVertical size={20} />
                                    </button>
                                </div>

                                <div className="text-sm text-gray-700 space-y-2 mt-2">
                                    <p>
                                        <span className="font-bold">Created At:</span>{" "}
                                        {DateFormatter.formatDate(trip.created_at)}
                                    </p>
                                    <p>
                                        <span className="font-bold">Updated At:</span>{" "}
                                        {DateFormatter.formatDate(trip.updated_at)}
                                    </p>
                                </div>

                                {activeMenu === trip.id && (
                                    <div className="mt-3 dropdown-menu bg-white border rounded shadow w-full z-10">
                                        <button
                                            onClick={() => navigate(`/trips/view/${trip.id}`)}
                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                        >
                                            <FaEye size={14} /> View
                                        </button>
                                        <button
                                            onClick={() => navigate(`/trips/update/${trip.id}`)}
                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 text-sm text-gray-700"
                                        >
                                            <FaEdit size={14} /> Update
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center font-semibold text-gray-600 py-10">
                            No data found
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-2 flex  justify-center items-center space-x-2">
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx + 1}
                                onClick={() => {
                                    apiCall(searchText, orderBy, idx + 1, status);
                                    setCurrentPage(idx + 1); // optional since apiCall sets it
                                }}
                                className={`px-3 py-1 rounded ${currentPage === idx + 1
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
                onClick={() => navigate("/trips/add")}
                className="sm:hidden fixed bottom-3 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
                title="Add tag"
            >
                <FaPlus size={15} />
            </button>
        </>
    );
};

export default FeaturedTrips;
