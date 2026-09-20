import { useState } from "react";
import { skills } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

const skillSections = [
  { key: "backend", title: "Backend Development", subtitle: "Core specialization & frameworks", icon: "⚙️" },
  { key: "database", title: "Database & SQL", subtitle: "Relational data modeling & queries", icon: "🗄️" },
  { key: "languages", title: "Programming Languages", subtitle: "Core language proficiencies", icon: "📝" },
  { key: "concepts", title: "Computer Science Concepts", subtitle: "Architecture & engineering fundamentals", icon: "🧠" },
  { key: "tools", title: "Tools & Ecosystem", subtitle: "IDE, version control & API toolsets", icon: "🛠️" },
  { key: "frontend", title: "Frontend Foundations", subtitle: "User interface engineering", icon: "💻" },
];

const softSkills = [
  { name: "Architectural Problem Solving", icon: "🧩", desc: "Deconstructing complex enterprise requirements into clean, scalable, decoupled backend services." },
  { name: "Clean Code & SOLID Design", icon: "✨", desc: "Writing self-documenting, maintainable software following industry design patterns and testable contracts." },
  { name: "Cross-Functional Collaboration", icon: "👥", desc: "Working constructively with senior engineers, frontend developers, and product teams via Git and PR reviews." },
  { name: "Rapid Engineering Onboarding", icon: "🚀", desc: "Quickly mastering unfamiliar libraries, enterprise SDKs, design patterns, and debugging complex edge cases." },
  { name: "Precision & Defensive Coding", icon: "🎯", desc: "Delivering robust error handling, edge-case validation, input sanitization, and resilient data integrity." },
  { name: "Technical Communication", icon: "💬", desc: "Clearly documenting API contracts, architectural decisions, database schemas, and performance trade-offs." },
];

export default function Skills() {
  const hero = useVisible();
  const softHeader = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "32px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Technical Capabilities
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Skills & Engineering Matrix
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            A structured inventory of production backend frameworks, relational databases, core languages, and engineering principles.
          </p>
        </div>

        {/* Technical Capability Directory (De-boxed Open Architectural Grid) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "40px 48px",
            marginBottom: "76px",
          }}
          className="skills-capability-grid"
        >
          {skillSections.map((section, sIdx) => (
            <CapabilityCategory
              key={section.key}
              section={section}
              sectionIndex={sIdx}
              skillItems={skills[section.key as keyof typeof skills] || []}
            />
          ))}
        </div>

        {/* Soft Skills & Mindset (De-boxed Value Roster) */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "52px" }}>
          <div ref={softHeader.ref} style={{ opacity: softHeader.visible ? 1 : 0, transform: softHeader.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease", marginBottom: "36px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Professional Values
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Engineering Mindset & Core Values
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "32px 36px",
            }}
            className="soft-skills-roster"
          >
            {softSkills.map((skill, i) => (
              <MindsetItem key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityCategory({
  section,
  sectionIndex,
  skillItems,
}: {
  section: typeof skillSections[0];
  sectionIndex: number;
  skillItems: Array<{ name: string; level: number }>;
}) {
  const { ref, visible } = useVisible(sectionIndex * 70);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${sectionIndex * 0.06}s, transform 0.6s ease ${sectionIndex * 0.06}s`,
      }}
      className="capability-category-block"
    >
      {/* Category Header with subtle hairline border */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "14px",
          paddingBottom: "12px",
          borderBottom: "2px solid var(--line)",
        }}
      >
        <span style={{ fontSize: "22px" }}>{section.icon}</span>
        <div>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--ink)",
              margin: "0 0 2px",
              letterSpacing: "-0.01em",
            }}
          >
            {section.title}
          </h2>
          <p
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "13px",
              color: "var(--muted)",
              margin: 0,
            }}
          >
            {section.subtitle}
          </p>
        </div>
      </div>

      {/* Clean Skill Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {skillItems.map((skill, i) => (
          <SkillItemRow
            key={skill.name}
            skill={skill}
            isLast={i === skillItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SkillItemRow({
  skill,
  isLast,
}: {
  skill: { name: string; level: number };
  isLast: boolean;
}) {
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
        padding: "9px 8px",
        borderBottom: isLast ? "none" : "1px solid var(--line)",
        background: hovered ? "var(--tint)" : "transparent",
        transform: hovered ? "translateX(4px)" : "none",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        borderRadius: "8px",
        cursor: "default",
      }}
    >
      {/* Left: Indicator dot + skill name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: hovered ? "var(--accent)" : "var(--dot)",
            boxShadow: hovered ? "0 0 0 3px rgba(194, 65, 12, 0.3)" : "none",
            transition: "all 0.2s ease",
            transform: hovered ? "scale(1.2)" : "scale(1)",
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

      {/* Right: Tier badge + percentage */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "10.5px",
            fontWeight: 600,
            color: "var(--tint-ink)",
            background: "var(--card)",
            border: "1px solid var(--line)",
            padding: "2px 7px",
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
            minWidth: "34px",
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

function MindsetItem({
  skill,
  index,
}: {
  skill: typeof softSkills[0];
  index: number;
}) {
  const { ref, visible } = useVisible(index * 60);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderLeft: `2px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
        paddingLeft: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "border-color 0.25s ease, opacity 0.5s ease, transform 0.5s ease",
      }}
      className="mindset-item"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ fontSize: "18px" }}>{skill.icon}</span>
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
          {skill.name}
        </h3>
      </div>
      <p
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: "14px",
          color: "var(--muted)",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {skill.desc}
      </p>
    </div>
  );
}
