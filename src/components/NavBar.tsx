import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./styles/NavBar.css";
import Logo from "../assets/logo.png";

const NavBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleDashboard = () => {
    navigate("/forms");
  };

  const handleCreateForm = () => {
    alert("Navigate to create form page!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {!isAuthenticated && <Button label="Home" onClick={handleHome} />}
      {isAuthenticated && (
        <>
          <img
            src={Logo}
            alt="Logo"
            className="navbar-logo"
            onClick={handleDashboard}
          />
          <div className="navbar-buttons">
            <Button onClick={handleCreateForm} label="Create" />
            <Button onClick={handleLogout} label="Logout" />
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
