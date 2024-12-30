import React from "react";
import { useParams } from "react-router-dom";
import FormTemplate from "../../components/Forms/FormTemplate";
import { submitReply } from "../../services/replyService";
import './styles/Reply-ViewFormPage.css'


const ReplyFormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();

  const handleSubmit = async (responses: { fieldId: string; answer: string }[]) => {
    try {
      const token = localStorage.getItem("token") || "";
      await submitReply({ formId, responses }, token);
      alert("Reply submitted successfully!");
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to submit reply. Please try again.");
    }
  };

  return (
    <div className="viewOrReplyFormTemplate">
      <FormTemplate formId={formId || ""} onSubmit={handleSubmit} />
    </div>
  );
};

export default ReplyFormPage;
