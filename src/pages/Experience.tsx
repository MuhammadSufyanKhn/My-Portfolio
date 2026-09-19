import { useState } from "react";
import { experience } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Experience() {
  const hero = useVisible();

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Work history
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Professional Experience
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            Hands-on software development experience across enterprise environments and production client applications.
          </p>
        </div>

        {/* Experience Cards */}
        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
  const { ref, visible } = useVisible(index * 120);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: "28px",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <div
        style={{
          background: "var(--card)",
          border: `1.5px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          animation: "flowingBorderGlow 5s ease-in-out infinite",
          boxShadow: hovered ? "0 16px 40px -8px rgba(194, 65, 12, 0.22), 0 0 0 1px var(--accent)" : "0 4px 20px rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Flowing sheen light stream */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(90deg, transparent, rgba(194, 65, 12, 0.06), transparent)",
            animation: `flowSheen 6s infinite ease-in-out ${index * 1.5}s`,
            pointerEvents: "none",
          }}
        />
        <div style={{ padding: "32px 36px", position: "relative", zIndex: 1 }} className="exp-card-body">
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px", marginBottom: "18px" }} className="exp-header-row">
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }} className="exp-icon-title-group">
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--tint)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                }}
                className="exp-icon-box"
              >
                {exp.icon}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                  {exp.role}
                </h2>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--accent)", marginBottom: "6px" }}>
                  {exp.company}
                </div>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    📅 {exp.duration}
                  </span>
                  <span style={{ fontFamily: "'Newsreader', serif", fontSize: "13px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    📍 {exp.location}
                  </span>
                </div>
              </div>
            </div>

            <span
              style={{
                padding: "4px 12px",
                borderRadius: "100px",
                background: "var(--tint)",
                color: "var(--tint-ink)",
                border: "1px solid var(--line)",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                alignSelf: "flex-start",
                whiteSpace: "nowrap",
              }}
            >
              {exp.type}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 20px" }}>
            {exp.description}
          </p>

          {/* Key Responsibilities */}
          <div style={{ marginBottom: "22px" }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "12px", fontWeight: 700, color: "var(--muted)", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Key responsibilities
            </h3>
            <div style={{ maxHeight: expanded ? "1000px" : "170px", overflow: "hidden", transition: "max-height 0.4s ease", position: "relative" }}>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {exp.responsibilities.map((r) => (
                  <li key={r} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "6px", background: "var(--tint)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>
                      ✓
                    </span>
                    <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
              {!expanded && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50px", background: "linear-gradient(to bottom, transparent, var(--card))", pointerEvents: "none" }} />
              )}
            </div>
            {exp.responsibilities.length > 3 && (
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  marginTop: "12px",
                  padding: "5px 12px",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  background: "var(--tint)",
                  color: "var(--accent)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {expanded ? "Show less ▲" : "Show more ▼"}
              </button>
            )}
          </div>

          {/* Technologies Used */}
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--muted)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Technologies & Tools
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    background: "var(--tint)",
                    border: "1px solid var(--line)",
                    color: "var(--tint-ink)",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
