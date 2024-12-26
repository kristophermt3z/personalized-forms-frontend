import React from "react";
import "./styles/Popup.css";

interface PopupProps {
  message: string
  children?: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <p className="popup-message">{message}</p>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
