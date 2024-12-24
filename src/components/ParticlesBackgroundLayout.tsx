import React from "react";
import ParticlesBackground from "./ParticlesBackground";
import { Outlet, useLocation } from "react-router-dom";

const ParticlesBackgroundLayout: React.FC = () => {
  const location = useLocation();

  // Define configurations based on route
  const isDefaultRoutes = ["/login", "/register", "/contact"].includes(location.pathname);

  return (
    <>
      <ParticlesBackground linksEnabled={isDefaultRoutes} moveSpeed={!isDefaultRoutes ? 1 : 3} />
      <Outlet />
    </>
  );
};

export default ParticlesBackgroundLayout;
