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
  onViewTemplate: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  onEdit,
  onDelete,
  onReply,
  onViewResponses,
  onViewTemplate,
}) => {
  const { isAuthenticated } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <div className="card-text">
          <h3 data-title={title}>{title}</h3>
          <p className="card-description" data-description={description}>
            {description}
          </p>
        </div>
        <div className="card-actions">
          {isAuthenticated ? (
            <button
              className="settings-btn"
              onClick={openPopup}
              aria-label="Settings"
            >
              📝
            </button>
          ) : (
            <button
              className="settings-btn"
              onClick={onViewTemplate}
              aria-label="Settings"
            >
              🔎
            </button>
          )}
        </div>
      </div>
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
