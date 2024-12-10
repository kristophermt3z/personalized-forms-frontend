import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ParticlesBackground from "../components/ParticlesBackground";
import "./styles/Home.css";

const Home: React.FC = () => {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/helloWorld`);
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching hello world:", error);
        setMessage("Failed to fetch data.");
      }
    };

    fetchHello();
  }, []);

  return (
    <div className="home-container">
      <ParticlesBackground />
      <div className="content">
        <h1 className="title">{message}</h1>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
        <p className="footer">Created by Kristopher Martinez</p>
      </div>
    </div>
  );
};

export default Home;
