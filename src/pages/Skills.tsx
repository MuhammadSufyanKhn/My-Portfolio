import { useState } from "react";
import { skills } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

const skillSections = [
  { key: "backend", title: "Backend development", subtitle: "Core specialization & frameworks", icon: "⚙️" },
  { key: "database", title: "Database & SQL", subtitle: "Relational data management", icon: "🗄️" },
  { key: "languages", title: "Programming languages", subtitle: "Core language proficiency", icon: "📝" },
  { key: "concepts", title: "Computer science concepts", subtitle: "Engineering fundamentals", icon: "🧠" },
  { key: "tools", title: "Tools & IDEs", subtitle: "Developer ecosystem & workflow", icon: "🛠️" },
  { key: "frontend", title: "Frontend foundations", subtitle: "User interface engineering", icon: "💻" },
];

const softSkills = [
  { name: "Problem solving", icon: "🧩", desc: "Deconstructing complex problems into clean, scalable architectural solutions" },
  { name: "Clean code & SOLID", icon: "✨", desc: "Writing readable, maintainable software following industry design patterns" },
  { name: "Team collaboration", icon: "👥", desc: "Working constructively with cross-functional teams and senior engineers" },
  { name: "Rapid learner", icon: "🚀", desc: "Quickly adapting to new enterprise frameworks, libraries, and design patterns" },
  { name: "Attention to detail", icon: "🎯", desc: "Delivering precise, high-quality, and robust backend implementations" },
  { name: "Technical communication", icon: "💬", desc: "Clearly articulating architecture, API contracts, and trade-offs" },
];

export default function Skills() {
  const hero = useVisible();
  const softHeader = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Technical capabilities
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Skills & Technologies
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            A structured inventory of backend frameworks, databases, and engineering principles.
          </p>
        </div>

        {/* Skill Groups — clean list rows separated by hairline borders */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "28px", marginBottom: "72px" }}>
          {skillSections.map((section, sIdx) => (
            <SkillSectionGroup
              key={section.key}
              section={section}
              sectionIndex={sIdx}
              skillItems={skills[section.key as keyof typeof skills] || []}
            />
          ))}
        </div>

        {/* Soft Skills */}
        <div>
          <div ref={softHeader.ref} style={{ opacity: softHeader.visible ? 1 : 0, transform: softHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "28px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Professional values
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Soft Skills & Mindset
            </h2>
          </div>

          <div className="soft-skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "16px" }}>
            {softSkills.map((skill, i) => (
              <SoftSkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillSectionGroup({ section, sectionIndex, skillItems }: {
  section: typeof skillSections[0];
  sectionIndex: number;
  skillItems: Array<{ name: string; level: number }>;
}) {
  const { ref, visible } = useVisible(sectionIndex * 80);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--card)",
        border: "1.5px solid var(--line)",
        borderRadius: "18px",
        padding: "24px 26px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${sectionIndex * 0.08}s, transform 0.6s ease ${sectionIndex * 0.08}s`,
        animation: "flowingBorderGlow 6s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Flowing sheen light stream */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, transparent, rgba(194, 65, 12, 0.05), transparent)",
          animation: `flowSheen 7s infinite ease-in-out ${sectionIndex * 1.5}s`,
          pointerEvents: "none",
        }}
      />
      {/* Section Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", paddingBottom: "14px", borderBottom: "1px solid var(--line)", position: "relative", zIndex: 1 }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "var(--tint)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          flexShrink: 0,
        }}>
          {section.icon}
        </div>
        <div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            {section.title}
          </h2>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)", margin: 0 }}>
            {section.subtitle}
          </p>
        </div>
      </div>

      {/* List rows separated by hairline borders */}
      <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        {skillItems.map((skill, i) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            isLast={i === skillItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill, isLast }: { skill: { name: string; level: number }; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  const levelTier =
    skill.level >= 90 ? "Expert" :
    skill.level >= 80 ? "Advanced" :
    skill.level >= 70 ? "Proficient" : "Familiar";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 8px",
        borderBottom: isLast ? "none" : "1px solid var(--line)",
        background: hovered ? "var(--tint)" : "transparent",
        transform: hovered ? "translateX(4px)" : "none",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        borderRadius: "8px",
        cursor: "default",
      }}
    >
      {/* Left: tech name + terracotta dot with pulsing glow */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: hovered ? "var(--accent)" : "var(--dot)",
            boxShadow: hovered ? "0 0 0 3px rgba(194, 65, 12, 0.3)" : "none",
            transition: "all 0.2s ease",
            transform: hovered ? "scale(1.3)" : "scale(1)",
          }}
        />
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: hovered ? "var(--accent)" : "var(--ink)",
            transition: "color 0.2s ease",
          }}
        >
          {skill.name}
        </span>
      </div>

      {/* Right: tier pill + percentage in mono font (no straight line) */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--tint-ink)",
            background: "var(--tint)",
            border: "1px solid var(--line)",
            padding: "2px 8px",
            borderRadius: "100px",
          }}
        >
          {levelTier}
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px",
            fontWeight: 500,
            color: hovered ? "var(--accent)" : "var(--muted)",
            minWidth: "36px",
            textAlign: "right",
            transition: "color 0.2s ease",
          }}
        >
          {skill.level}%
        </span>
      </div>
    </div>
  );
}

function SoftSkillCard({ skill, index }: { skill: typeof softSkills[0]; index: number }) {
  const { ref, visible } = useVisible(index * 70);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="soft-skill-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "22px",
        background: "var(--card)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
        borderRadius: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(20px)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 8px 24px -6px rgba(194, 65, 12, 0.1)" : "0 1px 4px rgba(0,0,0,0.03)",
        cursor: "default",
      }}
    >
      <div style={{
        width: "42px", height: "42px", borderRadius: "12px",
        background: "var(--tint)", border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "20px", marginBottom: "14px",
      }}>
        {skill.icon}
      </div>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
        {skill.name}
      </h3>
      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
        {skill.desc}
      </p>
    </div>
  );
}
