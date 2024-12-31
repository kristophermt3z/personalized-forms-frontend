import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  if (!form)
    return <div className="form-template-loading">Loading form...</div>;

  return (
    <div className="form-template">
      {readOnly && (
        <p className="read-only-warning" onClick={() => navigate("/login")}>
          You are in read-only mode. Click here to login and submit your
          answers.
        </p>
      )}
      <h2>{form.title}</h2>
      <p className="form-template-description">{form.description}</p>
      {form.image && (
        <img
          src={form.image}
          alt={form.title}
          className="form-template-image"
        />
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
            {field.type === "number" && (
              <input
                type="number"
                disabled={readOnly}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
              />
            )}
            {field.type === "checkbox" && (
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    disabled={readOnly}
                    onChange={(e) =>
                      handleChange(
                        field.id,
                        e.target.checked ? "true" : "false"
                      )
                    }
                  />
                  Yes
                </label>
                <span>(Unselected = No)</span>
              </div>
            )}
          </div>
        ))}
        {!readOnly && <Button type="submit" label="Submit" />}
      </form>
    </div>
  );
};

export default FormTemplate;
