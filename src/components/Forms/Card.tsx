import React, { useState } from "react";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
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
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {isAuthenticated && (
        <div className="card-actions">
          <button
            className="settings-btn"
            onClick={openPopup}
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      )}
      {popupVisible && (
        <Popup message={`Actions for "${title}"`} onClose={closePopup}>
          <div className="popup-buttons">
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
