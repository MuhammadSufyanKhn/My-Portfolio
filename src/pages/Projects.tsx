import { useState, useMemo } from "react";
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
  semester: "#3b82f6",
};

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "dotnet", label: ".NET / C#" },
  { key: "python", label: "Python" },
  { key: "others", label: "Web & Others" },
  { key: "semester", label: "Academic" },
];

export default function Projects() {
  const hero = useVisible();
  const [selected, setSelected] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return allProjects;
    return allProjects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1040px", margin: "0 auto", width: "100%", boxSizing: "border-box", padding: "0 20px" }}>

        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Engineered Systems
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            All Projects Directory
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            An exhaustive inventory of production .NET backend architectures, Python automation scripts, live deployments, and academic engineering.
          </p>
        </div>

        {/* Filter Tabs & Stats Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              background: "var(--card)",
              border: "1px solid var(--line)",
              padding: "6px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {CATEGORIES.map((cat) => {
              const count = cat.key === "all" ? allProjects.length : allProjects.filter((p) => p.category === cat.key).length;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  style={{
                    border: "none",
                    background: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--on-accent)" : "var(--muted)",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      opacity: isActive ? 1 : 0.7,
                      padding: "1px 6px",
                      borderRadius: "100px",
                      background: isActive ? "rgba(255,255,255,0.2)" : "var(--tint)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Metric Counter */}
          <div
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: "14px",
              color: "var(--muted)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span>Showing <strong style={{ color: "var(--ink)" }}>{filteredProjects.length}</strong> of {allProjects.length} projects</span>
          </div>
        </div>

        {/* Elevated High-Contrast Project Showcase Table */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 12px 36px -8px rgba(0, 0, 0, 0.07)",
          }}
          className="projects-showcase-container"
        >
          {/* Table Header Strip (Desktop) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px minmax(200px, 1fr) 140px 200px 100px 120px",
              gap: "16px",
              padding: "14px 20px",
              background: "var(--tint)",
              borderBottom: "1px solid var(--line)",
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
            className="projects-table-header"
          >
            <span>PREVIEW</span>
            <span>PROJECT</span>
            <span>CATEGORY</span>
            <span>CORE TECH</span>
            <span>STATUS</span>
            <span style={{ textAlign: "right" }}>ACTION</span>
          </div>

          {/* Project Rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredProjects.map((project, i) => (
              <ProjectElevatedRow
                key={project.id + project.title}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProjectElevatedRow({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const { ref, visible } = useVisible(index * 40, 0.05);
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_ACCENT[project.category] ?? "var(--accent)";

  const categoryLabel =
    project.category === "dotnet" ? ".NET / C#" :
    project.category === "python" ? "Python" :
    project.category === "others" ? "Web & Others" : "Academic";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "100px minmax(200px, 1fr) 140px 200px 100px 120px",
        gap: "16px",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: "1px solid var(--line)",
        cursor: "pointer",
        background: hovered ? "var(--tint)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="project-elevated-row"
    >
      {/* Thumbnail Picture */}
      <div
        style={{
          width: "90px",
          height: "60px",
          borderRadius: "10px",
          overflow: "hidden",
          background: "var(--tint)",
          border: "1px solid var(--line)",
          position: "relative",
          flexShrink: 0,
        }}
        className="project-row-thumb"
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
              transition: "transform 0.3s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            {project.emoji || "💻"}
          </div>
        )}
      </div>

      {/* Project Title & Short excerpt */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: hovered ? "var(--accent)" : "var(--ink)",
              margin: 0,
              letterSpacing: "-0.01em",
              transition: "color 0.2s ease",
            }}
          >
            {project.title}
          </h3>
          {(project as any).expertise && (
            <span style={{ padding: "1px 7px", borderRadius: "100px", background: "var(--accent)", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "0.5px" }}>
              ★ EXPERTISE
            </span>
          )}
          {project.demo && (
            <span style={{ padding: "1px 7px", borderRadius: "100px", background: "#10b981", color: "#fff", fontSize: "9px", fontWeight: 700 }}>
              LIVE
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: "13px",
            color: "var(--muted)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "380px",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Category Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="project-row-category">
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "12px", color: "var(--ink)", fontWeight: 600 }}>
          {categoryLabel}
        </span>
      </div>

      {/* Tech Tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }} className="project-row-tech">
        {project.tech.slice(0, 2).map((t: string) => (
          <span
            key={t}
            style={{
              fontSize: "11px",
              fontFamily: "'IBM Plex Mono', monospace",
              color: "var(--muted)",
              background: "var(--card)",
              border: "1px solid var(--line)",
              padding: "2px 8px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
        {project.tech.length > 2 && (
          <span style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "'IBM Plex Mono', monospace" }}>
            +{project.tech.length - 2}
          </span>
        )}
      </div>

      {/* Status Badge */}
      <div className="project-row-status">
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "11px",
            color: project.status === "Completed" ? "#10b981" : "var(--accent)",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: "100px",
            background: "var(--card)",
            border: "1px solid var(--line)",
            display: "inline-block",
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: "right" }} className="project-row-action">
        <button
          className={hovered ? "btn-primary" : "btn-secondary"}
          style={{
            height: "32px",
            padding: "0 12px",
            fontSize: "12px",
            borderRadius: "8px",
            fontWeight: 600,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            cursor: "pointer",
          }}
        >
          Details →
        </button>
      </div>
    </div>
  );
}
