import React from "react";
import { useParams } from "react-router-dom";
import FormTemplate from "../../components/Forms/FormTemplate";
import './styles/Reply-ViewFormPage.css'

const ViewFormPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div className="viewOrReplyFormTemplate">
      <FormTemplate formId={formId || ""} readOnly={true} />
    </div>
  );
};

export default ViewFormPage;
