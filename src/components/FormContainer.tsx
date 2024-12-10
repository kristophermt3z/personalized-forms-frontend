import React, { useState } from "react";
import Button from "./Button";
import "./styles/FormContainer.css";
import { Link } from "react-router-dom";

interface FormContainerProps {
  title: string;
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  isRegister?: boolean;
  footerText?: string;
  footerLinkText?: string;
  footerLink?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  onSubmit,
  isRegister,
  footerText,
  footerLinkText,
  footerLink,
}) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = form;
    if (!isRegister) {
      onSubmit({ email, password });
    } else {
      onSubmit({ name, email, password });
    }
  };

  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" label={title} />
      </form>
      {footerText && footerLink && footerLinkText && (
        <p className="footer">
          {footerText} <Link to={footerLink}>{footerLinkText}</Link>
        </p>
      )}
    </div>
  );
};

export default FormContainer;
