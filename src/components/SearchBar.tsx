import React from "react";
import "./styles/SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search forms..."
        value={value}
        onChange={onChange}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
