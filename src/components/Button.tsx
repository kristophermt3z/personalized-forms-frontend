import React from "react";
import "./styles/Button.css";

interface ButtonProps {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type = "button" }) => {
  return (
    <button className="custom-btn" onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
