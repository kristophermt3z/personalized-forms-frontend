import React, { useState, useEffect } from "react";
import GridForms from "../../components/Forms/GridForms";
import SearchBar from "../../components/Forms/SearchBar";
import { fetchProfileForms } from "../../services/formsService";
import "./styles/ProfileForms.css";

interface Form {
  _id: string;
  title: string;
  description: string;
}

const ProfileForms: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadForms = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetchProfileForms(token);
      setForms(response.data);
      setFilteredForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };
  
  useEffect(() => {
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
      <h2>My Forms</h2>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <GridForms forms={filteredForms} onUpdate={loadForms} />
    </div>
  );
};

export default ProfileForms;
