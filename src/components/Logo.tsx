import { useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export default function Logo({ size = "md", animated = true }: LogoProps) {
  const [hovered, setHovered] = useState(false);

  const dimensions = {
    sm: { bracketSize: "15px", textSize: "12px", gap: "2px", padding: "3px 8px" },
    md: { bracketSize: "18px", textSize: "14px", gap: "3px", padding: "5px 10px" },
    lg: { bracketSize: "24px", textSize: "18px", gap: "5px", padding: "7px 14px" },
  }[size];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        userSelect: "none",
        cursor: "pointer",
        padding: dimensions.padding,
        borderRadius: "10px",
        background: hovered ? "rgba(56, 189, 248, 0.1)" : "rgba(255, 255, 255, 0.04)",
        border: `1px solid ${hovered ? "rgba(56, 189, 248, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
        backdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered
          ? "0 0 20px rgba(56, 189, 248, 0.3), inset 0 0 10px rgba(56, 189, 248, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
      className="msk-curly-logo"
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(16,185,129,0.4))",
          opacity: hovered ? 0.7 : 0,
          filter: "blur(6px)",
          transition: "opacity 0.3s ease",
          zIndex: -1,
        }}
      />

      {/* Left Bracket { */}
      <span
        style={{
          fontSize: dimensions.bracketSize,
          fontWeight: 800,
          color: "#38bdf8",
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
          display: "inline-block",
          lineHeight: 1,
          transform: hovered ? "translateX(-3px) scale(1.1)" : "translateX(0) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          textShadow: hovered ? "0 0 12px rgba(56, 189, 248, 0.9)" : "0 0 6px rgba(56, 189, 248, 0.4)",
          animation: animated ? "bracketPulse 3s ease-in-out infinite" : "none",
        }}
      >
        &#123;
      </span>

      {/* MSK Text */}
      <span
        style={{
          fontFamily: "'Poppins', 'Inter', sans-serif",
          fontSize: dimensions.textSize,
          fontWeight: 900,
          letterSpacing: "1px",
          margin: `0 ${dimensions.gap}`,
          background: "linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #10b981 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: animated ? "logoGradient 4s linear infinite" : "none",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.3s ease",
          filter: hovered ? "drop-shadow(0 0 8px rgba(168, 85, 247, 0.7))" : "none",
          lineHeight: 1,
        }}
      >
        MSK
      </span>

      {/* Right Bracket } */}
      <span
        style={{
          fontSize: dimensions.bracketSize,
          fontWeight: 800,
          color: "#10b981",
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace",
          display: "inline-block",
          lineHeight: 1,
          transform: hovered ? "translateX(3px) scale(1.1)" : "translateX(0) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          textShadow: hovered ? "0 0 12px rgba(16, 185, 129, 0.9)" : "0 0 6px rgba(16, 185, 129, 0.4)",
          animation: animated ? "bracketPulse 3s ease-in-out infinite 1.5s" : "none",
        }}
      >
        &#125;
      </span>

      {/* Glowing Status Dot */}
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 8px #10b981",
          marginLeft: "4px",
          display: "inline-block",
          animation: "dotPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      <style>{`
        @keyframes logoGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bracketPulse {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.8)); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}
