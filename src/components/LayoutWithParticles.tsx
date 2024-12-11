import React from "react";
import ParticlesBackground from "./ParticlesBackground";
import { Outlet } from "react-router-dom";

const LayoutWithParticles: React.FC = () => {
  return (
    <>
      <ParticlesBackground />
      <Outlet />
    </>
  );
};

export default LayoutWithParticles;
