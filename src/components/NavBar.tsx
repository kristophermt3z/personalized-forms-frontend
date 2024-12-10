import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./styles/NavBar.css";

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
          <h1 className="navbar-title">My Forms</h1>
          <Button onClick={handleLogout} label="Logout" />
        </>
      )}
    </nav>
  );
};

export default NavBar;
