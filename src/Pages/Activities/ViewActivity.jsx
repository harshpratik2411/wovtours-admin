import React from 'react'
import { useParams } from 'react-router-dom'
import {
  FaInfoCircle,
  FaClipboardList,
} from 'react-icons/fa'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/Siderbar/Sidebar'
import ActivityUi from '../../Pages/Activities/ActivityUi'

const getStatusClass = (status) => {
  if (status === 'Available') return 'bg-blue-100 text-blue-600'
  if (status === 'Few Left') return 'bg-yellow-100 text-yellow-600'
  return 'bg-red-100 text-red-600'
}

const ViewActivities = () => {
  const { id } = useParams()
  const activities = ActivityUi.find((t) => t.id === id)

  if (!activities) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <div className="w-full  lg:ml-32 mx-auto p-6 font-rubik">
          <p className="text-center text-xl text-red-500 font-semibold flex items-center justify-center gap-2">
            <FaInfoCircle className="text-2xl" />
            Activity not found.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="w-full -mt-5   lg:ml-32 mx-auto p-6 font-rubik bg-custom-gray min-h-screen">
        <div className="rounded-xl -mt-10 bg-white shadow-lg p-10 max-w-6xl mx-auto ">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 border-primary border-b pb-4">
            <FaInfoCircle className="text-3xl text-black" />
            <h2 className="lg:text-3xl text-2xl font-slab font-bold text-gray-800">
              View Activity Details
            </h2>
          </div>

          {/* Activity Image */}
          <div className="flex justify-center mb-10">
            <img
              src={activities.image}
              alt={activities.name}
              className="rounded-lg shadow-md max-h-[400px] w-full object-cover border"
            />
          </div>

          {/* Activity Info */}
          <div className="grid lg:grid-cols-2  gap-8 text-gray-700 text-base lg:text-lg mb-10">
            <div className="space-y-4 ">
              <div className="flex gap-3">
                <span className="font-semibold lg:ml-0 ml-5 w-32">Activity Name:</span>
                <span className='-ml-3'>{activities.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold lg:ml-0 ml-5 w-32">Slug:</span>
                <span className='-ml-3'>{activities.slug}</span>
              </div>
              
              <div className="flex lg:-ml-6 -ml-0 gap-3">
                <span className="font-semibold lg:ml-6 ml-5 w-32">Featured:</span>
                <span className='mt-1'><input
                      id="my-checkbox"
                      type="checkbox"
                      class="appearance-none w-4 h-4 border border-gray-400 rounded-md cursor-pointer
                      checked:bg-primary checked:border-indigo-600 checked:text-white
                      focus:ring-2 focus:ring-indigo-500  focus:ring-offset-2"
                      />
                      </span> 
              </div>
            </div>

            <div className="flex items-start lg:-mt-0 -mt-4 lg:items-center gap-3">
              <span className="font-semibold lg:ml-0 ml-5 mt-1">Status:</span>
              <span
                className={`px-4 py-2 lg:ml-6 ml-12 rounded-full text-sm font-medium ${getStatusClass(
                  activities.status
                )}`}
              >
                {activities.status}
              </span>
            </div>
          <strong className='font-semibold lg:ml-0 ml-5 mt-1'>Short Description: </strong>
          <span className='text-gray-600 font-medium lg:-mt-0 -mt-4 lg:ml-0 ml-5 text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eum animi illo exercitationem id et!</span>
          </div>  

          {/* Static Description */}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center  lg:ml-0 ml-5 gap-3 mb-2">
              <FaClipboardList className="text-lg text-gray-700" />
              <h3 className="lg:text-xl text-lg font-semibold text-gray-800">Activity Description</h3>
            </div>
            <p className="text-gray-600 lg:ml-0 ml-5 text-left leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu
              metus condimentum, finibus eros nec, volutpat odio. Integer et nisi a
              sem gravida sollicitudin. Suspendisse potenti. Sed cursus nunc sit amet
              ex rutrum, non pulvinar magna porta. Etiam ut enim nec nulla tincidunt
              tempus. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewActivities
