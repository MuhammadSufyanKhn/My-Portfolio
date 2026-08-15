import { useState } from "react";
import { skills } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

const skillSections = [
  { key: "backend", title: "Backend Development", subtitle: "Core expertise", icon: "⚙️", color: "#6366f1" },
  { key: "frontend", title: "Frontend Skills", subtitle: "Web interface", icon: "💻", color: "#f59e0b" },
  { key: "database", title: "Database & SQL", subtitle: "Data management", icon: "🗄️", color: "#ec4899" },
  { key: "languages", title: "Programming Languages", subtitle: "Code I write", icon: "📝", color: "#10b981" },
  { key: "tools", title: "Tools & IDEs", subtitle: "Development toolkit", icon: "🛠️", color: "#a855f7" },
  { key: "concepts", title: "CS Concepts", subtitle: "Foundations", icon: "🧠", color: "#f97316" },
];

const softSkills = [
  { name: "Problem Solving", icon: "🧩", desc: "Breaking complex problems into clean, scalable architectural solutions" },
  { name: "Clean Code", icon: "✨", desc: "Writing readable, maintainable code following SOLID principles and design patterns" },
  { name: "Team Collaboration", icon: "👥", desc: "Working effectively with cross-functional teams and senior engineers" },
  { name: "Fast Learner", icon: "🚀", desc: "Quickly adapting to new frameworks, libraries, and enterprise codebases" },
  { name: "Attention to Detail", icon: "🎯", desc: "Delivering precise, high-quality, fully tested backend code" },
  { name: "Communication", icon: "💬", desc: "Clearly explaining technical concepts and API designs to team members" },
];

export default function Skills() {
  const hero = useVisible();
  const softHeader = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "64px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)", transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease 0.2s" }}>Technical Expertise</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1, opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>Skills & Technologies</h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "500px", lineHeight: 1.7, opacity: hero.visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>A comprehensive breakdown of my technical skills, software engineering fundamentals, and core tools.</p>
        </div>

        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "24px", marginBottom: "80px" }}>
          {skillSections.map((section, sIdx) => (
            <SkillSectionCard key={section.key} section={section} sectionIndex={sIdx} skillItems={skills[section.key as keyof typeof skills] || []} />
          ))}
        </div>

        <div>
          <div ref={softHeader.ref} style={{ opacity: softHeader.visible ? 1 : 0, transform: softHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b5cf6", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Human Skills</div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#ffffff", margin: "0 0 32px", letterSpacing: "-1px" }}>Soft Skills</h2>
          </div>
          <div className="soft-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "16px" }}>
            {softSkills.map((skill, i) => (
              <SoftSkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftSkillCard({ skill, index }: { skill: typeof softSkills[0]; index: number }) {
  const { ref, visible } = useVisible(index * 100);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="soft-skill-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(25px) scale(0.95)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? "0 12px 28px -8px rgba(139, 92, 246, 0.15)" : "none",
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: "rgba(139, 92, 246, 0.12)", border: "1px solid rgba(139, 92, 246, 0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", marginBottom: "16px",
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>{skill.icon}</div>
      <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>{skill.name}</h3>
      <p style={{ fontSize: "13px", color: "#a1a1aa", margin: 0, lineHeight: 1.5 }}>{skill.desc}</p>
    </div>
  );
}

function SkillSectionCard({ section, sectionIndex, skillItems }: { section: typeof skillSections[0]; sectionIndex: number; skillItems: Array<{ name: string; level: number; color: string }> }) {
  const { ref, visible } = useVisible(sectionIndex * 120);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="skill-section-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        border: `1px solid ${hovered ? `${section.color}35` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-3px)" : "translateY(0)")
          : "translateY(30px) scale(0.96)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? `0 16px 32px -8px ${section.color}18` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: `${section.color}18`, border: `1.5px solid ${section.color}35`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
        }}>{section.icon}</div>
        <div>
          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>{section.title}</h2>
          <p style={{ fontSize: "12px", color: "#71717a", margin: 0 }}>{section.subtitle}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {skillItems.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} visible={visible} />
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, index, visible }: { skill: { name: string; level: number; color: string }; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "default" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: hovered ? "#ffffff" : "#e5e5e5", transition: "color 0.2s ease" }}>{skill.name}</span>
        <span style={{
          fontSize: "12px", fontWeight: 700,
          color: hovered ? skill.color : "#71717a",
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>{skill.level}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${skill.level}%` : "0%",
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
          borderRadius: "100px",
          transition: `width 1.4s cubic-bezier(0.23,1,0.32,1) ${index * 0.12 + 0.3}s`,
          boxShadow: hovered ? `0 0 8px ${skill.color}60` : "none",
        }} />
      </div>
    </div>
  );
}
