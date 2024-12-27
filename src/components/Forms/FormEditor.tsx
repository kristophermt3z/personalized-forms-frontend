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
  onSubmit: (formData: FormData) => void;
  initialImage?: string | null;
}

const FormEditor: React.FC<FormEditorProps> = ({
  initialTitle = "",
  initialDescription = "",
  initialFields = [],
  onSubmit,
  initialImage = null,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(
    initialImage
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setExistingImage(null);
    }
  };

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("fields", JSON.stringify(fields));
    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
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

        <div className="form-group">
          <label>Image</label>
          {existingImage && (
            <img
              src={existingImage}
              alt="Existing"
              className="form-image-preview"
            />
          )}
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} required />
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
        </div>

        <div className="form-actions">
          <Button label="Add Field" onClick={addField} />
          <Button
            label="Save Form"
            onClick={() => document.forms[0].requestSubmit()}
          />
        </div>
      </form>
    </div>
  );
};

export default FormEditor;
