import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { stats, projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

const TypeWriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 2400);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? 65 : 120;
    const t = setTimeout(() => {
      setText(words[index].substring(0, subIndex));
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting, words]);

  return (
    <span>
      {text}
      <span style={{ borderRight: "2px solid #38bdf8", marginLeft: "2px", animation: "blink 1s step-end infinite" }} />
    </span>
  );
};

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current * 100) / 100);
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const display = Number.isInteger(target) ? Math.floor(count) : count.toFixed(2);
  return <div ref={ref}>{display}{suffix}</div>;
};



const whatIDoItems = [
  { icon: "⚡", title: "REST API Architecture", desc: "Designing scalable, secure Web APIs with ASP.NET Core, clean routing, and JWT authentication." },
  { icon: "🗄️", title: "Database Systems & ORM", desc: "Crafting optimized SQL Server relational schemas, indexing, and Entity Framework Core mappings." },
  { icon: "🧩", title: "Clean Code & SOLID", desc: "Writing readable, maintainable software enforcing OOP design patterns and unit testing." },
];

function HeroCtaButtons({ visible }: { visible: boolean }) {
  const [btnHover, setBtnHover] = useState<string | null>(null);

  return (
    <div style={{
      display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center",
      marginTop: "36px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
    }}>
      <Link to="/projects" style={{ textDecoration: "none" }}>
        <button
          onMouseEnter={() => setBtnHover("projects")}
          onMouseLeave={() => setBtnHover(null)}
          style={{
            padding: "14px 28px", borderRadius: "12px", border: "none",
            background: btnHover === "projects"
              ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#ffffff", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            transform: btnHover === "projects" ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: btnHover === "projects"
              ? "0 12px 32px rgba(59, 130, 246, 0.5)"
              : "0 8px 24px rgba(59, 130, 246, 0.35)",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          Explore Projects <span style={{ transition: "transform 0.3s ease", transform: btnHover === "projects" ? "translateX(4px)" : "translateX(0)" }}>→</span>
        </button>
      </Link>

      <Link to="/contact" style={{ textDecoration: "none" }}>
        <button
          onMouseEnter={() => setBtnHover("contact")}
          onMouseLeave={() => setBtnHover(null)}
          style={{
            padding: "14px 28px", borderRadius: "12px",
            border: btnHover === "contact"
              ? "1.5px solid rgba(45, 212, 191, 0.8)"
              : "1.5px solid rgba(45, 212, 191, 0.45)",
            background: btnHover === "contact"
              ? "rgba(45, 212, 191, 0.16)"
              : "rgba(45, 212, 191, 0.07)",
            color: "#2DD4BF", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transform: btnHover === "contact" ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: btnHover === "contact"
              ? "0 10px 28px rgba(45, 212, 191, 0.25)"
              : "none",
          }}
        >
          Contact Me
        </button>
      </Link>

      <a href="https://github.com/MuhammadSufyanKhn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <button
          onMouseEnter={() => setBtnHover("github")}
          onMouseLeave={() => setBtnHover(null)}
          style={{
            padding: "14px 28px", borderRadius: "12px",
            border: btnHover === "github"
              ? "1.5px solid rgba(255, 255, 255, 0.5)"
              : "1.5px solid rgba(255, 255, 255, 0.22)",
            background: btnHover === "github"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.04)",
            color: "#f1f5f9", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transform: btnHover === "github" ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: btnHover === "github"
              ? "0 10px 28px rgba(255, 255, 255, 0.15)"
              : "none",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          GitHub
        </button>
      </a>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const whoHero = useVisible(100);
  const whatHero = useVisible(150);
  const featHero = useVisible(100);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const featured = [...projects.dotnet.slice(0, 2), projects.python[0]];

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      {/* Hero */}
      <section className="hero-section" style={{
        minHeight: "85vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 40px",
        textAlign: "center",
      }}>
        {/* Availability Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 18px",
          background: "rgba(45, 212, 191, 0.08)",
          border: "1px solid rgba(45, 212, 191, 0.25)",
          borderRadius: "100px",
          marginBottom: "32px",
          opacity: visible ? 1 : 0,
          animation: visible ? "badgeFloat 3s ease-in-out infinite" : "none",
          transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2DD4BF", boxShadow: "0 0 10px #2DD4BF", animation: "pulseGlow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#2DD4BF", letterSpacing: "0.3px" }}>
            Available for .NET Developer Internships
          </span>
        </div>

        {/* Greeting */}
        <div style={{
          fontSize: "clamp(18px, 2.5vw, 26px)",
          fontWeight: 500,
          color: "#94a3b8",
          letterSpacing: "0.5px",
          marginBottom: "8px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
        }}>
          Hi there 👋, I am
        </div>

        <h1 style={{
          fontFamily: "'Poppins', 'Inter', sans-serif",
          fontSize: "clamp(34px, 8vw, 92px)",
          fontWeight: 800, lineHeight: 1.05,
          color: "#ffffff", letterSpacing: "-3px", margin: 0,
          textShadow: "0 0 80px rgba(79, 127, 255, 0.15), 0 0 40px rgba(45, 212, 191, 0.1)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
        }}>
          Muhammad{" "}
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Sufyan
          </span>
          <br />Khan
        </h1>

        <div style={{
          marginTop: "24px",
          fontSize: "clamp(18px, 2.5vw, 24px)",
          fontWeight: 500, color: "#CBD5E1",
          minHeight: "36px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}>
          <TypeWriter words={[
            "ASP.NET Core Backend Engineer",
            "Building Scalable REST APIs",
            "Entity Framework Core & SQL Server",
            "High Performance System Architecture",
          ]} />
        </div>

        <p style={{
          maxWidth: "600px",
          fontSize: "16px", color: "#CBD5E1", lineHeight: 1.7, marginTop: "20px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
        }}>
          BSCS student at Sir Syed University of Engineering & Technology (3.97 CGPA). I architect production ready backend systems, REST APIs, and database driven software with clean architecture.
        </p>

        {/* Hero CTA Buttons */}
        <HeroCtaButtons visible={visible} />
      </section>

      {/* WHO AM I & WHAT I DO SECTION */}
      <section style={{ padding: "60px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", alignItems: "stretch" }} className="who-what-grid">

          {/* Who Am I Card */}
          <div ref={whoHero.ref} style={{
            padding: "36px 32px",
            background: "rgba(15, 15, 15, 0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            opacity: whoHero.visible ? 1 : 0,
            transform: whoHero.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
                Introduction
              </div>
              <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "28px", fontWeight: 800, color: "#ffffff", margin: "0 0 16px" }}>
                Who Am I
              </h2>
              <p style={{ fontSize: "15px", color: "#a1a1aa", lineHeight: 1.8, marginBottom: "16px" }}>
                I am a Computer Science student at Sir Syed University of Engineering &amp; Technology maintaining a 3.97 CGPA. My focus is on backend engineering, specializing in C#, ASP.NET Core, and relational database systems.
              </p>
              <p style={{ fontSize: "15px", color: "#a1a1aa", lineHeight: 1.8, margin: 0 }}>
                With hands on developer internship experience at companies like 10Pearls and CodeLabs, I build secure, high performance software applications with clean architecture and SOLID principles.
              </p>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "10px 18px", borderRadius: "10px", border: "1px solid rgba(56, 189, 248, 0.3)",
                  background: "rgba(56, 189, 248, 0.08)", color: "#38bdf8", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                }}>
                  Read Full Bio →
                </button>
              </Link>
              <Link to="/experience" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "10px 18px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.04)", color: "#e4e4e7", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                }}>
                  View Experience
                </button>
              </Link>
            </div>
          </div>

          {/* What I Do Card & Grid */}
          <div ref={whatHero.ref} className="what-i-do-card" style={{
            padding: "36px 32px",
            background: "rgba(15, 15, 15, 0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            opacity: whatHero.visible ? 1 : 0,
            transform: whatHero.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
              Core Capabilities
            </div>
            <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "28px", fontWeight: 800, color: "#ffffff", margin: "0 0 24px" }}>
              What I Do
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="what-grid">
              {whatIDoItems.map((item) => (
                <div key={item.title} style={{
                  padding: "18px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "14px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(16, 185, 129, 0.25)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.03)";
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Stats Bar */}
      <section className="hero-section" style={{ padding: "40px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "16px" }}>
          {stats.map((stat, i) => {
            const statVis = useVisible(i * 120);
            return (
            <div ref={statVis.ref} key={stat.label} style={{
              padding: "28px 24px",
              background: "rgba(15, 15, 15, 0.7)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              textAlign: "center",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "default",
              opacity: statVis.visible ? 1 : 0,
              transform: statVis.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.25)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px -12px rgba(59, 130, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontSize: "38px", fontWeight: 800,
                background: i % 2 === 0 ? "linear-gradient(135deg, #38bdf8, #3b82f6)" : "linear-gradient(135deg, #60a5fa, #818cf8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1,
              }}>
                <Counter target={parseFloat(stat.value)} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginTop: "8px" }}>{stat.label}</div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="hero-section" style={{ padding: "60px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={featHero.ref} style={{ marginBottom: "40px", opacity: featHero.visible ? 1 : 0, transform: featHero.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Selected Work</div>
          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#ffffff", margin: "0 0 12px" }}>Featured Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "20px", marginBottom: "32px" }}>
          {featured.map((p) => (
            <div key={p.id} className="card-body" style={{
              padding: "24px", background: "rgba(15, 15, 15, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.25)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px -15px rgba(59, 130, 246, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px" }}>{p.category}</span>
              <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "8px 0" }}>{p.title}</h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 16px" }}>{p.description.substring(0, 100)}...</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} style={{ padding: "3px 10px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", fontSize: "11px", color: "#94a3b8" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <button style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#38bdf8", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(56, 189, 248, 0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px -8px rgba(56, 189, 248, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >View All Projects →</button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradientShiftReverse {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 768px) {
          .who-what-grid { grid-template-columns: 1fr !important; }
          .what-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
