import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(timer); window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return createPortal(
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99990, background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(16px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "90px 20px 30px 20px", overflowY: "auto", opacity: visible ? 1 : 0, transition: "opacity 0.25s ease-out" }} onClick={onClose} className="project-modal-backdrop">
      <div style={{ background: "#0d0d12", border: "1px solid rgba(255, 255, 255, 0.14)", borderRadius: "20px", maxWidth: "640px", width: "100%", maxHeight: "calc(100vh - 110px)", display: "flex", flexDirection: "column", boxShadow: "0 25px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(56, 189, 248, 0.15)", transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "16px 24px", background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>🚀</span>
            <span style={{ fontSize: "13px", color: "#38bdf8", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Poppins', 'Inter', sans-serif" }}>Project Details</span>
          </div>
          <button onClick={onClose} aria-label="Close modal" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", fontSize: "16px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.25)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)"}
          >×</button>
        </div>
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }} className="project-modal-body">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>{project.title}</h2>
            {project.status === "In Progress" && <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(249, 115, 22, 0.15)", border: "1px solid rgba(249, 115, 22, 0.3)", color: "#f97316", fontSize: "11px", fontWeight: 700 }}>🚧 In Progress</span>}
          </div>
          {(project.semester || project.course) && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {project.semester && <span style={{ padding: "3px 10px", borderRadius: "100px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#34d399", fontSize: "11px", fontWeight: 700 }}>🏫 {project.semester}</span>}
              {project.course && <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>• {project.course}</span>}
            </div>
          )}
          <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "20px" }}>{project.longDescription || project.description}</p>
          {project.tech?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#38bdf8", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "1px" }}>Tech Stack</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t: string) => <span key={t} style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.25)", color: "#38bdf8", fontSize: "11px", fontWeight: 600 }}>{t}</span>)}
              </div>
            </div>
          )}
          {project.features?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#38bdf8", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "1px" }}>Key Features</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.features.map((f: string) => <div key={f} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}><span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0, fontSize: "13px" }}>✓</span><span style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.5 }}>{f}</span></div>)}
              </div>
            </div>
          )}
          {project.roadmap?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#38bdf8", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "1px" }}>Roadmap</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {project.roadmap.map((r: string) => <div key={r} style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5 }}>{r}</div>)}
              </div>
            </div>
          )}
          {project.learned && (
            <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", marginBottom: "20px" }}>
              <h4 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#34d399", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px" }}>What I Learned</h4>
              <p style={{ fontSize: "12px", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{project.learned}</p>
            </div>
          )}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#ffffff", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s ease", boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </button>
              </a>
            )}
            <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(255, 255, 255, 0.06)", color: "#e4e4e7", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.06)"}
            >Close</button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .project-modal-backdrop {
            padding: 70px 10px 20px !important;
          }
          .project-modal-body {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
