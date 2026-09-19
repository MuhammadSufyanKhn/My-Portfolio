import { useState } from "react";
import { Link } from "react-router-dom";
import { useVisible } from "../utils/useVisible";

const reasons = [
  { icon: "⚡", title: ".NET Core specialization", desc: "Solid hands-on experience with ASP.NET Core Web API, MVC, Entity Framework Core, and SQL Server." },
  { icon: "🎓", title: "Academic distinction", desc: "Maintaining a 3.97 CGPA at Sir Syed University demonstrates disciplined technical learning and execution." },
  { icon: "💻", title: "Production applications", desc: "Built end-to-end full-stack systems including Nexus Agent, Cab Management System, and Task Platform." },
  { icon: "💼", title: "Enterprise exposure", desc: "Completed .NET Developer internships at 10Pearls and CodeLabs Pvt Ltd collaborating on real codebases." },
  { icon: "🚀", title: "Fast engineering onboarding", desc: "Rapidly grasps existing architectures, reads specifications, and commits production-ready code." },
  { icon: "🎯", title: "Long-term dedication", desc: "Focused career path committed to mastering backend scalability, API security, and distributed systems." },
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
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Career opportunities
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Why Hire Me
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            I am actively seeking .NET Backend Developer Internship opportunities where I can solve real problems and contribute high-quality engineering.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="internship-reasons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px", marginBottom: "64px" }}>
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>

        {/* CTA Card */}
        <div
          ref={ctaVis.ref}
          style={{
            padding: "52px 36px",
            background: "var(--card)",
            borderRadius: "24px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            opacity: ctaVis.visible ? 1 : 0,
            transform: ctaVis.visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
          className="internship-cta-box flowing-card"
        >
          <div style={{ display: "inline-flex", padding: "4px 14px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "12px", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "16px", position: "relative", zIndex: 2 }}>
            Available immediately
          </div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.02em", position: "relative", zIndex: 2 }}>
            Ready to contribute from day one
          </h2>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "16px", color: "var(--muted)", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7, position: "relative", zIndex: 2 }}>
            If your engineering team is building with .NET Core and needs a motivated, fast-learning backend intern, let's connect.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
            <a
              href="/resume.pdf"
              download="Muhammad Sufyan Khan CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              onClick={handleDownload}
            >
              <button className="btn-primary" style={{ height: "46px", padding: "0 24px" }}>
                {downloading ? "Preparing download..." : "Download CV (PDF) ↓"}
              </button>
            </a>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ height: "46px", padding: "0 24px" }}>
                Get in touch →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const { ref, visible } = useVisible(index * 80);

  return (
    <div
      ref={ref}
      className="reason-card flowing-card"
      style={{
        padding: "24px",
        background: "var(--card)",
        borderRadius: "18px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "var(--tint)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          marginBottom: "16px",
        }}
      >
        {reason.icon}
      </div>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
        {reason.title}
      </h3>
      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
        {reason.desc}
      </p>
    </div>
  );
}
