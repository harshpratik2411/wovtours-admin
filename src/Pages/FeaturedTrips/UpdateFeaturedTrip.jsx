import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import FeaturedTripServices from "./FeaturedTripServices";
import TripServices from "../Trips/TripsServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFeaturedTrip = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tripId, setTripId] = useState("");
    const [order, setOrder] = useState("");
    const [status, setStatus] = useState("Active");
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all trips for the dropdown
                const allTripsResponse = await TripServices.getAll("", "", 1, ""); // Fetch all trips, active or inactive
                if (allTripsResponse && allTripsResponse.Trips) {
                    setTrips(allTripsResponse.Trips);
                }

                // Fetch the specific featured trip to update
                const featuredTripResponse = await FeaturedTripServices.get(id);
                if (featuredTripResponse) {
                    setTripId(featuredTripResponse.trip.id);
                    setOrder(featuredTripResponse.order);
                    setStatus(featuredTripResponse.status);
                } else {
                    toast.error("Featured Trip not found.");
                    navigate("/featured-trips");
                }
            } catch (error) {
                console.error("Error fetching data for featured trip update:", error);
                toast.error("Failed to load featured trip data.");
                navigate("/featured-trips");
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
            trip_id: parseInt(tripId),
            order: parseInt(order),
            status: status,
        };

        try {
            const response = await FeaturedTripServices.update(id, data);
            if (response) {
                toast.success("Featured Trip updated successfully!");
                navigate("/featured-trips");
            } else {
                toast.error("Failed to update Featured Trip.");
            }
        } catch (error) {
            console.error("Error updating featured trip:", error);
            toast.error("An error occurred while updating the featured trip.");
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
                    Update Featured Trip
                </h1>
                <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                    <p className="text-center text-lg py-20 text-gray-500">Loading featured trip data...</p>
                </div>
            </>
        );
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                Update Featured Trip
            </h1>
            <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="tripId" className="block text-sm font-medium text-gray-700">
                            Trip
                        </label>
                        <select
                            id="tripId"
                            value={tripId}
                            onChange={(e) => setTripId(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="">Select a Trip</option>
                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.title}
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
                            {submitting ? "Updating..." : "Update Featured Trip"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/featured-trips")}
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

export default UpdateFeaturedTrip;
