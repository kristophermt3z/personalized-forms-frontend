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
import IsAuthenticated from "./routes/isAuthenticated";
import IsNotAuthenticated from "./routes/isNotAuthenticated";
import NavBar from "./components/NavBar";
import ParticlesBackgroundLayout from "./components/ParticlesBackgroundLayout";
import CreateFormPage from "./pages/dashboard/CreateFormPage";
import EditFormPage from "./pages/dashboard/EditFormPage";
import Contact from "./pages/Contact";
import ProfileForms from "./pages/dashboard/ProfileForms";
import AdminPanel from "./pages/dashboard/AdminPanelPage";
import IsAdmin from "./routes/isAdmin";
import ViewFormPage from "./pages/dashboard/ViewFormPage";
import ReplyFormPage from "./pages/dashboard/ReplyFormPage";
import ViewResponsesPage from "./pages/dashboard/ViewResponsesPage";
import IsOwnerOrAdmin from "./routes/IsOwnerOrAdmin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ParticlesBackgroundLayout />}>
          <Route
            path="/login"
            element={
              <IsNotAuthenticated>
                <>
                  <NavBar />
                  <Login />
                </>
              </IsNotAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <IsNotAuthenticated>
                <>
                  <NavBar />
                  <Register />
                </>
              </IsNotAuthenticated>
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
              <IsAuthenticated>
                <>
                  <NavBar />
                  <ProfileForms />
                </>
              </IsAuthenticated>
            }
          />
          <Route
            path="/create-form"
            element={
              <IsAuthenticated>
                <>
                  <NavBar />
                  <CreateFormPage />
                </>
              </IsAuthenticated>
            }
          />
          <Route
            path="/edit-form/:formId"
            element={
              <IsAuthenticated>
                <IsOwnerOrAdmin>
                  <NavBar />
                  <EditFormPage />
                </IsOwnerOrAdmin>
              </IsAuthenticated>
            }
          />
          <Route
            path="/view-form/:formId"
            element={
              <>
                <NavBar />
                <ViewFormPage />
              </>
            }
          />
          <Route
            path="/reply-form/:formId"
            element={
              <IsAuthenticated>
                <>
                  <NavBar />
                  <ReplyFormPage />
                </>
              </IsAuthenticated>
            }
          />
          <Route
            path="/view-responses/:formId"
            element={
              <IsAuthenticated>
                <IsOwnerOrAdmin>
                  <NavBar />
                  <ViewResponsesPage />
                </IsOwnerOrAdmin>
              </IsAuthenticated>
            }
          />
          <Route
            path="/admin"
            element={
              <IsAdmin>
                <NavBar />
                <AdminPanel />
              </IsAdmin>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
