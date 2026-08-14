import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

export default function PythonProjects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<typeof projects.python[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "56px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ padding: "8px 14px", background: "rgba(55,118,171,0.08)", border: "1px solid rgba(55,118,171,0.2)", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#3776AB", letterSpacing: "2px", textTransform: "uppercase" }}>🐍 Python</div>
          </div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: 1.15 }}>Python Projects</h1>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "520px", lineHeight: 1.7 }}>Python utility and academic projects that demonstrate versatility beyond .NET.</p>
        </div>

        {/* Stats Summary Banner */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px", padding: "20px 24px", background: "rgba(55,118,171,0.06)", border: "1px solid rgba(55,118,171,0.15)", borderRadius: "16px" }}>
          {[
            { label: "Total Projects", value: projects.python.length, icon: "📦" },
            { label: "Completed", value: projects.python.filter(p => p.status === "Completed").length, icon: "✅" },
            { label: "In Progress", value: projects.python.filter(p => p.status === "In Progress").length, icon: "🚧" },
            { label: "Tech Stack", value: "Python 3 + PDF Processing", icon: "⚡" },
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
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
  const { ref, visible } = useVisible(index * 100);

  return (
    <div
      ref={ref}
      onClick={onSelect}
      style={{
        background: "rgba(15, 15, 15, 0.75)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(55, 118, 171, 0.35)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ padding: "28px" }}>
        {/* Compact Header Block */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
          <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.3px" }}>{project.title}</h3>
          <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(55, 118, 171, 0.12)", border: "1px solid rgba(55, 118, 171, 0.25)", color: "#3776AB", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
            Python
          </span>
        </div>

        {/* Muted Meta Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
          <span>🐍 Python 3</span>
          <span>•</span>
          <span style={{ color: "#34d399", fontWeight: 600 }}>{project.status}</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 20px" }}>{project.description}</p>

        {/* Grouped Tech Stack Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {project.tech.map((t) => (
            <span key={t} style={{ padding: "4px 11px", borderRadius: "100px", background: "rgba(55, 118, 171, 0.08)", border: "1px solid rgba(55, 118, 171, 0.18)", color: "#3776AB", fontSize: "11px", fontWeight: 600 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Standardized Button Footer */}
      <div style={{ padding: "0 28px 24px", display: "flex", gap: "10px" }}>
        {project.github && project.github !== "#" && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }} onClick={e => e.stopPropagation()}>
            <button style={{
              width: "100%", padding: "10px 14px", borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.12)", background: "rgba(255, 255, 255, 0.04)",
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
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #3776AB 0%, #1e4976 100%)",
            color: "#ffffff", fontSize: "12px", fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(55, 118, 171, 0.35)",
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
