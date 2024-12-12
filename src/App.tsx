import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FormsPage from "./pages/FormsDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import IsAuthenticated from "./routes/isAuthenticated";
import NavBar from "./components/NavBar";
import ParticlesBackgroundLayout from "./components/ParticlesBackgroundLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with Particles */}
        <Route element={<ParticlesBackgroundLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <IsAuthenticated>
                <>
                  <NavBar />
                  <Login />
                </>
              </IsAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <IsAuthenticated>
                <>
                  <NavBar />
                  <Register />
                </>
              </IsAuthenticated>
            }
          />
        </Route>

        {/* Routes without Particles */}
        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <FormsPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
