import { useState } from "react";
import { useVisible } from "../utils/useVisible";

const reasons = [
  { icon: "⚡", title: ".NET Expertise", desc: "Solid hands-on experience with ASP.NET Core, Web API, Entity Framework Core, and SQL Server.", color: "#a855f7" },
  { icon: "🎓", title: "Academic Excellence", desc: "Maintaining a 3.97 CGPA at Sir Syed University reflects my ability to learn quickly and deliver under pressure.", color: "#10b981" },
  { icon: "💻", title: "Real Project Experience", desc: "Built production-level systems including Cab Management System and Task Management Platform.", color: "#f59e0b" },
  { icon: "💼", title: "Industry Experience", desc: "Completed .NET Developer internships at 10Pearls and CodeLabs Pvt Ltd.", color: "#ec4899" },
  { icon: "🚀", title: "Fast Learner", desc: "I go from zero to productive quickly. Give me a codebase on Monday, I'll be contributing meaningful PRs by Wednesday.", color: "#38bdf8" },
  { icon: "🎯", title: "Career-Driven", desc: "I want to build real things, solve complex architectural problems, and grow into a top-tier .NET backend engineer.", color: "#f97316" },
];

export default function Internship() {
  const hero = useVisible();
  const ctaVis = useVisible(200);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }}>
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* Animated Hero */}
        <div ref={hero.ref} style={{ marginBottom: "64px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease 0.2s" }}>Hire Me</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1, opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>
            Why <span style={{ background: "linear-gradient(135deg, #10b981, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hire Me</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#a1a1aa", maxWidth: "540px", lineHeight: 1.7, opacity: hero.visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
            I am actively seeking .NET Developer Internship opportunities where I can contribute to backend services and production software.
          </p>
        </div>

        {/* Reason Cards with staggered animations */}
        <div className="internship-reasons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px", marginBottom: "64px" }}>
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>

        {/* Animated CTA Section */}
        <div ref={ctaVis.ref} style={{
          padding: "56px 32px",
          background: "rgba(15, 15, 15, 0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: ctaVis.visible ? 1 : 0,
          transform: ctaVis.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)",
        }} className="internship-cta-box">
          {/* Animated gradient border top */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, #10b981, #38bdf8, #6366f1, #10b981)",
            backgroundSize: "300% 100%",
            animation: ctaVis.visible ? "gradientSlide 4s linear infinite" : "none",
          }} />

          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-1px", opacity: ctaVis.visible ? 1 : 0, transform: ctaVis.visible ? "translateY(0)" : "translateY(15px)", transition: "all 0.6s ease 0.3s" }}>Ready to make an impact</h2>
          <p style={{ fontSize: "16px", color: "#a1a1aa", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.7, opacity: ctaVis.visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>If you're building software and need a dedicated .NET intern on your team, let's talk.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", opacity: ctaVis.visible ? 1 : 0, transform: ctaVis.visible ? "translateY(0)" : "translateY(15px)", transition: "all 0.6s ease 0.6s" }}>
            <a href="/resume.pdf" download="Muhammad_Sufyan_Khan_CV.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} onClick={handleDownload}>
              <button style={{ padding: "14px 28px", borderRadius: "14px", border: "none", background: downloading ? "linear-gradient(135deg, #059669, #047857)" : "linear-gradient(135deg, #10b981, #059669)", color: "#fff", fontSize: "15px", fontWeight: 600, cursor: downloading ? "wait" : "pointer", transition: "all 0.3s ease", boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)" }}>
                {downloading ? "⬇️ Downloading Resume..." : "📄 Download Resume"}
              </button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @media (max-width: 480px) {
          .internship-cta-box {
            padding: 28px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const { ref, visible } = useVisible(index * 100);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="reason-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${hovered ? `${reason.color}40` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "18px",
        transition: `all 0.5s cubic-bezier(0.23,1,0.32,1)`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(30px) scale(0.95)",
        boxShadow: hovered ? `0 16px 32px -8px ${reason.color}20` : "none",
        cursor: "default",
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: `${reason.color}15`, border: `1.5px solid ${reason.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", marginBottom: "16px",
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>{reason.icon}</div>
      <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px" }}>{reason.title}</h3>
      <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>{reason.desc}</p>
    </div>
  );
}
