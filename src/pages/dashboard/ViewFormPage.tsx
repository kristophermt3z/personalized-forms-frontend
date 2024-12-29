import React from "react";
import { useParams } from "react-router-dom";
import FormTemplate from "../../components/Forms/FormTemplate";

const ViewFormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div>
      <FormTemplate formId={formId || ""} readOnly={true} />
    </div>
  );
};

export default ViewFormPage;
