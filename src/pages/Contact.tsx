import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Contact.css";
import Button from "../components/Button";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";
import { ReactComponent as GitHubIcon } from "../assets/github.svg";
import { ReactComponent as PortfolioIcon } from "../assets/portafolio.svg";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="contact-container">
      <div className="content">
        <h1 className="title">Empower your creativity with dynamic forms.</h1>
        <Button onClick={handleLogin} label="Get Started" />
        <p className="footer">Created by Kristopher Martinez</p>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/kristophermt3z/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="icon" />
          </a>
          <a
            href="https://github.com/kristophermt3z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="icon" />
          </a>
          <a
            href="https://kristophermt3z.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PortfolioIcon className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
