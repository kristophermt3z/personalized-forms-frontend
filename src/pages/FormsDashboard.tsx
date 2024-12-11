import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/FormsDashboard.css";

interface Form {
  _id: string;
  title: string;
  description: string;
}

const FormsDashboard: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Búsqueda de texto
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);

  // Fetch forms from the backend
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/forms/get-forms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForms(response.data);
        setFilteredForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  // Handle search query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = forms.filter(
      (form) =>
        form.title.toLowerCase().includes(query) || form.description.toLowerCase().includes(query)
    );
    setFilteredForms(filtered);
  };

  return (
    <div className="dashboard-container">
      <h2>Forms Dashboard</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search forms..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Forms List */}
      <ul className="forms-list">
        {filteredForms.map((form) => (
          <li key={form._id} className="form-item">
            <div>
              <h3>{form.title}</h3>
              <p>{form.description}</p>
            </div>
            <div className="form-actions">
              <button onClick={() => alert(`Edit form ${form._id}`)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => alert(`Delete form ${form._id}`)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsDashboard;
