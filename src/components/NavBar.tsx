import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import "./styles/NavBar.css";

const NavBar: React.FC = () => {
  const { logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHome = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const handleAdmin = () => {
    navigate("/admin");
    setMenuOpen(false);
  };

  const handleContact = () => {
    navigate("/contact");
    setMenuOpen(false);
  };

  const handleCreateForm = () => {
    navigate("/create-form");
    setMenuOpen(false);
  };

  const handleProfileForms = () => {
    navigate("/profile-forms");
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
            <li onClick={handleHome}>Home</li>
            <li onClick={handleLogin}>Login</li>
            <li onClick={handleContact}>Contact</li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li onClick={handleHome}>Home</li>
            {isAdmin && <li onClick={handleAdmin}>Admin Panel</li>}
            <li onClick={handleProfileForms}>My Forms</li>
            <li onClick={handleCreateForm}>Create</li>
            <li onClick={handleContact}>Contact</li>
            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
