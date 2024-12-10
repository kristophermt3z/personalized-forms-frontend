import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import FormContainer from "../components/FormContainer";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ name, email, password }: { name?: string; email: string; password: string }) => {
    if (!name) {
      alert("Name is required.");
      return;
    }

    try {
      await registerUser(name, email, password);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed, please try again.");
    }
  };

  return (
    <FormContainer
      title="Register"
      onSubmit={handleSubmit}
      isRegister={true}
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLink="/login"
    />
  );
};

export default Register;
