import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import all page components
import Homepage from './Pages/Homepage'
import Categories from './Pages/Category/Categories' 
import ViewTrip from './Pages/Category/ViewTrip'
import UpdateTrip from './Pages/Category/UpdateTrip'
 import Tags from './Pages/Tags' 
 import Add from './Pages/Category/Add'
// import Activities from './Pages/Activities'
// import Destinations from './Pages/Destinations'
// import TripType from './Pages/TripType'
// import Trips from './Pages/Trips'
// import TripEnquiry from './Pages/TripEnquiry'
// import Users from './Pages/Users'
// import Settings from './Pages/Settings'
// import Dashboard from './Pages/Dashboard' // Assuming you have a Dashboard page

function App() {
  return (
    <BrowserRouter>
      <div className="m-0">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/categories" element={<Categories />} /> 
          <Route path="/categories/view/:id" element={<ViewTrip />} />
          <Route path="/categories/update/:id" element={<UpdateTrip />} /> 
          <Route path="/categories/add" element={<Add />} />

           <Route path="/tags" element={<Tags />} />
          {/* <Route path="/difficulties" element={<Difficulties />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trip-type" element={<TripType />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trip-enquiry" element={<TripEnquiry />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} /> */} 
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
