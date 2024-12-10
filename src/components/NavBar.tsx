import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import "./styles/NavBar.css";

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <h1>My Forms</h1>
      <Button onClick={handleLogout} label="Logout" />
    </nav>
  );
};

export default NavBar;
