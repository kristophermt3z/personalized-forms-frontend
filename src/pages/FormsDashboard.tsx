import React, { useState, useEffect } from "react";
import { fetchForms } from "../services/formsService";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import Card from "../components/Card";
import "./styles/FormsDashboard.css";

const FormsDashboard: React.FC = () => {
  const [forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState([]);

  useEffect(() => {
    const loadForms = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetchForms(token);
        setForms(response.data);
        setFilteredForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    loadForms();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = forms.filter(
      (form:any) =>
        form.title.toLowerCase().includes(query) || form.description.toLowerCase().includes(query)
    );
    setFilteredForms(filtered);
  };

  return (
    <div className="dashboard-container">
      <h2>Forms Dashboard</h2>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <Grid>
        {filteredForms.map((form:any) => (
          <Card
            key={form._id}
            title={form.title}
            description={form.description}
            onEdit={() => alert(`Edit form ${form._id}`)}
            onDelete={() => alert(`Delete form ${form._id}`)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default FormsDashboard;
