import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormEditor from "../../components/Forms/FormEditor";
import { fetchFormById, updateForm } from "../../services/formsService";
import Popup from "../../components/Popup";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

const EditFormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>(); // Get form ID from URL
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetchFormById(formId || "", token);
        const { title, description, fields } = response.data;

        setFormTitle(title);
        setFormDescription(description);
        setFormFields(fields);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setPopupMessage("Failed to load form. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (formId) {
      loadForm();
    }
  }, [formId]);

  const handleSubmit = async (formData: {
    title: string;
    description: string;
    fields: FormField[];
  }) => {
    try {
      const token = localStorage.getItem("token") || "";
      await updateForm(formId || "", formData, token);
      setPopupMessage("Form updated successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (error) {
      console.error("Error updating form:", error);
      setPopupMessage("Failed to update form. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <FormEditor
        key={formId}
        initialTitle={formTitle}
        initialDescription={formDescription}
        initialFields={formFields}
        onSubmit={handleSubmit}
      />
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </div>
  );
};

export default EditFormPage;
