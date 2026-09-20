import { useState } from "react";
import { experience } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Experience() {
  const hero = useVisible();

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "36px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Work History
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Professional Experience
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            Hands-on backend software development experience delivering production code across enterprise environments and real-world client architectures.
          </p>
        </div>

        {/* Executive Career Timeline (De-boxed Spine Architecture) */}
        <div style={{ position: "relative", paddingLeft: "32px" }} className="career-timeline-wrapper">
          {/* Vertical Spine Line */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              bottom: "24px",
              left: "7px",
              width: "2px",
              background: "linear-gradient(to bottom, var(--accent) 0%, var(--line) 30%, var(--line) 90%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Timeline Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
            {experience.map((exp, i) => (
              <CareerTimelineNode key={exp.company} exp={exp} index={i} isLast={i === experience.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerTimelineNode({ exp, index, isLast }: { exp: typeof experience[0]; index: number; isLast: boolean }) {
  const { ref, visible } = useVisible(index * 100);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      className="career-timeline-node"
    >
      {/* Node Hub Indicator on Spine */}
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "-32px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "var(--bg)",
          border: `2.5px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered ? "0 0 0 5px rgba(194, 65, 12, 0.25)" : "0 0 0 3px var(--bg)",
          transition: "all 0.3s ease",
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: hovered ? "var(--accent)" : "var(--muted)",
            transition: "background 0.3s ease",
          }}
        />
      </div>

      {/* Content Container (Open Architecture, not an enclosed repeating box) */}
      <div
        style={{
          paddingBottom: isLast ? "0" : "28px",
          borderBottom: isLast ? "none" : "1px solid var(--line)",
        }}
      >
        {/* Role & Company Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(20px, 2.8vw, 24px)",
                  fontWeight: 700,
                  color: hovered ? "var(--accent)" : "var(--ink)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s ease",
                }}
              >
                {exp.role}
              </h2>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  color: "var(--tint-ink)",
                  border: "1px solid var(--line)",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {exp.type}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--accent)" }}>
                {exp.company}
              </span>
              <span style={{ color: "var(--line)" }}>·</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)" }}>
                📅 {exp.duration}
              </span>
              <span style={{ color: "var(--line)" }}>·</span>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "13px", color: "var(--muted)" }}>
                📍 {exp.location}
              </span>
            </div>
          </div>
        </div>

        {/* Concise Description */}
        <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "15.5px", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 18px" }}>
          {exp.description}
        </p>

        {/* Responsibilities with Checkmarks */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "10px" }}>
            Key Contributions & Deliverables
          </div>
          <div style={{ maxHeight: expanded ? "1000px" : "180px", overflow: "hidden", transition: "max-height 0.4s ease", position: "relative" }}>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {exp.responsibilities.map((r) => (
                <li key={r} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ width: "18px", height: "18px", borderRadius: "6px", background: "var(--tint)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>
                    ✓
                  </span>
                  <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14.5px", color: "var(--muted)", lineHeight: 1.6 }}>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
            {!expanded && exp.responsibilities.length > 3 && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to bottom, transparent, var(--bg))", pointerEvents: "none" }} />
            )}
          </div>
          {exp.responsibilities.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginTop: "10px",
                padding: "4px 10px",
                border: "1px solid var(--line)",
                borderRadius: "6px",
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginRight: "6px" }}>
              Stack:
            </span>
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  background: "var(--card)",
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
  );
}
