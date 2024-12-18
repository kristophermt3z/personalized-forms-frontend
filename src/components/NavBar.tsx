import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./styles/NavBar.css";
import Logo from "../assets/logo.png";
import Popup from "../components/Popup";

const NavBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleHome = () => {
    navigate("/");
  };

  const handleCreateForm = () => {
    navigate("/create-form");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        {!isAuthenticated && (
          <>
          <img
              src={Logo}
              alt="Logo"
              className="navbar-logo"
              onClick={handleHome}
            />
            <div className="navbar-buttons">
              <Button label="Home" onClick={handleHome} />
              <Button onClick={handleLogin} label="Login" />
            </div>
          </>
        )}
        {isAuthenticated && (
          <>
            <img
              src={Logo}
              alt="Logo"
              className="navbar-logo"
              onClick={handleHome}
            />
            <div className="navbar-buttons">
              <Button onClick={handleCreateForm} label="Create" />
              <Button onClick={handleLogout} label="Logout" />
            </div>
          </>
        )}
      </nav>
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </>
  );
};

export default NavBar;
