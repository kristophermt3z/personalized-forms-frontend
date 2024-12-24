import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./styles/ParticlesBackground.css";

interface ParticlesBackgroundProps {
  linksEnabled?: boolean;
  moveSpeed?: number;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  linksEnabled = true,
  moveSpeed = 6,
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = (container: any) => {
    console.log("Particles Loaded:", container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: { value: "#ffffff" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#000" },
        links: {
          enable: linksEnabled,
          color: "#000",
          distance: 150,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: moveSpeed,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [linksEnabled, moveSpeed]
  );

  return (
    <>{init && <Particles id="tsparticles" options={options} particlesLoaded={particlesLoaded} />}</>
  );
};

export default ParticlesBackground;
