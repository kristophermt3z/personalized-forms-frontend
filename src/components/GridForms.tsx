import React from "react";
import Card from "./Card";
import "./styles/GridForms.css";

interface Form {
  _id: string;
  title: string;
  description: string;
}

interface GridFormsProps {
  forms: Form[];
}

const GridForms: React.FC<GridFormsProps> = ({ forms }) => {
  return (
    <div className="grid">
      {forms.map((form) => (
        <Card
          key={form._id}
          title={form.title}
          description={form.description}
          onEdit={() => alert(`Edit form ${form._id}`)}
          onDelete={() => alert(`Delete form ${form._id}`)}
        />
      ))}
    </div>
  );
};

export default GridForms;
