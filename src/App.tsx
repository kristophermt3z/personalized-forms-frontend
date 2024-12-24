import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormsPage from "./pages/FormsDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import IsAuthenticated from "./routes/isAuthenticated";
import NavBar from "./components/NavBar";
import ParticlesBackgroundLayout from "./components/ParticlesBackgroundLayout";
import CreateFormPage from "./pages/dashboard/CreateFormPage";
import EditFormPage from "./pages/dashboard/EditFormPage";
import Contact from "./pages/Contact";
import ProfileForms from "./pages/dashboard/ProfileForms";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout with Particles */}
        <Route element={<ParticlesBackgroundLayout />}>
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
          <Route
            path="/contact"
            element={
              <>
                <NavBar />
                <Contact />
              </>
            }
          />
        </Route>

        {/* Routes without Particles */}
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <FormsPage />
            </>
          }
        />
        <Route
          path="/profile-forms"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <ProfileForms />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-form"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <CreateFormPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-form/:formId"
          element={
            <ProtectedRoute>
              <>
                <NavBar />
                <EditFormPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
