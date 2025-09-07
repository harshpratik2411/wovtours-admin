import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import FeaturedDestinationServices from "./FeaturedDestinationServices";
import DateFormatter from "../../Services/DateFormatter";
import StatusClassMap from "../../Services/StatusClassMap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFeaturedDestination = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [featuredDestination, setFeaturedDestination] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedDestination = async () => {
            try {
                const response = await FeaturedDestinationServices.get(id);
                if (response) {
                    setFeaturedDestination(response);
                }
            } catch (error) {
                console.error("Error fetching featured destination:", error);
                toast.error("Failed to load featured destination.");
                navigate("/featured-destinations");
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedDestination();
    }, [id, navigate]);

    const getStatusClass = (status) => StatusClassMap.getClass(status);

    if (loading) {
        return (
            <>
                <Navbar />
                <Sidebar />
                <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                    View Featured Destination
                </h1>
                <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                    <p className="text-center text-lg py-20 text-gray-500">Loading featured destination details...</p>
                </div>
            </>
        );
    }

    if (!featuredDestination) {
        return null; // Should ideally redirect or show an error
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                View Featured Destination
            </h1>
            <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Destination Title:</p>
                        <p className="mt-1 text-sm text-gray-900">{featuredDestination.destination.title}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Order:</p>
                        <p className="mt-1 text-sm text-gray-900">{featuredDestination.order}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Status:</p>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                featuredDestination.status
                            )}`}
                        >
                            {featuredDestination.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Created At:</p>
                        <p className="mt-1 text-sm text-gray-900">{DateFormatter.formatDate(featuredDestination.created_at)}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Updated At:</p>
                        <p className="mt-1 text-sm text-gray-900">{DateFormatter.formatDate(featuredDestination.updated_at)}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate(`/featured-destinations/update/${featuredDestination.id}`)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => navigate(`/featured-destinations`)}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to List
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewFeaturedDestination;
