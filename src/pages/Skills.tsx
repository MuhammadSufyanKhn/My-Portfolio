import { useState } from "react";
import { skills } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

const skillSections = [
  { key: "backend", title: "Backend Development", subtitle: "Core expertise", icon: "⚙️", color: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)" },
  { key: "frontend", title: "Frontend Skills", subtitle: "Web interface", icon: "💻", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  { key: "database", title: "Database & SQL", subtitle: "Data management", icon: "🗄️", color: "#ec4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)" },
  { key: "languages", title: "Programming Languages", subtitle: "Code I write", icon: "📝", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
  { key: "tools", title: "Tools & IDEs", subtitle: "Development toolkit", icon: "🛠️", color: "#a855f7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
  { key: "concepts", title: "CS Concepts", subtitle: "Foundations", icon: "🧠", color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
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

        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "64px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#3b82f6", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Technical Expertise</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#0f172a", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>Skills & Technologies</h1>
          <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "500px", lineHeight: 1.7 }}>A comprehensive breakdown of my technical skills, software engineering fundamentals, and core tools.</p>
        </div>

        {/* Skill Cards Grid */}
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "24px", marginBottom: "80px" }}>
          {skillSections.map((section, sIdx) => (
            <SkillSectionCard key={section.key} section={section} sectionIndex={sIdx} skillItems={skills[section.key as keyof typeof skills] || []} />
          ))}
        </div>

        {/* Soft Skills */}
        <div>
          <div ref={softHeader.ref} style={{ opacity: softHeader.visible ? 1 : 0, transform: softHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b5cf6", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Human Skills</div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0f172a", margin: "0 0 32px", letterSpacing: "-1px" }}>Soft Skills</h2>
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
        background: hovered ? "#ffffff" : "#f8fafc",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.3)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(25px)",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? "0 12px 28px -8px rgba(139, 92, 246, 0.12)" : "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", marginBottom: "16px",
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>{skill.icon}</div>
      <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>{skill.name}</h3>
      <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{skill.desc}</p>
    </div>
  );
}

function SkillSectionCard({ section, sectionIndex, skillItems }: {
  section: typeof skillSections[0];
  sectionIndex: number;
  skillItems: Array<{ name: string; level: number; color: string }>;
}) {
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
        background: hovered ? "#ffffff" : "#fafafa",
        border: `1px solid ${hovered ? section.border : "rgba(0,0,0,0.07)"}`,
        borderRadius: "20px",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? `0 16px 40px -12px ${section.color}20` : "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Card Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: section.bg, border: `1.5px solid ${section.border}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
        }}>{section.icon}</div>
        <div>
          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{section.title}</h2>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{section.subtitle}</p>
        </div>
      </div>

      {/* Skill Badge Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {skillItems.map((skill, i) => (
          <SkillBadgeRow key={skill.name} skill={skill} index={i} visible={visible} sectionColor={section.color} />
        ))}
      </div>
    </div>
  );
}

function SkillBadgeRow({ skill, index, visible, sectionColor }: {
  skill: { name: string; level: number; color: string };
  index: number;
  visible: boolean;
  sectionColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  const levelLabel =
    skill.level >= 90 ? "Expert" :
    skill.level >= 80 ? "Advanced" :
    skill.level >= 70 ? "Proficient" : "Familiar";

  const levelColor =
    skill.level >= 90 ? "#10b981" :
    skill.level >= 80 ? "#3b82f6" :
    skill.level >= 70 ? "#f59e0b" : "#94a3b8";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: "12px",
        background: hovered ? `${skill.color}0f` : "rgba(0,0,0,0.02)",
        border: `1px solid ${hovered ? skill.color + "30" : "rgba(0,0,0,0.06)"}`,
        transition: "all 0.25s ease",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-12px)",
        transitionDelay: `${index * 0.07 + 0.2}s`,
      }}
    >
      {/* Left — name + dot */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: skill.color,
          boxShadow: hovered ? `0 0 6px ${skill.color}80` : "none",
          transition: "box-shadow 0.2s ease",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: "13px", fontWeight: 600, color: hovered ? "#0f172a" : "#334155", transition: "color 0.2s ease" }}>
          {skill.name}
        </span>
      </div>

      {/* Right — level badge + percentage */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontSize: "11px", fontWeight: 700,
          color: levelColor,
          padding: "2px 8px",
          borderRadius: "100px",
          background: `${levelColor}14`,
          border: `1px solid ${levelColor}28`,
          transition: "all 0.2s ease",
        }}>
          {levelLabel}
        </span>
        <span style={{
          fontSize: "12px", fontWeight: 700,
          color: hovered ? skill.color : "#94a3b8",
          transition: "color 0.2s ease",
          minWidth: "34px",
          textAlign: "right",
        }}>
          {skill.level}%
        </span>
      </div>
    </div>
  );
}
