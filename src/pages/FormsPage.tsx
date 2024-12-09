import React, { useState, useEffect } from "react";
import axios from "axios";

const FormsDashboard: React.FC = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forms/get-forms`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data)
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h2>Your Forms</h2>
      <ul>
        {forms.map((form: any) => (
          <li key={form._id}>{form.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormsDashboard;
