import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import FeaturedDestinationServices from "./FeaturedDestinationServices";
import DestinationServices from "../Destinations/DestinationServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFeaturedDestination = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [destinationId, setDestinationId] = useState("");
    const [order, setOrder] = useState("");
    const [status, setStatus] = useState("Active");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all destinations for the dropdown
                const allDestinationsResponse = await DestinationServices.getAll("", "", 1, ""); // Fetch all destinations, active or inactive
                if (allDestinationsResponse && allDestinationsResponse.Destinations) {
                    setDestinations(allDestinationsResponse.Destinations);
                }

                // Fetch the specific featured destination to update
                const featuredDestinationResponse = await FeaturedDestinationServices.get(id);
                if (featuredDestinationResponse) {
                    setDestinationId(featuredDestinationResponse.destination.id);
                    setOrder(featuredDestinationResponse.order);
                    setStatus(featuredDestinationResponse.status);
                } else {
                    toast.error("Featured Destination not found.");
                    navigate("/featured-destinations");
                }
            } catch (error) {
                console.error("Error fetching data for featured destination update:", error);
                toast.error("Failed to load featured destination data.");
                navigate("/featured-destinations");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = {
            destination_id: parseInt(destinationId),
            order: parseInt(order),
            status: status,
        };

        try {
            const response = await FeaturedDestinationServices.update(id, data);
            if (response) {
                toast.success("Featured Destination updated successfully!");
                navigate("/featured-destinations");
            } else {
                toast.error("Failed to update Featured Destination.");
            }
        } catch (error) {
            console.error("Error updating featured destination:", error);
            toast.error("An error occurred while updating the featured destination.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Sidebar />
                <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                    Update Featured Destination
                </h1>
                <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                    <p className="text-center text-lg py-20 text-gray-500">Loading featured destination data...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                Update Featured Destination
            </h1>
            <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">
                            Destination
                        </label>
                        <select
                            id="destinationId"
                            value={destinationId}
                            onChange={(e) => setDestinationId(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="">Select a Destination</option>
                            {destinations.map((destination) => (
                                <option key={destination.id} value={destination.id}>
                                    {destination.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                            Order
                        </label>
                        <input
                            type="number"
                            id="order"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            {submitting ? "Updating..." : "Update Featured Destination"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/featured-destinations")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateFeaturedDestination;
