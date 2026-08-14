import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const statusMessages = [
  { emoji: "👋", text: "Initializing Developer Environment..." },
  { emoji: "👨‍💻", text: "Loading ASP.NET Core & C# Engine..." },
  { emoji: "🗄️", text: "Connecting SQL Server & EF Core Data..." },
  { emoji: "🚀", text: "Portfolio Ready!" },
];

const floatingIcons = ["⚡", "⚙️", "💻", "🛡️", "🚀"];

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [avatarEmoji, setAvatarEmoji] = useState("👨‍💻");

  useEffect(() => {
    // Phase triggers with relaxed pacing
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => { setPhase(2); setStatusIndex(1); setAvatarEmoji("⚙️"); }, 900);
    const t3 = setTimeout(() => { setPhase(3); setStatusIndex(2); setAvatarEmoji("⚡"); }, 1800);
    const t4 = setTimeout(() => { setStatusIndex(3); setAvatarEmoji("🚀"); }, 2600);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(p, 100));
    }, 90);

    const t5 = setTimeout(() => {
      setPhase(4);
      setTimeout(onComplete, 700);
    }, 3300);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#030308",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: phase === 4 ? 0 : 1,
        transform: phase === 4 ? "scale(1.06)" : "scale(1)",
        pointerEvents: phase === 4 ? "none" : "all",
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>

        {/* ANIMATED DEVELOPER CHARACTER / AVATAR ORB */}
        <div style={{
          position: "relative",
          width: "110px", height: "110px",
          margin: "0 auto 28px",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.7) translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {/* Rotating Tech Outer Ring */}
          <div style={{
            position: "absolute", inset: "-12px",
            borderRadius: "50%",
            border: "1.5px dashed rgba(56, 189, 248, 0.35)",
            animation: "spinRing 12s linear infinite",
          }} />

          {/* Glowing Halo Rings */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(99, 102, 241, 0.3))",
            filter: "blur(12px)",
            animation: "pulseHalo 2.5s ease-in-out infinite",
          }} />

          {/* Central Avatar Glass Sphere */}
          <div style={{
            width: "100%", height: "100%",
            borderRadius: "50%",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "44px",
            position: "relative", zIndex: 2,
            animation: "avatarBob 3s ease-in-out infinite",
          }}>
            <span style={{ transition: "transform 0.3s ease", display: "inline-block" }}>
              {avatarEmoji}
            </span>
          </div>

          {/* Floating Orbiting Mini Badges */}
          {floatingIcons.map((icon, idx) => {
            const angle = (idx / floatingIcons.length) * 360;
            return (
              <div key={icon} style={{
                position: "absolute",
                width: "26px", height: "26px",
                borderRadius: "50%",
                background: "rgba(10, 10, 15, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                transform: `rotate(${angle}deg) translate(65px) rotate(-${angle}deg)`,
                animation: `floatIcon 3s ease-in-out infinite ${idx * 0.4}s`,
              }}>
                {icon}
              </div>
            );
          })}
        </div>

        {/* Welcome Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 18px", borderRadius: "100px",
          background: "rgba(56, 189, 248, 0.1)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          marginBottom: "16px",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#38bdf8", boxShadow: "0 0 10px #38bdf8",
            display: "inline-block",
            animation: "pulseDot 1.5s ease-in-out infinite",
          }} />
          <span style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: "2px",
            color: "#38bdf8", textTransform: "uppercase",
            fontFamily: "'Poppins', 'Inter', sans-serif",
          }}>
            Muhammad Sufyan Khan
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: "'Poppins', 'Inter', sans-serif",
          fontSize: "clamp(26px, 5vw, 44px)",
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 0 16px",
          letterSpacing: "-1px",
          lineHeight: 1.1,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <span style={{
            background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 70%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            ASP.NET Core Developer
          </span>
        </h1>

        {/* Dynamic Emoji Status Line */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          color: "#94a3b8",
          margin: "0 0 32px",
          minHeight: "24px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          opacity: phase >= 1 ? 1 : 0,
          transition: "all 0.5s ease",
        }}>
          <span style={{ fontSize: "16px" }}>{statusMessages[statusIndex].emoji}</span>
          <span>{statusMessages[statusIndex].text}</span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: "260px", height: "4px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "100px",
          overflow: "hidden",
          margin: "0 auto",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.3s ease",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #10b981, #38bdf8, #6366f1)",
            borderRadius: "100px",
            transition: "width 0.15s ease-out",
            boxShadow: "0 0 14px rgba(56, 189, 248, 0.8)",
          }} />
        </div>

        {/* Progress Percentage */}
        <div style={{
          marginTop: "12px",
          fontFamily: "'Inter', monospace",
          fontSize: "12px",
          fontWeight: 600,
          color: "#38bdf8",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.3s ease",
          letterSpacing: "1px",
        }}>
          {Math.round(progress)}%
        </div>

      </div>

      <style>{`
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseHalo {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes avatarBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatIcon {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: drop-shadow(0 0 6px #38bdf8); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
