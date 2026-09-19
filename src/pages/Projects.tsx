import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

const allProjects = [
  ...projects.dotnet,
  ...projects.python,
  ...projects.others,
  ...projects.semester,
];

type FilterType = "all" | "dotnet" | "python" | "others" | "semester";

const FILTERS: { key: FilterType; label: string; color: string }[] = [
  { key: "all", label: "All Projects", color: "#38bdf8" },
  { key: "dotnet", label: ".NET / C#", color: "#818cf8" },
  { key: "python", label: "Python", color: "#34d399" },
  { key: "others", label: "Others", color: "#f59e0b" },
  { key: "semester", label: "Academic", color: "#94a3b8" },
];

export default function Projects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div ref={hero.ref} style={{ marginBottom: "48px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Portfolio</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>All Projects</h1>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "520px", lineHeight: 1.7 }}>Comprehensive collection of .NET backend systems, Python tools, live deployments, and academic coursework.</p>
        </div>

        {/* Stats Summary Banner */}
        <div className="stats-summary-banner" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px", padding: "16px 18px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "16px" }}>
          {[
            { label: "Total Projects", value: allProjects.length, icon: "📦" },
            { label: "Completed", value: allProjects.filter(p => p.status === "Completed").length, icon: "✅" },
            { label: "In Progress", value: allProjects.filter(p => p.status === "In Progress").length, icon: "🚧" },
            { label: "Tech Stack", value: ".NET / Python / Web", icon: "⚡" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "16px" }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs-container" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {FILTERS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: "9px 18px",
                borderRadius: "100px",
                border: filter === key ? `1px solid ${color}55` : "1px solid rgba(255,255,255,0.08)",
                background: filter === key ? `${color}18` : "rgba(255,255,255,0.03)",
                color: filter === key ? color : "#64748b",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {label}
              <span style={{
                marginLeft: "6px",
                padding: "1px 7px",
                borderRadius: "100px",
                background: filter === key ? `${color}28` : "rgba(255,255,255,0.06)",
                fontSize: "11px",
              }}>
                {key === "all" ? allProjects.length : allProjects.filter(p => p.category === key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "24px" }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id + project.title} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const { ref, visible } = useVisible(index * 80, 0.05);

  const btnGradient = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
  const btnShadow = "0 4px 14px rgba(59, 130, 246, 0.35)";

  const categoryLabel =
    project.category === "dotnet" ? ".NET" :
    project.category === "python" ? "Python" :
    project.category === "others" ? "Others" : "Semester";

  const categoryIcon =
    project.category === "dotnet" ? "⚡ .NET" :
    project.category === "python" ? "🐍 Python" :
    project.category === "others" ? "🌐 Others" : "🏫 Academic";

  return (
    <div ref={ref} className="project-card" style={{
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
      overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      display: "flex", flexDirection: "column", height: "100%",
    }} onClick={onClick}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.3)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
      }}
    >
      <div style={{
        background: "rgba(15, 15, 15, 0.75)", backdropFilter: "blur(20px)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        flex: 1, height: "100%",
      }}>
        <div className="project-card-content" style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
            <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.3px" }}>{project.title}</h3>
            <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#94a3b8", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
              {categoryLabel}
            </span>
          </div>

          {/* Status indicator row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
            <span>{categoryIcon}</span>
            <span>•</span>
            <span style={{ color: project.status === "Completed" ? "#34d399" : "#f97316", fontWeight: 600 }}>{project.status}</span>
          </div>

          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{project.description}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {project.tech.slice(0, 4).map((t: string) => (
              <span key={t} style={{ padding: "4px 11px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", fontSize: "11px", fontWeight: 600, color: "#cbd5e1" }}>{t}</span>
            ))}
            {project.tech.length > 4 && <span style={{ padding: "4px 11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "100px", fontSize: "11px", fontWeight: 500, color: "#64748b" }}>+{project.tech.length - 4} more</span>}
          </div>
        </div>

        <div className="project-card-footer" style={{ padding: "0 28px 24px", display: "flex", gap: "10px" }}>
          {project.github && project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }} onClick={e => e.stopPropagation()}>
              <button style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
                color: "#ffffff", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.09)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.04)"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </button>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }} onClick={e => e.stopPropagation()}>
              <button style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px",
                border: "1px solid rgba(56,189,248,0.25)", background: "rgba(56,189,248,0.07)",
                color: "#38bdf8", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(56,189,248,0.14)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(56,189,248,0.07)"}
              >
                🔗 Live Preview
              </button>
            </a>
          )}
          {(!project.demo) && (
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: "10px", border: "none",
                background: btnGradient, color: "#ffffff", fontSize: "12px",
                fontWeight: 600, cursor: "pointer", boxShadow: btnShadow,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
            >
              View Details →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
