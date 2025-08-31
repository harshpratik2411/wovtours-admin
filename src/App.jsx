import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Category/Categories";
import AddCategory from "./Pages/Category/AddCategory";
import UpdateCategory from "./Pages/Category/UpdateCategory";
import ViewCategory from "./Pages/Category/ViewCategory";
import Login from "./Pages/Login";
import PrivateRoute from "./Pages/PrivateRoute"; 
import Tags from "./Pages/Tags/Tags";  
import ViewTag from "./Pages/Tags/ViewTag";
import UpdateTag from "./Pages/Tags/UpdateTag";
import AddTag from "./Pages/Tags/AddTag";  
import Difficulty from './Pages/Difficulties/Difficulties';
import AddDifficulty from './Pages/Difficulties/AddDifficulties';
import UpdateDifficulty from './Pages/Difficulties/UpdateDifficulties';
import Viewdifficulty from './Pages/Difficulties/ViewDifficulties'; 
import Activities from  './Pages/Activities/Activity'
import ViewActivity from './Pages/Activities/ViewActivity';
import UpdateActivity from './Pages/Activities/UpdateActivity';
import AddActivity from './Pages/Activities/AddActivity'; 
import Destination from './Pages/Destinations/Destination'
import AddDestination from  './Pages/Destinations/AddDestination'  
import UpdateDestination from './Pages/Destinations/UpdateDestination'
import ViewDestination from './Pages/Destinations/ViewDestination'
import TripType from "./Pages/TripType/TripType";
import AddTripType from './Pages/TripType/AddTripType'
import UpdateTripType from './Pages/TripType/UpdateTripType'
import ViewTripType from './Pages/TripType/ViewTripType'  
import Users from './Pages/Users/Users' 
import Bookings from './Pages/Bookings/Bookings' 
import Settings from "./Pages/Settings/Settings"; 
import TripEnquiry from "./Pages/TripEnquiry/TripEnquiry";  
import PricingCat from "./Pages/PricingCategory/PricingCat";
import AddPricingCat from "./Pages/PricingCategory/AddPricingCat";
import UpdatePricingCat from "./Pages/PricingCategory/UpdatePricingCat";
import ViewPricingCat from "./Pages/PricingCategory/ViewPricingCat"; 
import UpdateSettings from "./Pages/Settings/UpdateSettings";
import Banner from "./Pages/Banner/Banner"; 
import AddBanner from "./Pages/Banner/AddBanner";
import UpdateBanner from "./Pages/Banner/UpdateBanner";
import ViewBanner from './Pages/Banner/viewBanner' 
import Trips from "./Pages/Trips/Trips";
import AddTrips from "./Pages/Trips/AddTrips";
import ViewTrips from "./Pages/Trips/ViewTrips";
import UpdateTrips from "./Pages/Trips/UpdateTrips";
import FeaturedTrips from "./Pages/FeaturedTrips/FeaturedTrips";


function App() {
  return (
    <div className="m-0 overflow-x-hidden">
    
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />

          {/* Categories */}
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/categories/view/:id" element={<PrivateRoute><ViewCategory /></PrivateRoute>} />
          <Route path="/categories/update/:id" element={<PrivateRoute><UpdateCategory /></PrivateRoute>} />
          <Route path="/categories/add" element={<PrivateRoute><AddCategory /></PrivateRoute>} />

          {/* Tags */}
          <Route path="/tags" element={<PrivateRoute><Tags /></PrivateRoute>} />
          <Route path="/tags/view/:id" element={<PrivateRoute><ViewTag /></PrivateRoute>} />
          <Route path="/tags/update/:id" element={<PrivateRoute><UpdateTag /></PrivateRoute>} />
          <Route path="/tags/add-tag" element={<PrivateRoute><AddTag /></PrivateRoute>} />

          {/* Difficulties */}
          <Route path="/difficulties" element={<PrivateRoute><Difficulty /></PrivateRoute>} />
          <Route path="/difficulties/view/:id" element={<PrivateRoute><Viewdifficulty /></PrivateRoute>} />
          <Route path="/difficulties/update/:id" element={<PrivateRoute><UpdateDifficulty /></PrivateRoute>} />
          <Route path="/difficulties/add-difficulties" element={<PrivateRoute><AddDifficulty /></PrivateRoute>} />

          {/* Activities */}
          <Route path="/activities" element={<PrivateRoute><Activities /></PrivateRoute>} />
          <Route path="/activities/view/:id" element={<PrivateRoute><ViewActivity /></PrivateRoute>} />
          <Route path="/activities/update/:id" element={<PrivateRoute><UpdateActivity /></PrivateRoute>} />
          <Route path="/activities/add" element={<PrivateRoute><AddActivity /></PrivateRoute>} />  

            {/* Destinations */}
          <Route path="/destinations" element={<PrivateRoute><Destination /></PrivateRoute>} />
          <Route path="/destinations/view/:id" element={<PrivateRoute><ViewDestination /></PrivateRoute>} />
          <Route path="/destinations/update/:id" element={<PrivateRoute><UpdateDestination /></PrivateRoute>} />
          <Route path="/destinations/add" element={<PrivateRoute><AddDestination /></PrivateRoute>} />
       
            {/* TripTypes */} 

          <Route path="/trip-type" element={<PrivateRoute>< TripType /></PrivateRoute>} />
          <Route path="/trip-type/view/:id" element={<PrivateRoute><ViewTripType /></PrivateRoute>} />
          <Route path="/trip-type/update/:id" element={<PrivateRoute><UpdateTripType /></PrivateRoute>} />
          <Route path="/trip-type/add" element={<PrivateRoute><AddTripType/></PrivateRoute>} />  

          {/* Users */}
          <Route path="/users" element={<PrivateRoute><Users/></PrivateRoute>} /> 
          {/* Bookings */}
          <Route path="/bookings" element={<PrivateRoute><Bookings/></PrivateRoute>} />  
          {/* Settings */}
          <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />    
          <Route path="/settings/update" element={<PrivateRoute><UpdateSettings/></PrivateRoute>} />   
          {/* TripEnquiry */}
          <Route path="/trip-enquiry" element={<PrivateRoute><TripEnquiry/></PrivateRoute>} />  
 
    
           <Route path="/pricing-category" element={<PrivateRoute>< PricingCat /></PrivateRoute>} />
          <Route path="/pricing-category/view/:id" element={<PrivateRoute><ViewPricingCat /></PrivateRoute>} />
          <Route path="/pricing-category/update/:id" element={<PrivateRoute><UpdatePricingCat /></PrivateRoute>} />
          <Route path="/pricing-category/add" element={<PrivateRoute><AddPricingCat/></PrivateRoute>} />  
          {/* Banners */}

           <Route path="/banners" element={<PrivateRoute>< Banner /></PrivateRoute>} />
          <Route path="/banners/view/:id" element={<PrivateRoute><ViewBanner /></PrivateRoute>} />
          <Route path="/banners/update/:id" element={<PrivateRoute><UpdateBanner /></PrivateRoute>} />
          <Route path="/banners/add" element={<PrivateRoute><AddBanner/></PrivateRoute>} />   

              {/* Trips */}
           <Route path="/trips" element={<PrivateRoute>< Trips /></PrivateRoute>} />
          <Route path="/trips/view/:id" element={<PrivateRoute><ViewTrips /></PrivateRoute>} />
          <Route path="/trips/update/:id" element={<PrivateRoute><UpdateTrips /></PrivateRoute>} />
          <Route path="/trips/add" element={<PrivateRoute><AddTrips/></PrivateRoute>} />  

           <Route path="/featured-trips" element={<PrivateRoute>< FeaturedTrips /></PrivateRoute>} />

        </Routes>
      
    </div>
  );
}

export default App;
