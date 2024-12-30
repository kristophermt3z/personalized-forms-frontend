import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormTemplate from "../../components/Forms/FormTemplate";
import { submitReply } from "../../services/replyService";
import "./styles/Reply-ViewFormPage.css";
import Popup from "../../components/Popup";

const ReplyFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { formId } = useParams<{ formId: string }>();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleSubmit = async (
    responses: { fieldId: string; answer: string }[]
  ) => {
    try {
      const token = localStorage.getItem("token") || "";
      await submitReply({ formId, responses }, token);
      setPopupMessage("Reply submitted successfully!");
      setTimeout(() => navigate("/profile-forms"), 2000);
    } catch (error) {
      console.error("Error submitting reply:", error);
      setPopupMessage("Failed to submit reply. Please try again.");
    }
  };

  return (
    <div className="viewOrReplyFormTemplate">
      <FormTemplate formId={formId || ""} onSubmit={handleSubmit} />
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </div>
  );
};

export default ReplyFormPage;
