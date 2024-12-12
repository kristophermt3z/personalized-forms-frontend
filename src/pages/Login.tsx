import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import AuthFormContainer from "../components/auth/AuthFormContainer";
import { useAuth } from "../context/AuthContext";
import Popup from "../components/Popup";
import "./styles/Auth.css";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await loginUser(email, password);
      login(response.data.token);
      navigate("/forms");
    } catch (error) {
      console.error("Login failed:", error);
      setPopupMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="auth-container">
      <AuthFormContainer
        title="Login"
        onSubmit={handleSubmit}
        footerText="Don't have an account?"
        footerLinkText="Register"
        footerLink="/register"
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

export default Login;
