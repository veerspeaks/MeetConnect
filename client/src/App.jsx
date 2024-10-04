import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import HomeStudent from './pages/HomeStudent';
import SignInStudent from "./pages/SignInStudent";
import UserDetail from "./components/UserDetail";
import PrivateRoute from './pages/PrivateRoute'; // Import the PrivateRoute component
import Profile from "./pages/Profile";
import Interviews from "./pages/Interviews";
import Questions from "./pages/Questions"; // Import Questions page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/signin" element={<SignInStudent />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-interviews"
          element={
            <PrivateRoute>
              <Interviews />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/*" // Use wildcard for sub-routes
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
