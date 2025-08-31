import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Siderbar/Sidebar";
import FeaturedCategoryServices from "./FeaturedCategoryServices";
import CategoryServices from "./CategoryServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFeaturedCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState("");
    const [order, setOrder] = useState("");
    const [status, setStatus] = useState("Active");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all categories for the dropdown
                const allCategoriesResponse = await CategoryServices.getAll("", "", 1, ""); // Fetch all categories, active or inactive
                if (allCategoriesResponse && allCategoriesResponse.Categories) {
                    setCategories(allCategoriesResponse.Categories);
                }

                // Fetch the specific featured category to update
                const featuredCategoryResponse = await FeaturedCategoryServices.get(id);
                if (featuredCategoryResponse) {
                    setCategoryId(featuredCategoryResponse.category.id);
                    setOrder(featuredCategoryResponse.order);
                    setStatus(featuredCategoryResponse.status);
                } else {
                    toast.error("Featured Category not found.");
                    navigate("/featured-categories");
                }
            } catch (error) {
                console.error("Error fetching data for featured category update:", error);
                toast.error("Failed to load featured category data.");
                navigate("/featured-categories");
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
            category_id: parseInt(categoryId),
            order: parseInt(order),
            status: status,
        };

        try {
            const response = await FeaturedCategoryServices.update(id, data);
            if (response) {
                toast.success("Featured Category updated successfully!");
                navigate("/featured-categories");
            } else {
                toast.error("Failed to update Featured Category.");
            }
        } catch (error) {
            console.error("Error updating featured category:", error);
            toast.error("An error occurred while updating the featured category.");
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
                    Update Featured Category
                </h1>
                <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                    <p className="text-center text-lg py-20 text-gray-500">Loading featured category data...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold -mt-10 text-center lg:ml-32 mb-10">
                Update Featured Category
            </h1>
            <div className="bg-white p-4 sm:p-6 lg:ml-72 rounded-xl shadow-md font-rubik w-full max-w-6xl mx-auto -mt-2 mb-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
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
                            {submitting ? "Updating..." : "Update Featured Category"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/featured-categories")}
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

export default UpdateFeaturedCategory;
