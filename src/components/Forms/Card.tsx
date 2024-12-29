import React, { useState } from "react";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

import "./styles/Card.css";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  onEdit: () => void;
  onDelete: () => void;
  onReply: () => void;
  onViewResponses: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  onEdit,
  onDelete,
  onReply,
  onViewResponses,
}) => {
  const { isAuthenticated } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const openAlert = () => alert("Hola");
  const closePopup = () => setPopupVisible(false);

  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <h3>{title}</h3>
      <p className="card-description">{description}</p>
      {isAuthenticated && (
        <div className="card-actions">
          <button
            className="settings-btn"
            onClick={openPopup}
            aria-label="Settings"
          >
            📝
          </button>
        </div>
      )}
      {!isAuthenticated && (
        <div className="card-actions">
          <button
            className="settings-btn"
            onClick={openAlert}
            aria-label="Settings"
          >
            🔎
          </button>
        </div>
      )}
      {popupVisible && (
        <Popup message={`Actions for "${title}"`} onClose={closePopup}>
          <div className="popup-buttons">
          <Button
              label="Reply"
              onClick={() => {
                onReply();
                closePopup();
              }}
            />
            <Button
              label="View Responses"
              onClick={() => {
                onViewResponses();
                closePopup();
              }}
            />
            <Button
              label="Edit"
              onClick={() => {
                onEdit();
                closePopup();
              }}
            />
            <Button
              label="Delete"
              onClick={() => {
                onDelete();
                closePopup();
              }}
            />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Card;
