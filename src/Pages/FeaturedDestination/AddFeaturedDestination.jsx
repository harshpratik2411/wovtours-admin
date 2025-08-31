import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import { useNavigate } from "react-router-dom";
import DestinationServices from "../Destinations/DestinationServices";
import FeaturedDestinationServices from "./FeaturedDestinationServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFeaturedDestination = () => {
    const [destinationId, setDestinationId] = useState("");
    const [order, setOrder] = useState("");
    const [status, setStatus] = useState("Active");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await DestinationServices.getAll("", "", 1, "Active"); // Fetch all active destinations
                if (response && response.Destinations) {
                    setDestinations(response.Destinations);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
                toast.error("Failed to load destinations.");
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = {
            destination_id: parseInt(destinationId),
            order: parseInt(order),
            status: status,
        };

        try {
            const response = await FeaturedDestinationServices.add(data);
            if (response) {
                toast.success("Featured Destination added successfully!");
                navigate("/featured-destinations");
            } else {
                toast.error("Failed to add Featured Destination.");
            }
        } catch (error) {
            console.error("Error adding featured destination:", error);
            toast.error("An error occurred while adding the featured destination.");
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
                    Add Featured Destination
                </h1>
                <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                    <p className="text-center text-lg py-20 text-gray-500">Loading destinations...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                Add Featured Destination
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
                            {submitting ? "Adding..." : "Add Featured Destination"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFeaturedDestination;
