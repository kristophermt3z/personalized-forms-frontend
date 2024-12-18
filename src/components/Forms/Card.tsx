import React from "react";
import { useAuth } from "../../context/AuthContext";

import "./styles/Card.css";

interface CardProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  onEdit,
  onDelete,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {isAuthenticated && (
        <div className="card-actions">
          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
