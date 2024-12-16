import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import Button from "../Button";
import "./styles/FormEditor.css";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

interface FormEditorProps {
  initialTitle?: string;
  initialDescription?: string;
  initialFields?: FormField[];
  onSubmit: (formData: {
    title: string;
    description: string;
    fields: FormField[];
    authorId: string;
  }) => void;
}

const FormEditor: React.FC<FormEditorProps> = ({
  initialTitle = "",
  initialDescription = "",
  initialFields = [],
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [fields, setFields] = useState<FormField[]>(initialFields);

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now().toString(), type: "text", label: "", required: false },
    ]);
  };

  const updateField = (
    index: number,
    key: keyof FormField,
    value: string | boolean
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      const decoded: { id: string } = jwtDecode(token); // Extract `authorId` from token
      onSubmit({ title, description, fields, authorId: decoded.id });
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  return (
    <div className="form-editor-container">
      <form onSubmit={handleSubmit}>
        <h2>{initialTitle ? "Edit Form" : "Create Form"}</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-fields">
          <h3>Fields</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="field-item">
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
                required
              />
              <select
                value={field.type}
                onChange={(e) => updateField(index, "type", e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="checkbox">Checkbox</option>
              </select>
              <label>
                Required
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(index, "required", e.target.checked)
                  }
                />
              </label>
              <Button label="Remove" onClick={() => removeField(index)} />
            </div>
          ))}
          <Button label="Add Field" onClick={addField} />
        </div>

        <Button
          label="Save Form"
          onClick={() => document.forms[0].requestSubmit()}
        />
      </form>
    </div>
  );
};

export default FormEditor;
