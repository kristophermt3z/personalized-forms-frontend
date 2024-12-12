import React from "react";
import "./styles/Popup.css";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <p className="popup-message">{message}</p>
        <button className="popup-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
