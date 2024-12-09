import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

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
      <div className="message-container">
        <h1 className="animated-message">{message}</h1>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Home;
