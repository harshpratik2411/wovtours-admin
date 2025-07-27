import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import Homepage from './Pages/Homepage'
import Categories from './Pages/Category/Categories'
import ViewTrip from './Pages/Category/ViewTrip'
import UpdateTrip from './Pages/Category/UpdateTrip'
import Tags from './Pages/Tags'
import Login from './Pages/Login'
import Add from './Pages/Category/Add'
// import other pages when needed...
import PrivateRoute from './Pages/PrivateRoute' 

function App() {
  return (
    <BrowserRouter>
      <div className="m-0">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/view/:id"
            element={
              <PrivateRoute>
                <ViewTrip />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/update/:id"
            element={
              <PrivateRoute>
                <UpdateTrip />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/add"
            element={
              <PrivateRoute>
                <Add />
              </PrivateRoute>
            }
          />
          <Route
            path="/tags"
            element={
              <PrivateRoute>
                <Tags />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
