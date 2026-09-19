import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { globalLenis } from "../App";

export default function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pause Lenis smooth scrolling so mouse wheel scrolls the modal naturally
    globalLenis?.stop();
    const timer = setTimeout(() => setVisible(true), 10);
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      globalLenis?.start();
    };
  }, [onClose]);

  return createPortal(
    <div
      data-lenis-prevent
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99990,
        background: "rgba(26, 22, 19, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        overflowY: "auto",
        overscrollBehavior: "contain",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease-out",
      }}
      onClick={onClose}
      onWheel={e => e.stopPropagation()}
      className="project-modal-backdrop"
    >
      <div
        data-lenis-prevent
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "20px",
          maxWidth: "640px",
          width: "100%",
          maxHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
        onClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            background: "var(--bg)",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>{project.emoji || "🚀"}</span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--accent)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Project details
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--card)",
              color: "var(--muted)",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          data-lenis-prevent
          onWheel={e => e.stopPropagation()}
          style={{ padding: "24px 28px", overflowY: "auto", flex: 1, overscrollBehavior: "contain" }}
          className="project-modal-body"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h2>
            {project.status && (
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  border: "1px solid var(--line)",
                  color: project.status === "Completed" ? "#10b981" : "var(--accent)",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {project.status}
              </span>
            )}
            {project.expertise && (
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  border: "1px solid var(--line)",
                  color: "var(--accent)",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                ★ Core expertise
              </span>
            )}
          </div>

          {(project.semester || project.course) && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {project.semester && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "100px",
                    background: "var(--tint)",
                    border: "1px solid var(--line)",
                    color: "var(--tint-ink)",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  🏫 {project.semester}
                </span>
              )}
              {project.course && (
                <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 500, fontFamily: "'Newsreader', serif" }}>
                  • {project.course}
                </span>
              )}
            </div>
          )}

          <p
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: "22px",
            }}
          >
            {project.longDescription || project.description}
          </p>

          {project.tech?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  margin: "0 0 10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Technologies used
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t: string) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      padding: "4px 11px",
                      borderRadius: "100px",
                      background: "var(--tint)",
                      border: "1px solid var(--line)",
                      color: "var(--tint-ink)",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  margin: "0 0 10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Key features
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {project.features.map((f: string) => (
                  <div key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0, fontSize: "14px" }}>✓</span>
                    <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--ink)", lineHeight: 1.5 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.roadmap?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  margin: "0 0 10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Project roadmap
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.roadmap.map((r: string) => (
                  <div key={r} style={{ fontFamily: "'Newsreader', serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.learned && (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "12px",
                background: "var(--tint)",
                border: "1px solid var(--line)",
                marginBottom: "22px",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                What I learned
              </h4>
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--tint-ink)", lineHeight: 1.6, margin: 0 }}>
                {project.learned}
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ height: "40px", fontSize: "13px", padding: "0 18px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub repo
                </button>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ height: "40px", fontSize: "13px", padding: "0 18px", background: "var(--accent)" }}>
                  🌐 Live preview
                </button>
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ height: "40px", fontSize: "13px", padding: "0 18px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
