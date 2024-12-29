import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { deleteFormById } from "../../services/formsService";
import "./styles/GridForms.css";

interface Form {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

interface GridFormsProps {
  forms: Form[];
  onUpdate: () => void;
}

const GridForms: React.FC<GridFormsProps> = ({ forms, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token") || "";

    try {
      await deleteFormById(id, token);
      onUpdate();
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete form. Please try again.");
    }
  };

  return (
    <div className="grid">
      {forms.map((form) => (
        <Card
          key={form._id}
          title={form.title}
          description={form.description}
          image={form.image}
          onEdit={() => navigate(`/edit-form/${form._id}`)}
          onDelete={() => handleDelete(form._id)}
          onReply={() => alert("Reply clicked")}
          onViewResponses={() => alert("View Responses clicked")}
        />
      ))}
    </div>
  );
};

export default GridForms;
