import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import "./styles/NavBar.css";

const NavBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHome = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const handleCreateForm = () => {
    navigate("/create-form");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="navbar-logo" onClick={handleHome} />
      <button className="menu-toggle" onClick={handleToggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {!isAuthenticated && (
          <>
            <li onClick={handleLogin}>Login</li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li onClick={handleCreateForm}>Create</li>
            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
