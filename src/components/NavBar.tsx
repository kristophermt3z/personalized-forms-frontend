import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./styles/NavBar.css";
import Logo from '../assets/logo.png';

const NavBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {!isAuthenticated && <Button label="Home" onClick={handleHome} />}
      {isAuthenticated && (
        <>
          <img src={Logo} alt="Logo" className="navbar-logo" />
          <Button onClick={handleLogout} label="Logout" />
        </>
      )}
    </nav>
  );
};

export default NavBar;
