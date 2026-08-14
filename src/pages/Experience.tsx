import { useState, useEffect, useRef } from "react";
import { experience } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Experience() {
  const hero = useVisible();

  return (
    <div style={{ minHeight: "100vh", paddingTop: "110px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "56px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease 0.2s" }}>Work History</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1, opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>Experience</h1>
          <p style={{ fontSize: "16px", color: "#a1a1aa", maxWidth: "500px", lineHeight: 1.7, opacity: hero.visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>Professional experience building real-world software systems with industry-standard technologies.</p>
        </div>

        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
  const { ref, visible } = useVisible(index * 150);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: "28px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-2px)" : "translateY(0)")
          : "translateY(40px) scale(0.98)",
        transition: `all 0.8s cubic-bezier(0.23,1,0.32,1) ${index * 0.15}s`,
      }}
    >
      <div style={{
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${exp.color}35` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: hovered ? `0 16px 40px -12px ${exp.color}20` : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.4s ease",
      }}>
        {/* Animated gradient top bar */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${exp.color}, #6366f1, #38bdf8)`,
          backgroundSize: "200% 100%",
          animation: visible ? "expGradient 3s linear infinite" : "none",
        }} />

        <div style={{ padding: "36px 40px" }} className="exp-card-body">
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px", marginBottom: "20px" }} className="exp-header-row">
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }} className="exp-icon-title-group">
              <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: `${exp.color}18`, border: `1.5px solid ${exp.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", flexShrink: 0,
                transition: "transform 0.4s ease",
                transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
              }} className="exp-icon-box">
                {exp.icon}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 800, color: "#ffffff", margin: "0 0 4px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                  {exp.role}
                </h2>
                <div style={{ fontSize: "15px", fontWeight: 600, color: exp.color, marginBottom: "8px" }}>
                  {exp.company}
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: "5px" }}>📅 {exp.duration}</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: "5px" }}>📍 {exp.location}</span>
                </div>
              </div>
            </div>
            <span style={{
              padding: "5px 14px", borderRadius: "100px",
              background: "rgba(16,185,129,0.12)", color: "#34d399",
              fontSize: "12px", fontWeight: 600, border: "1px solid rgba(16,185,129,0.3)",
              alignSelf: "flex-start",
            }}>
              {exp.type}
            </span>
          </div>

          {/* Description with typing reveal */}
          <TypingParagraph text={exp.description} visible={visible} delay={index * 150 + 300} />

          {/* Key Responsibilities with staggered reveals */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Key Responsibilities</h3>
            <div style={{ maxHeight: expanded ? "1000px" : "180px", overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1)", position: "relative" }}>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {exp.responsibilities.map((r, ri) => (
                  <ResponsibilityItem key={r} text={r} index={ri} parentVisible={visible} parentDelay={index * 150} />
                ))}
              </ul>
              {!expanded && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, transparent, rgba(15, 15, 15, 0.95))", pointerEvents: "none" }} />
              )}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginTop: "10px", padding: "6px 12px", border: `1px solid ${exp.color}40`,
                borderRadius: "8px", background: `${exp.color}12`,
                color: exp.color, fontSize: "12px", fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${exp.color}25`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${exp.color}12`}
            >
              {expanded ? "Show less ▲" : "Show more ▼"}
            </button>
          </div>

          {/* Technologies Used with staggered animation */}
          <div>
            <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "12px", fontWeight: 700, color: "#94a3b8", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Technologies Used</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {exp.technologies.map((tech, ti) => (
                <TechTag key={tech} tech={tech} index={ti} color={exp.color} parentVisible={visible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}

function TypingParagraph({ text, visible, delay }: { text: string; visible: boolean; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true;
      let i = 0;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          i++;
          setDisplayed(text.substring(0, i));
          if (i >= text.length) clearInterval(interval);
        }, 12);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visible, text, delay]);

  return (
    <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.7, margin: "0 0 20px", minHeight: "24px" }}>
      {displayed}
      {displayed.length > 0 && displayed.length < text.length && (
        <span style={{ borderRight: "2px solid #38bdf8", marginLeft: "1px", animation: "blink 0.8s step-end infinite" }} />
      )}
    </p>
  );
}

function ResponsibilityItem({ text, index, parentVisible, parentDelay }: { text: string; index: number; parentVisible: boolean; parentDelay: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (parentVisible) {
      const timer = setTimeout(() => setShow(true), parentDelay + 600 + index * 100);
      return () => clearTimeout(timer);
    }
  }, [parentVisible, parentDelay, index]);

  return (
    <li style={{
      display: "flex", gap: "10px", alignItems: "flex-start",
      opacity: show ? 1 : 0,
      transform: show ? "translateX(0)" : "translateX(-15px)",
      transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <span style={{ width: "18px", height: "18px", borderRadius: "6px", background: "rgba(16,185,129,0.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>✓</span>
      <span style={{ fontSize: "13px", color: "#e2e8f0", lineHeight: 1.6 }}>{text}</span>
    </li>
  );
}

function TechTag({ tech, index, color, parentVisible }: { tech: string; index: number; color: string; parentVisible: boolean }) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (parentVisible) {
      const timer = setTimeout(() => setShow(true), 800 + index * 60);
      return () => clearTimeout(timer);
    }
  }, [parentVisible, index]);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "4px 11px", borderRadius: "100px",
        background: hovered ? `${color}25` : `${color}12`,
        border: `1px solid ${hovered ? `${color}50` : `${color}30`}`,
        color: color, fontSize: "11px", fontWeight: 600,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        cursor: "default",
      }}
    >{tech}</span>
  );
}
