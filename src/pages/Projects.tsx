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

const CATEGORY_ACCENT: Record<string, string> = {
  dotnet: "#C2410C",
  python: "#10b981",
  others: "#f59e0b",
  semester: "#94a3b8",
};

export default function Projects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "24px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Portfolio</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>All Projects</h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            .NET backend systems, Python tools, live deployments, and academic coursework.
          </p>
        </div>

        {/* Stats banner */}
        <div style={{
          display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "32px",
          padding: "14px 20px",
          background: "var(--tint)",
          border: "1px solid var(--line)",
          borderRadius: "14px",
        }}>
          {[
            { label: "Total projects", value: allProjects.length },
            { label: "Completed", value: allProjects.filter(p => p.status === "Completed").length },
            { label: "In progress", value: allProjects.filter(p => p.status === "In Progress").length },
          ].map(stat => (
            <div key={stat.label} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--accent)" }}>{stat.value}</span>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "14px", color: "var(--muted)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Project list rows — no filter tabs */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allProjects.map((project, i) => (
            <ProjectRow key={project.id + project.title} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProjectRow({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const { ref, visible } = useVisible(index * 60, 0.05);
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_ACCENT[project.category] ?? "var(--accent)";

  const categoryLabel =
    project.category === "dotnet" ? ".NET / C#" :
    project.category === "python" ? "Python" :
    project.category === "others" ? "Others" : "Academic";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "16px 14px",
        borderBottom: "1px solid var(--line)",
        cursor: "pointer",
        borderRadius: "12px",
        background: hovered ? "var(--tint)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateX(4px)" : "translateY(0)") : "translateY(16px)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Accent dot */}
      <div style={{
        width: "8px", height: "8px", borderRadius: "50%",
        background: accent, flexShrink: 0,
        boxShadow: hovered ? `0 0 0 3px ${accent}30` : "none",
        transition: "box-shadow 0.2s ease",
      }} />

      {/* Title + tech */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "16px", fontWeight: 700,
            color: hovered ? "var(--accent)" : "var(--ink)",
            margin: 0, letterSpacing: "-0.01em",
            transition: "color 0.2s ease",
          }}>{project.title}</h3>
          {(project as any).expertise && (
            <span style={{ padding: "1px 8px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px" }}>★ Expertise</span>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{categoryLabel}</span>
          <span style={{ color: "var(--line)" }}>·</span>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", color: project.status === "Completed" ? "#10b981" : "var(--accent)", fontWeight: 600 }}>{project.status}</span>
          {project.tech.slice(0, 3).map((t: string) => (
            <span key={t} style={{ fontSize: "11px", color: "var(--muted)", background: "var(--tint)", border: "1px solid var(--line)", padding: "1px 8px", borderRadius: "100px" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Click to view details button */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <span
          style={{
            padding: "5px 12px",
            borderRadius: "8px",
            background: hovered ? "var(--accent)" : "var(--tint)",
            color: hovered ? "var(--on-accent)" : "var(--tint-ink)",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          View details →
        </span>
      </div>
    </div>
  );
}
