import { useState } from "react";
import { Link } from "react-router-dom";
import { useVisible } from "../utils/useVisible";

const reasons = [
  {
    num: "01",
    icon: "⚡",
    title: ".NET Core Specialization",
    desc: "Production hands-on engineering with ASP.NET Core Web API, MVC, Entity Framework Core, and SQL Server. Architected RESTful systems adhering to clean architecture and SOLID principles.",
  },
  {
    num: "02",
    icon: "🎓",
    title: "Academic Distinction (3.97 CGPA)",
    desc: "Maintaining a near-perfect 3.97 CGPA across 6 semesters at Sir Syed University demonstrates disciplined technical execution, algorithmic rigor, and consistency.",
  },
  {
    num: "03",
    icon: "💻",
    title: "Production Systems Portfolio",
    desc: "Engineered and deployed end-to-end full-stack architectures including Nexus Agent, Cab Management System, and live production platforms.",
  },
  {
    num: "04",
    icon: "💼",
    title: "Enterprise Industry Exposure",
    desc: "Completed .NET developer internships at 10Pearls and CodeLabs Pvt Ltd, writing production code, unit tests (xUnit, Moq), and collaborating with senior engineers.",
  },
  {
    num: "05",
    icon: "🚀",
    title: "Rapid Engineering Onboarding",
    desc: "Proven ability to understand complex codebases quickly, read technical specifications, configure environments, and submit high-quality pull requests from day one.",
  },
  {
    num: "06",
    icon: "🎯",
    title: "Long-Term Engineering Commitment",
    desc: "A dedicated career trajectory focused on mastering enterprise backend scalability, microservices, asynchronous message queues, and high-throughput systems.",
  },
];

export default function Internship() {
  const hero = useVisible();
  const ctaVis = useVisible(120);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <div ref={hero.ref} style={{ marginBottom: "36px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Candidate Profile
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Why Hire Me
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            A value proposition for engineering teams seeking a disciplined, high-velocity .NET backend developer intern ready to contribute immediately.
          </p>
        </div>

        {/* Competency Value Matrix (De-boxed Editorial Grid) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "36px 48px",
            marginBottom: "64px",
          }}
          className="competency-matrix-grid"
        >
          {reasons.map((r, i) => (
            <CompetencyItem key={r.title} reason={r} index={i} />
          ))}
        </div>

        {/* Executive Command Strip (De-boxed CTA) */}
        <div
          ref={ctaVis.ref}
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            padding: "36px 36px",
            boxShadow: "0 8px 30px -6px rgba(0, 0, 0, 0.05)",
            opacity: ctaVis.visible ? 1 : 0,
            transform: ctaVis.visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="executive-command-strip"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div style={{ maxWidth: "520px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "12px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "12px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 2px #10b98130" }} />
                Available Immediately for Internship
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                Ready to contribute from day one
              </h2>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                If your engineering team builds with .NET Core, C#, and SQL Server, and needs a motivated developer who values clean code and reliability, let's connect.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="/resume.pdf"
                download="Muhammad Sufyan Khan CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                onClick={handleDownload}
              >
                <button className="btn-primary" style={{ height: "46px", padding: "0 22px", fontSize: "14px" }}>
                  {downloading ? "Preparing..." : "Download CV (PDF) ↓"}
                </button>
              </a>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ height: "46px", padding: "0 22px", fontSize: "14px" }}>
                  Get in touch →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetencyItem({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const { ref, visible } = useVisible(index * 70);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `2px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
        paddingTop: "20px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "border-color 0.25s ease, opacity 0.6s ease, transform 0.6s ease",
      }}
      className="competency-item"
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "10px" }}>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "26px",
            fontWeight: 800,
            color: hovered ? "var(--accent)" : "var(--line-strong, rgba(150, 150, 150, 0.5))",
            letterSpacing: "-0.02em",
            transition: "color 0.25s ease",
          }}
        >
          {reason.num}
        </span>
        <span style={{ fontSize: "20px" }}>{reason.icon}</span>
      </div>

      <h3
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: "17px",
          fontWeight: 700,
          color: hovered ? "var(--accent)" : "var(--ink)",
          margin: "0 0 8px",
          letterSpacing: "-0.01em",
          transition: "color 0.2s ease",
        }}
      >
        {reason.title}
      </h3>

      <p
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: "14.5px",
          color: "var(--muted)",
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        {reason.desc}
      </p>
    </div>
  );
}
