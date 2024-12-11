import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import Button from "../components/Button";
import { fetchHomeMessage } from "../services/homeService";

const Home: React.FC = () => {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetchHomeMessage();
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching hello world:", error);
        setMessage("Failed to fetch data.");
      }
    };

    fetchHello();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">{message}</h1>
        <Button onClick={handleLogin} label="Get Started" />
        <p className="footer">Created by Kristopher Martinez</p>
      </div>
    </div>
  );
};

export default Home;
