import React from "react";
import Aurora from "./background/Aurora";
import FluidGeometricCanvas from "./background/FluidGeometricCanvas";
import Spotlight from "./background/Spotlight";
import "./background/background.css";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="bg-container" aria-hidden="true">
      {/* Aurora Nebula Flowing Lights */}
      <Aurora />

      {/* Interactive Mouse Spotlight */}
      <Spotlight />

      {/* 60fps Particle-Free 3D Fluid Geometric & Ambient Wave Canvas */}
      <FluidGeometricCanvas />

      {/* Floating Ambient Energy Orbs */}
      <div className="energy-orb energy-orb-1" />
      <div className="energy-orb energy-orb-2" />
      <div className="energy-orb energy-orb-3" />
      <div className="energy-orb energy-orb-4" />
      <div className="energy-orb energy-orb-5" />

      {/* Pulsing Cyber Isometric Grid */}
      <div className="premium-grid" />

      {/* Subtle Film Grain Overlay */}
      <div className="film-grain" />

      {/* Vignette Edge Darkening for Spatial Depth */}
      <div className="vignette-overlay" />
    </div>
  );
};

export default AnimatedBackground;
