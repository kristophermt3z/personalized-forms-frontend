import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/helloWorld`); 
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching hello world:", error);
        setMessage("Failed to fetch data.");
      }
    };

    fetchHelloWorld();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
