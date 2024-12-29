import React from "react";
import { useParams } from "react-router-dom";
import FormTemplate from "../../components/Forms/FormTemplate";

const ReplyFormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();

  const handleSubmit = async (responses: { fieldId: string; answer: string }[]) => {
    console.log("User responses:", responses);
    // Backend
  };

  return (
    <div>
      <FormTemplate formId={formId || ""} onSubmit={handleSubmit} />
    </div>
  );
};

export default ReplyFormPage;
