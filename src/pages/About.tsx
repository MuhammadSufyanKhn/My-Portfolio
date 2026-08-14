import { useEffect, useRef, useState, useCallback } from "react";
import { useVisible } from "../utils/useVisible";
import { hexToRgb } from "../utils/helpers";

const timeline = [
  { year: "2023", title: "Started CS Journey", description: "Enrolled at Sir Syed University of Engineering & Technology for a Bachelor's in Computer Science. Discovered my passion for backend programming and system design.", icon: "🎓", color: "#3b82f6" },
  { year: "2023", title: "Deep Dive into .NET", description: "Mastered C# and ASP.NET Core. Built my first REST API and fell in love with clean architecture, EF Core, and database design.", icon: "💻", color: "#6366f1" },
  { year: "2024", title: "Production Projects", description: "Built multiple full-stack systems including Cab Management System and Task Management Platform using Entity Framework Core and SQL Server.", icon: "🚀", color: "#38bdf8" },
  { year: "2025", title: "Internship at CodeLabs", description: "Joined CodeLabs Pvt Ltd as a .NET Developer Intern. Engineered production-grade systems alongside senior software engineers.", icon: "💼", color: "#818cf8" },
  { year: "2026", title: "Internship at 10Pearls", description: "Joined 10Pearls as a .NET Developer Intern, contributing to enterprise-grade software solutions and collaborating with cross-functional teams on scalable applications.", icon: "🖥️", color: "#10b981" },
  { year: "2027", title: "Graduation & Beyond", description: "On track to graduate with a 3.97 CGPA. Seeking software engineering opportunities at high-impact technology companies.", icon: "⭐", color: "#60a5fa" },
];

const interests = [
  { icon: "🏗️", title: "Backend Architecture", desc: "Clean, scalable API design with .NET Core" },
  { icon: "🗄️", title: "Database Systems", desc: "Optimized SQL queries, indexes, and schema design" },
  { icon: "🔐", title: "Application Security", desc: "JWT authentication and role-based authorization" },
  { icon: "⚡", title: "High Performance", desc: "Building fast, efficient, low-latency microservices" },
  { icon: "📦", title: "Clean Code & Design Patterns", desc: "SOLID principles, repository patterns, and DDD" },
  { icon: "☁️", title: "Cloud & Containerization", desc: "Docker containers and Azure Cloud Services" },
];

const cardBg = "rgba(15, 15, 15, 0.7)";
const cardBorder = "1px solid rgba(255, 255, 255, 0.07)";

export default function About() {
  const hero = useVisible();
  const timelineVis = useVisible(100);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!lineContainerRef.current) return;
    const rect = lineContainerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = rect.height;
    const scrolled = windowH - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalH));
    setLineProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{
          opacity: hero.visible ? 1 : 0,
          transform: hero.visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: "48px",
        }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>About Me</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", margin: "0 0 24px", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Engineered for reliability,<br />
            <span style={{ background: "linear-gradient(135deg, #38bdf8, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              crafted for scale.
            </span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start", marginBottom: "80px" }} className="about-grid">
          <div>
            <p style={{ fontSize: "17px", color: "#e5e5e5", lineHeight: 1.8, marginBottom: "20px" }}>
              I'm <strong style={{ color: "#ffffff" }}>Muhammad Sufyan Khan</strong>, a Computer Science student at Sir Syed University of Engineering & Technology maintaining a 3.97 CGPA. I specialize in building backend architectures using ASP.NET Core, C#, and SQL Server.
            </p>
            <p style={{ fontSize: "16px", color: "#a1a1aa", lineHeight: 1.8 }}>
              My software engineering focus centers around building robust backend systems, scalable REST APIs, relational database schemas, and clean object-oriented code.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "University", value: "Sir Syed University of Engineering & Technology", icon: "🏫" },
              { label: "Degree", value: "BS Computer Science", icon: "🎓" },
              { label: "Current CGPA", value: "3.97 / 4.0", icon: "⭐" },
              { label: "Semester", value: "Completed 6th Semester", icon: "📚" },
              { label: "Location", value: "Pakistan", icon: "📍" },
            ].map((item) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px",
                background: cardBg, backdropFilter: "blur(16px)", border: cardBorder, borderRadius: "14px",
              }}>
                <span style={{ fontSize: "20px", flexShrink: 0, width: "24px", textAlign: "center" }}>{item.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "11px", color: "#71717a", fontWeight: 500, letterSpacing: "0.5px" }}>{item.label}</div>
                  <div style={{ fontSize: "14px", color: "#ffffff", fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineVis.ref} style={{
          opacity: timelineVis.visible ? 1 : 0,
          transform: timelineVis.visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: "80px",
        }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#6366f1", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>My Journey</div>
          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#ffffff", margin: "0 0 48px", letterSpacing: "-1px" }}>Timeline</h2>
        </div>

        <div ref={lineContainerRef} style={{ position: "relative", marginBottom: "80px" }}>
          <div style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "2px" }} />
          <div style={{ position: "absolute", left: "20px", top: 0, width: "2px", height: `${lineProgress * 100}%`, background: "linear-gradient(to bottom, #3b82f6, #6366f1, #38bdf8, #10b981, #60a5fa)", borderRadius: "2px", boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)", transition: "height 0.08s linear" }} />
          {timeline.map((item, i) => (
            <TimelineItem key={item.year + item.title} item={item} index={i} total={timeline.length} />
          ))}
        </div>

        {/* Technical Focus Areas */}
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Passions</div>
        <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#ffffff", margin: "0 0 40px", letterSpacing: "-1px" }}>Technical Focus Areas</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "16px" }}>
          {interests.map((item, i) => (
            <InterestCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item, index, total }: { item: typeof timeline[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const visObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 120); visObs.disconnect(); }
    }, { threshold: 0.2 });
    visObs.observe(el);
    const glowObs = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); }, { threshold: 0.5 });
    glowObs.observe(el);
    return () => { visObs.disconnect(); glowObs.disconnect(); };
  }, [index]);

  return (
    <div ref={ref} style={{
      display: "flex", gap: "20px",
      marginBottom: index === total - 1 ? 0 : "36px",
      opacity: visible ? 1 : 0,
      transform: visible ? (hovered ? "translateY(-2px)" : "translateY(0)") : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "40px" }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "12px",
          background: inView ? `rgba(${hexToRgb(item.color)}, 0.12)` : "rgba(15, 15, 15, 0.9)",
          border: `1.5px solid ${inView ? item.color : "rgba(255, 255, 255, 0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", flexShrink: 0, zIndex: 1,
        }}>{item.icon}</div>
      </div>
      <div style={{
        flex: 1, padding: "20px 24px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : cardBg,
        border: `1px solid ${hovered ? `rgba(${hexToRgb(item.color)}, 0.35)` : "rgba(255, 255, 255, 0.07)"}`,
        borderRadius: "16px",
        transition: "all 0.35s ease",
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
          <span style={{ padding: "3px 12px", borderRadius: "100px", background: `rgba(${hexToRgb(item.color)}, 0.12)`, border: `1px solid rgba(${hexToRgb(item.color)}, 0.25)`, color: item.color, fontSize: "11px", fontWeight: 700 }}>{item.year}</span>
          <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>{item.title}</h3>
        </div>
        <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>{item.description}</p>
      </div>
    </div>
  );
}

function InterestCard({ item, index }: { item: typeof interests[0]; index: number }) {
  const { ref, visible } = useVisible(index * 80);
  return (
    <div ref={ref} style={{
      padding: "24px", background: cardBg, border: cardBorder, borderRadius: "16px",
      transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
      <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>{item.title}</h3>
      <p style={{ fontSize: "13px", color: "#a1a1aa", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
    </div>
  );
}
