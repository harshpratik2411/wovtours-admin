import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Category/Categories";
import ViewTrip from "./Pages/Category/ViewTrip";
import UpdateTrip from "./Pages/Category/UpdateTrip";
import Login from "./Pages/Login";
import Add from "./Pages/Category/Add";
import PrivateRoute from "./Pages/PrivateRoute"; 
import Tags from "./Pages/Tags/Tags";  
import ViewTag from "./Pages/Tags/ViewTag";
import UpdateTag from "./Pages/Tags/UpdateTag";
import AddTag from "./Pages/Tags/AddTag";  
import Difficulty from './Pages/Difficulties/Difficulties'
import AddDifficulty from './Pages/Difficulties/AddDifficulties'
import UpdateDifficulty from './Pages/Difficulties/UpdateDifficulties'
import Viewdifficulty from './Pages/Difficulties/ViewDifficulties'

function App() {
  return (
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
          <Route
            path="/tags/view/:id"
            element={
              <PrivateRoute>
                <ViewTag />
              </PrivateRoute>
            }
          />
          <Route
            path="/tags/update/:id"
            element={
              <PrivateRoute>
                <UpdateTag />
              </PrivateRoute>
            }
          />
          <Route
            path="/tags/add-tag"
            element={
              <PrivateRoute>
                <AddTag />
              </PrivateRoute>
            }
          />

          <Route
            path="/difficulties"
            element={
              <PrivateRoute>
                <Difficulty />
              </PrivateRoute>
            }
          />
          <Route
            path="/difficulties/view/:id"
            element={
              <PrivateRoute>
                <Viewdifficulty />
              </PrivateRoute>
            }
          />
          <Route
            path="/difficulties/update/:id"
            element={
              <PrivateRoute>
                <UpdateDifficulty />
              </PrivateRoute>
            }
          />
          <Route
            path="/difficulties/add-difficulties"
            element={
              <PrivateRoute>
                <AddDifficulty />
              </PrivateRoute>
            }
          />
        </Routes>
      
    </div>
  );
}

export default App;
