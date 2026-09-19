import { useState } from "react";
import { projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

export default function OthersProjects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<typeof projects.others[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div ref={hero.ref} style={{ marginBottom: "56px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ padding: "8px 14px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#f59e0b", letterSpacing: "2px", textTransform: "uppercase" }}>Others</div>
          </div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#1e293b", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>
            Other <span style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            Live deployments, web apps, and other projects across different technologies.
          </p>
        </div>

        <div className="stats-summary-banner" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px", padding: "16px 18px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "16px" }}>
          {[
            { label: "Total Projects", value: projects.others.length, icon: "📦" },
            { label: "Completed", value: projects.others.filter(p => p.status === "Completed").length, icon: "✅" },
            { label: "Live Deployments", value: projects.others.filter(p => p.demo).length, icon: "🌐" },
            { label: "Tech Stack", value: "Next.js / Web", icon: "⚡" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "16px" }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "24px" }}>
          {projects.others.map((project, i) => (
            <OtherProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function OtherProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const { ref, visible } = useVisible(index * 100, 0.05);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="project-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "rgba(245,158,11,0.35)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hovered ? "0 16px 40px -12px rgba(245,158,11,0.15)" : "0 2px 12px rgba(0,0,0,0.06)",
        background: hovered ? "#ffffff" : "#fafafa",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>{project.emoji}</span>
            <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "17px", fontWeight: 700, color: "#1e293b", margin: 0, letterSpacing: "-0.3px" }}>{project.title}</h3>
          </div>
          <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
            Others
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
          <span>🌐 Web</span>
          <span>•</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>{project.status}</span>
          {project.demo && <><span>•</span><span style={{ color: "#3b82f6", fontWeight: 600 }}>Live ✓</span></>}
        </div>

        <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {project.tech.slice(0, 4).map((t: string) => (
            <span key={t} style={{ padding: "4px 11px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "100px", fontSize: "11px", fontWeight: 600, color: "#475569" }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="project-card-footer" style={{ padding: "0 28px 24px", display: "flex", gap: "10px" }}>
        {project.github && project.github !== "#" && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }} onClick={e => e.stopPropagation()}>
            <button style={{
              width: "100%", padding: "10px 14px", borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.03)",
              color: "#1e293b", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "all 0.2s ease",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </button>
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flex: 1 }} onClick={e => e.stopPropagation()}>
            <button style={{
              width: "100%", padding: "10px 14px", borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
              transition: "all 0.2s ease",
            }}>
              🔗 Live Preview
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
