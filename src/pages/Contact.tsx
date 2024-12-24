import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Contact.css";
import Button from "../components/Button";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="contact-container">
      <div className="content">
        <h1 className="title">Empower your creativity with dynamic forms.</h1>
        <Button onClick={handleLogin} label="Get Started" />
        <p className="footer">Created by Kristopher Martinez</p>
      </div>
    </div>
  );
};

export default Contact;
