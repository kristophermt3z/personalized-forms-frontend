import React, { useEffect, useState } from "react";
import { fetchFormById } from "../../services/formsService";
import Button from "../Button";
import "./styles/FormTemplate.css";

interface FormTemplateProps {
  formId: string;
  onSubmit?: (responses: { fieldId: string; answer: string }[]) => void;
  readOnly?: boolean;
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  formId,
  onSubmit,
  readOnly = false,
}) => {
  const [form, setForm] = useState<any>(null);
  const [responses, setResponses] = useState<
    { fieldId: string; answer: string }[]
  >([]);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await fetchFormById(formId);
        setForm(response.data);
        setResponses(
          response.data.fields.map((field: any) => ({
            fieldId: field.id,
            answer: "",
          }))
        );
      } catch (error) {
        console.error("Error loading form:", error);
      }
    };

    loadForm();
  }, [formId]);

  const handleChange = (fieldId: string, value: string) => {
    setResponses((prev) =>
      prev.map((response) =>
        response.fieldId === fieldId ? { ...response, answer: value } : response
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(responses);
    }
  };

  return (
    <div className="form-template">
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      {form.image && (
        <img src={form.image} alt={form.title} className="form-template-image" />
      )}
      <form onSubmit={handleSubmit}>
        {form.fields.map((field: any) => (
          <div key={field.id} className="form-field">
            <label>{field.label}</label>
            {field.type === "text" && (
              <input
                type="text"
                disabled={readOnly}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
              />
            )}
            {field.type === "checkbox" && (
              <input
                type="checkbox"
                disabled={readOnly}
                onChange={(e) =>
                  handleChange(field.id, e.target.checked ? "true" : "false")
                }
              />
            )}
          </div>
        ))}
        {!readOnly && <Button type="submit" label="Submit" />}
      </form>
    </div>
  );
};

export default FormTemplate;
