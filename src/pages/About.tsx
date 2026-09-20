import { useEffect, useRef, useState } from "react";
import { useVisible } from "../utils/useVisible";

const timeline = [
  { year: "2023", title: "Started CS journey", description: "Enrolled at Sir Syed University of Engineering & Technology for a Bachelor's in Computer Science. Discovered my passion for backend programming.", icon: "🎓", badge: "Education" },
  { year: "2023", title: "Deep dive into .NET", description: "Mastered C# and ASP.NET Core. Built my first REST API and fell in love with clean architecture, Entity Framework Core, and relational database design.", icon: "💻", badge: "Milestone" },
  { year: "2024", title: "Production projects", description: "Built multiple full-stack systems including Cab Management System and Task Management Platform. Gained confidence with EF Core, SQL Server, and MVC patterns.", icon: "🚀", badge: "Projects" },
  { year: "2025", title: "Internship at CodeLabs", description: "Joined CodeLabs Pvt Ltd as a .NET Developer Intern. Engineered production-grade systems alongside senior software engineers on real client work.", icon: "💼", badge: "Internship" },
  { year: "2026", title: "Internship at 10Pearls", description: "Joined 10Pearls as a .NET Developer Intern, contributing to enterprise-grade software solutions and collaborating with cross-functional teams.", icon: "🖥️", badge: "Internship" },
  { year: "2027", title: "Graduation & beyond", description: "On track to graduate with a 3.97 CGPA. Seeking full-time software engineering roles at high-impact technology companies.", icon: "⭐", badge: "Future" },
];

const interests = [
  { icon: "🏗️", title: "Backend architecture", desc: "Clean, scalable API design with ASP.NET Core" },
  { icon: "🗄️", title: "Database systems", desc: "Optimized SQL queries, indexes, and schema design" },
  { icon: "🔐", title: "Application security", desc: "JWT authentication and role-based authorization" },
  { icon: "⚡", title: "High performance", desc: "Building fast, efficient, low-latency services" },
  { icon: "📦", title: "Clean code & patterns", desc: "SOLID principles, repository patterns, and DDD" },
  { icon: "☁️", title: "Cloud & containers", desc: "Docker containers and Azure Cloud Services" },
];

export default function About() {
  const hero = useVisible();
  const timelineVis = useVisible(100);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>

        {/* Hero */}
        <div ref={hero.ref} style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease", marginBottom: "28px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>About me</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Engineered for reliability,<br />crafted for scale.
          </h1>
        </div>

        {/* Bio + Quick Info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start", marginBottom: "80px" }} className="about-grid">
          <div>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "18px", color: "var(--ink)", lineHeight: 1.7, marginBottom: "18px", marginTop: 0 }}>
              I'm <strong>Muhammad Sufyan Khan</strong>, a Computer Science student at Sir Syed University of Engineering & Technology maintaining a 3.97 CGPA. I specialize in building backend architectures using ASP.NET Core, C#, and SQL Server.
            </p>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
              My focus centres around robust REST APIs, relational database schemas, and clean object-oriented code following SOLID principles.
            </p>
          </div>
          <div
            className="flowing-card"
            style={{
              padding: "24px 26px",
              background: "var(--card)",
              borderRadius: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {[
              { label: "University", value: "Sir Syed UET" },
              { label: "Degree", value: "BS Computer Science" },
              { label: "CGPA", value: "3.97 / 4.0" },
              { label: "Semester", value: "Completed 6th" },
              { label: "Location", value: "Pakistan" },
            ].map((item, idx, arr) => (
              <div key={item.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: idx === arr.length - 1 ? "none" : "1px solid var(--line)",
                position: "relative", zIndex: 2,
              }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "14px", color: "var(--ink)", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline header */}
        <div ref={timelineVis.ref} style={{ opacity: timelineVis.visible ? 1 : 0, transform: timelineVis.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease", marginBottom: "48px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>My journey</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Timeline & Milestones</h2>
        </div>

        {/* Diagonal Zigzag Timeline (Pic 2) */}
        <DiagonalTimeline />

        {/* Technical focus */}
        <div style={{ marginTop: "80px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Passions</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 36px", letterSpacing: "-0.02em" }}>Technical focus areas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "16px" }}>
            {interests.map((item, i) => (
              <InterestCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .zigzag-desktop-wrap { display: none !important; }
          .zigzag-mobile-wrap { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (min-width: 769px) {
          .zigzag-mobile-wrap { display: none !important; }
          .zigzag-desktop-wrap { display: block !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Diagonal zigzag timeline (Scroll-Controlled) ── */
function DiagonalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate coordinates of node dots
  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef.current) return;
      const dots = containerRef.current.querySelectorAll(".zigzag-node-dot");
      const cRect = containerRef.current.getBoundingClientRect();
      const coords: { x: number; y: number }[] = [];
      dots.forEach(dot => {
        const dRect = dot.getBoundingClientRect();
        coords.push({
          x: dRect.left - cRect.left + dRect.width / 2,
          y: dRect.top - cRect.top + dRect.height / 2,
        });
      });
      setPoints(coords);
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    const t = setTimeout(updateCoords, 300);
    return () => {
      window.removeEventListener("resize", updateCoords);
      clearTimeout(t);
    };
  }, []);

  // Smooth scroll scrubbing: line progress directly controlled by scroll position
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const vh = window.innerHeight;
          // Start extending when top of container enters 72% of viewport
          // Complete when bottom of container reaches 28% of viewport
          const enterY = vh * 0.72;
          const exitY = vh * 0.28;
          const totalDistance = rect.height + (enterY - exitY);
          const currentDistance = enterY - rect.top;
          const raw = currentDistance / totalDistance;
          const clamped = Math.max(0, Math.min(1, raw));
          setScrollProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Construct a continuous organic flowing path through all milestone coordinates
  const pathD = points.length >= 2
    ? points.reduce((acc, pt, i) => {
        if (i === 0) {
          return `M ${pt.x} ${pt.y - 28} L ${pt.x} ${pt.y}`;
        }
        const prevPt = points[i - 1];
        const dy = pt.y - prevPt.y;
        // Natural S-curve easing between zigzag nodes
        const cp1y = prevPt.y + dy * 0.45;
        const cp2y = prevPt.y + dy * 0.55;
        return `${acc} C ${prevPt.x} ${cp1y}, ${pt.x} ${cp2y}, ${pt.x} ${pt.y}`;
      }, "") + ` L ${points[points.length - 1].x} ${points[points.length - 1].y + 32}`
    : "";

  // Thresholds for each milestone node: line physically reaches node -> card appears
  const thresholds = points.length === timeline.length && containerRef.current
    ? points.map(pt => {
        const h = containerRef.current?.getBoundingClientRect().height || 1000;
        return Math.max(0.06, Math.min(0.96, pt.y / h));
      })
    : [0.08, 0.25, 0.43, 0.61, 0.79, 0.95];

  return (
    <div style={{ position: "relative" }}>
      {/* ── Desktop Diagonal Zigzag Layout ── */}
      <div ref={containerRef} className="zigzag-desktop-wrap" style={{ position: "relative" }}>
        {/* Continuous Flowing SVG Line Animation */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          {/* Subtle background track */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="var(--line)"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.45"
              strokeLinecap="round"
            />
          )}

          {/* Scroll-driven progressive line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1000"
              strokeDasharray="1000"
              strokeDashoffset={1000 * (1 - scrollProgress)}
              style={{
                filter: "drop-shadow(0 0 8px rgba(194, 65, 12, 0.45))",
                transition: "stroke-dashoffset 0.08s linear",
              }}
            />
          )}
        </svg>

        {/* Timeline Rows */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isRevealed = scrollProgress >= (thresholds[i] ?? (i / timeline.length));
            return (
              <ZigzagRow
                key={item.year + item.title}
                item={item}
                isLeft={isLeft}
                isRevealed={isRevealed}
              />
            );
          })}
        </div>
      </div>

      {/* ── Mobile Vertical Layout (<768px) ── */}
      <div className="zigzag-mobile-wrap" style={{ position: "relative", paddingLeft: "30px" }}>
        {/* Animated vertical line */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "11px",
            top: "10px",
            bottom: "10px",
            width: "4px",
            height: "calc(100% - 20px)",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 6" opacity="0.4" />
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1000"
            strokeDasharray="1000"
            strokeDashoffset={1000 * (1 - scrollProgress)}
            style={{
              filter: "drop-shadow(0 0 6px rgba(194, 65, 12, 0.45))",
              transition: "stroke-dashoffset 0.08s linear",
            }}
          />
        </svg>

        {timeline.map((item, idx) => {
          const isMobileRevealed = scrollProgress >= (thresholds[idx] ?? (idx / timeline.length));
          return (
            <div
              key={item.year + item.title}
              style={{
                position: "relative",
                marginBottom: "32px",
                opacity: isMobileRevealed ? 1 : 0,
                transform: isMobileRevealed ? "translateY(0)" : "translateY(22px)",
                transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: isMobileRevealed ? "auto" : "none",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-25px",
                  top: "16px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: isMobileRevealed ? "var(--accent)" : "var(--card)",
                  border: `3px solid ${isMobileRevealed ? "var(--accent)" : "var(--line)"}`,
                  boxShadow: isMobileRevealed ? "0 0 0 3px rgba(194, 65, 12, 0.35)" : "none",
                  transition: "all 0.35s ease",
                }}
              />
              {/* Card */}
              <div
                style={{
                  padding: "18px 20px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span
                    style={{
                      padding: "2px 9px",
                      borderRadius: "100px",
                      background: "var(--tint)",
                      border: "1px solid var(--line)",
                      color: "var(--accent)",
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {item.year}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {item.badge}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ZigzagRow({
  item,
  isLeft,
  isRevealed,
}: {
  item: typeof timeline[0];
  isLeft: boolean;
  isRevealed: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "52px",
        position: "relative",
      }}
    >
      {/* Left Column */}
      <div style={{ flex: "0 0 44%", display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start" }}>
        {isLeft ? (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flowing-card"
            style={{
              width: "100%",
              padding: "22px 24px",
              background: "var(--card)",
              borderRadius: "16px",
              boxShadow: hovered ? "0 12px 32px -8px rgba(194, 65, 12, 0.22), 0 0 0 1px var(--accent)" : "0 2px 10px rgba(0,0,0,0.04)",
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(24px)",
              pointerEvents: isRevealed ? "auto" : "none",
              textAlign: "right",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginBottom: "8px", position: "relative", zIndex: 2 }}>
              <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {item.badge}
              </span>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  border: "1px solid var(--line)",
                  color: "var(--accent)",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {item.year}
              </span>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", position: "relative", zIndex: 2 }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: 0, position: "relative", zIndex: 2 }}>
              {item.description}
            </p>
          </div>
        ) : (
          <div style={{ width: "100%" }} />
        )}
      </div>

      {/* Center Slanted Node Area */}
      <div
        style={{
          flex: "0 0 12%",
          display: "flex",
          flexDirection: "column",
          alignItems: isLeft ? "flex-end" : "flex-start",
          padding: isLeft ? "0 14px 0 0" : "0 0 0 14px",
          position: "relative",
        }}
      >
        {/* Node Dot with pulsing halo when reached */}
        <div
          className="zigzag-node-dot"
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: isRevealed ? "var(--accent)" : "var(--card)",
            border: `3px solid ${isRevealed ? "var(--accent)" : "var(--line)"}`,
            boxShadow: isRevealed ? (hovered ? "0 0 0 5px var(--accent)" : "0 0 0 4px rgba(194, 65, 12, 0.35)") : "none",
            transition: "all 0.35s ease",
            transform: isRevealed ? (hovered ? "scale(1.25)" : "scale(1)") : "scale(0.8)",
            opacity: isRevealed ? 1 : 0.4,
            zIndex: 3,
          }}
        />
        {/* Horizontal connector line */}
        <div
          style={{
            position: "absolute",
            top: "7px",
            [isLeft ? "right" : "left"]: "12px",
            width: "42px",
            height: "2px",
            background: "var(--accent)",
            opacity: isRevealed ? (hovered ? 1 : 0.8) : 0.2,
            transition: "opacity 0.35s ease",
            zIndex: 2,
          }}
        />
      </div>

      {/* Right Column */}
      <div style={{ flex: "0 0 44%", display: "flex", justifyContent: !isLeft ? "flex-start" : "flex-end" }}>
        {!isLeft ? (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flowing-card"
            style={{
              width: "100%",
              padding: "22px 24px",
              background: "var(--card)",
              borderRadius: "16px",
              boxShadow: hovered ? "0 12px 32px -8px rgba(194, 65, 12, 0.22), 0 0 0 1px var(--accent)" : "0 2px 10px rgba(0,0,0,0.04)",
              transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(24px)",
              pointerEvents: isRevealed ? "auto" : "none",
              textAlign: "left",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "8px", marginBottom: "8px", position: "relative", zIndex: 2 }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: "100px",
                  background: "var(--tint)",
                  border: "1px solid var(--line)",
                  color: "var(--accent)",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {item.year}
              </span>
              <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {item.badge}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", position: "relative", zIndex: 2 }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: 0, position: "relative", zIndex: 2 }}>
              {item.description}
            </p>
          </div>
        ) : (
          <div style={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
}

function InterestCard({ item, index }: { item: typeof interests[0]; index: number }) {
  const { ref, visible } = useVisible(index * 70);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px 22px",
        borderTop: hovered ? "2px solid var(--accent)" : "1px solid var(--line)",
        background: hovered ? "color-mix(in srgb, var(--tint) 35%, transparent)" : "color-mix(in srgb, var(--card) 40%, transparent)",
        borderRadius: "12px",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(16px)",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>{item.icon}</div>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{item.title}</h3>
      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
    </div>
  );
}
