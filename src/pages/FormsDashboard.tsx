import React, { useState, useEffect } from "react";
import GridForms from "../components/Forms/GridForms";
import SearchBar from "../components/Forms/SearchBar";
import { fetchForms } from "../services/formsService";
import "./styles/FormsDashboard.css";

interface Form {
  _id: string;
  title: string;
  description: string;
}

const FormsDashboard: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      (form) =>
        form.title.toLowerCase().includes(query) ||
        form.description.toLowerCase().includes(query)
    );
    setFilteredForms(filtered);
  };

  return (
    <div className="dashboard-container">
      <h2>Forms Dashboard</h2>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <GridForms forms={filteredForms} />
    </div>
  );
};

export default FormsDashboard;