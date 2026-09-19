import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

export default function DotNetProjects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<typeof projects.dotnet[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "24px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-flex", padding: "4px 12px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "11px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            Backend specialization
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            .NET / C# Projects
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            Production-grade systems built with ASP.NET Core, Entity Framework Core, SQL Server, and clean software architecture.
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
            { label: "Total .NET systems", value: projects.dotnet.length },
            { label: "Completed", value: projects.dotnet.filter(p => p.status === "Completed").length },
            { label: "Core expertise", value: projects.dotnet.filter(p => p.expertise).length },
            { label: "Framework", value: "ASP.NET Core" },
          ].map(stat => (
            <div key={stat.label} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>{stat.value}</span>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "14px", color: "var(--muted)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "20px" }}>
          {projects.dotnet.map((project, i) => (
            <DotNetProjectCard key={project.id} project={project} index={i} onSelect={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DotNetProjectCard({ project, index, onSelect }: { project: typeof projects.dotnet[0]; index: number; onSelect: () => void }) {
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
      {/* Top Banner */}
      <div
        style={{
          padding: "20px 22px 14px",
          background: "var(--tint)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "32px" }}>{project.emoji || "💻"}</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {project.expertise && (
            <span style={{ padding: "2px 8px", borderRadius: "100px", background: "var(--card)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "11px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              ★ Expertise
            </span>
          )}
          <span style={{ padding: "2px 8px", borderRadius: "100px", background: "var(--card)", border: "1px solid var(--line)", color: project.status === "Completed" ? "#10b981" : "var(--accent)", fontSize: "11px", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
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
