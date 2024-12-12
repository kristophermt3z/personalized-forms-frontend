import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import FormContainer from "../components/FormContainer";
import Popup from "../components/Popup";
import "./styles/Auth.css";

const Register: React.FC = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async ({ name, email, password }: { name?: string; email: string; password: string }) => {
    if (!name) {
      setPopupMessage("Name is required.");
      return;
    }
    if (!email) {
      setPopupMessage("Email is required.");
      return;
    }
    if (!password) {
      setPopupMessage("Password is required.");
      return;
    }

    try {
      await registerUser(name, email, password);
      setPopupMessage("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1000); // Redirect after closing popup
    } catch (error) {
      console.error("Registration failed:", error);
      setPopupMessage("Registration failed, please try again.");
    }
  };

  return (
    <div className="auth-container">
      <FormContainer
        title="Register"
        onSubmit={handleSubmit}
        isRegister={true}
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLink="/login"
      />
      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
};

export default Register;
