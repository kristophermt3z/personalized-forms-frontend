import React from "react";
import ParticlesBackground from "./ParticlesBackground";
import { Outlet } from "react-router-dom";

const ParticlesBackgroundLayout: React.FC = () => {
  return (
    <>
      <ParticlesBackground />
      <Outlet />
    </>
  );
};

export default ParticlesBackgroundLayout;
