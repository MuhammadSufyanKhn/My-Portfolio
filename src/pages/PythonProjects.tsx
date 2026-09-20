import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

export default function PythonProjects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<typeof projects.python[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "24px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", padding: "4px 12px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "11px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            Scripting & Utilities
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Python Projects
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            File manipulation utilities, algorithm demonstrations, and core scripting workflows.
          </p>
        </div>

        {/* Stats Summary Banner */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "40px",
            padding: "16px 22px",
            background: "var(--tint)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
          }}
          className="stats-summary-banner"
        >
          {[
            { label: "Total utilities", value: projects.python.length },
            { label: "Completed", value: projects.python.filter(p => p.status === "Completed").length },
            { label: "Language", value: "Python 3" },
          ].map(stat => (
            <div key={stat.label} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>{stat.value}</span>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "14px", color: "var(--muted)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "20px" }}>
          {projects.python.map((project, i) => (
            <PythonCard key={project.id} project={project} index={i} onSelect={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PythonCard({ project, index, onSelect }: { project: typeof projects.python[0]; index: number; onSelect: () => void }) {
  const { ref, visible } = useVisible(index * 80);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: hovered ? "0 12px 32px -8px rgba(194, 65, 12, 0.12)" : "0 2px 8px rgba(0, 0, 0, 0.03)",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-4px)" : "none") : "translateY(20px)",
      }}
      className="project-card"
    >
      {/* Top Image Banner with Window Chrome */}
      <div
        style={{
          height: "190px",
          position: "relative",
          overflow: "hidden",
          background: "var(--tint)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: "brightness(0.92)",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px" }}>
            {project.emoji || "🐍"}
          </div>
        )}
        {/* Subtle overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Window controls on top-left */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            display: "flex",
            gap: "5px",
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: "100px",
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#eab308" }} />
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
        </div>
        {/* Status badge on top-right */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "14px",
          }}
        >
          <span
            style={{
              padding: "3px 9px",
              borderRadius: "100px",
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: project.status === "Completed" ? "#4ade80" : "#fb923c",
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="project-card-content">
        <div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
            {project.tech?.slice(0, 4).map(t => (
              <span
                key={t}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  color: "var(--tint-ink)",
                  border: "1px solid var(--line)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div style={{ display: "flex", gap: "8px", paddingTop: "14px", borderTop: "1px solid var(--line)" }} className="project-card-footer">
          <button
            onClick={onSelect}
            className="btn-primary"
            style={{ flex: 1, height: "38px", fontSize: "13px", justifyContent: "center" }}
          >
            Details →
          </button>
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ height: "38px", width: "38px", padding: 0, justifyContent: "center" }} title="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
