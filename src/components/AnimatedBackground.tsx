import React from "react";

/**
 * Soft light-blue periwinkle background — neutral, premium, matches
 * the site's blue/indigo/purple accent palette perfectly.
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(145deg, #eef2ff 0%, #f0f4ff 40%, #f5f3ff 75%, #eef2ff 100%)",
        overflow: "hidden",
      }}
    >
      {/* Top-left soft blue glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-80px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Top-right soft indigo accent */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom-center warm accent */}
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Ultra-subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
