import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Siderbar/Sidebar';
import DifficultiesServices from '../../Pages/Difficulties/DifficultiesServices'
import DateFormatter from '../../Services/DateFormatter';

const getStatusClass = (status) => {
  if (status === 'Available') return 'bg-blue-100 text-blue-600';
  if (status === 'Few Left') return 'bg-yellow-100 text-yellow-600';
  return 'bg-red-100 text-red-600';
};

const Viewdifficulty = () => {
  const { id } = useParams();
  const [Difficulty, setDifficulty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDifficulty = async () => {
      setLoading(true);
      const data = await DifficultiesServices.get(id);
      setDifficulty(data);
      setLoading(false);
    };

    fetchDifficulty();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="w-full lg:ml-32 mx-auto p-6 font-rubik">
          <p className="text-center text-lg text-gray-500">Loading...</p>
        </div>
      </>
    );
  }

  if (!Difficulty) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="w-full lg:ml-32 mx-auto p-6 font-rubik">
          <p className="text-center text-xl text-red-500 font-semibold flex items-center justify-center gap-2">
            <FaInfoCircle className="text-2xl" />
            Difficulty not found.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full lg:mt-20 mt-5 lg:ml-32 mx-auto p-6 font-rubik bg-custom-gray min-h-screen">
        <div className="rounded-xl -mt-10 bg-white shadow-lg p-6 sm:p-8 md:p-10 max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-primary border-b pb-4">
            <FaInfoCircle className="text-3xl text-black" />
            <h2 className="lg:text-3xl text-2xl font-slab font-bold text-gray-800">
              View Difficulty Details
            </h2>
          </div>

          {/* Tag Info in two-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-700 text-base lg:text-lg mb-10">
            {/* Left Side: Tag Name + Status */}
            <div className="space-y-6">
              <div>
                <span className="font-semibold block mb-1">Difficulty Name:</span>
                <span>{Difficulty.title}</span>
              </div>

              <div>
                <span className="font-semibold block mb-1">Status:</span>
                <span className={`px-4 py-2 -ml-1 rounded-full text-sm font-medium inline-block ${getStatusClass(Difficulty.status)}`}>
                  {Difficulty.status}
                </span>
              </div> 
              <div>
                <span className="font-semibold  block mb-1">Level:</span>
                <span className=' ml-4  text-lg'>{Difficulty.level}</span>
              </div>
            </div> 

            {/* Right Side: Created At + Updated At */}
            <div className="space-y-6">
              <div>
                <span className="font-semibold block mb-1">Created At:</span>
                <span>{DateFormatter.formatDate(Difficulty.created_at)}</span>
              </div>

              <div>
                <span className="font-semibold block mb-1">Updated At:</span>
                <span>{DateFormatter.formatDate(Difficulty.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center gap-3 mb-2">
              <FaClipboardList className="text-lg text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-800">Difficulty Description</h3>
            </div>
            <p className="text-gray-600 text-left leading-relaxed">
              {Difficulty.desc || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewdifficulty;
