import React from "react";
import { useNavigate } from "react-router-dom";
import FormEditor from "../../components/Forms/FormEditor";
import { createForm } from "../../services/formsService";
import Popup from "../../components/Popup";

const CreateFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = React.useState<string | null>(null);

  const handleSubmit = async (formData: {
    title: string;
    description: string;
    fields: any[];
  }) => {
    try {
      const token = localStorage.getItem("token") || "";
      console.log(formData)
      await createForm(formData, token);
      setPopupMessage("Form created successfully!");
      setTimeout(() => navigate("/forms"), 2000); // Redirect after success
    } catch (error) {
      console.error("Error creating form:", error);
      setPopupMessage("Failed to create form. Please try again.");
    }
  };

  return (
    <div>
      <FormEditor onSubmit={handleSubmit} />
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </div>
  );
};

export default CreateFormPage;
