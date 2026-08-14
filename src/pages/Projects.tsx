import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

const allProjects = [
  ...projects.dotnet,
  ...projects.python,
  ...projects.semester,
];

export default function Projects() {
  const hero = useVisible();
  const [filter, setFilter] = useState<"all" | "dotnet" | "python" | "semester">("all");
  const [selected, setSelected] = useState<any | null>(null);

  const filtered = allProjects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "48px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Portfolio</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>All Projects</h1>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "520px", lineHeight: 1.7 }}>Comprehensive collection of .NET backend systems, Python tools, and academic coursework.</p>
        </div>

        {/* Stats Summary Banner */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px", padding: "20px 24px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "16px" }}>
          {[
            { label: "Total Projects", value: allProjects.length, icon: "📦" },
            { label: "Completed", value: allProjects.filter(p => p.status === "Completed").length, icon: "✅" },
            { label: "In Progress", value: allProjects.filter(p => p.status === "In Progress").length, icon: "🚧" },
            { label: "Tech Stack", value: "C# .NET + Python + Assembly", icon: "⚡" },
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
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {[
            { id: "all", label: "All Projects", count: allProjects.length },
            { id: "dotnet", label: ".NET Core", count: projects.dotnet.length },
            { id: "python", label: "Python", count: projects.python.length },
            { id: "semester", label: "Semester", count: projects.semester.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              style={{
                padding: "10px 20px", borderRadius: "100px",
                border: filter === tab.id ? "1px solid rgba(56,189,248,0.5)" : "1px solid rgba(255,255,255,0.08)",
                background: filter === tab.id ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.04)",
                color: filter === tab.id ? "#38bdf8" : "#94a3b8",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              {tab.label}
              <span style={{ padding: "2px 7px", borderRadius: "100px", background: filter === tab.id ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.08)", fontSize: "11px" }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
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

  return (
    <div ref={ref} style={{
      background: "rgba(15, 15, 15, 0.75)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
      overflow: "hidden", cursor: "pointer", transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "space-between",
    }} onClick={onClick}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.3)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ padding: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
          <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.3px" }}>{project.title}</h3>
          <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#94a3b8", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
            {project.category === "dotnet" ? ".NET" : project.category === "python" ? "Python" : "Semester"}
          </span>
        </div>

        <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 20px" }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {project.tech.slice(0, 4).map((t: string) => (
            <span key={t} style={{ padding: "4px 11px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", fontSize: "11px", fontWeight: 600, color: "#cbd5e1" }}>{t}</span>
          ))}
          {project.tech.length > 4 && <span style={{ padding: "4px 11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "100px", fontSize: "11px", fontWeight: 500, color: "#64748b" }}>+{project.tech.length - 4} more</span>}
        </div>
      </div>

      <div style={{ padding: "0 28px 24px", display: "flex", gap: "10px" }}>
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
      </div>
    </div>
  );
}
