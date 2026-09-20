import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { stats, projects } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";
import ProjectModal from "../components/ProjectModal";

/* ── Typewriter ── */
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
      setIndex(i => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? 65 : 110;
    const t = setTimeout(() => {
      setText(words[index].substring(0, subIndex));
      setSubIndex(s => s + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [subIndex, index, deleting, words]);

  return (
    <span>
      {text}
      <span style={{ borderRight: "2px solid var(--accent)", marginLeft: "2px", animation: "caretBlink 1s step-end infinite" }} />
    </span>
  );
};

/* ── Counting number ── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(current * 100) / 100); }
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
  { icon: "⚡", title: "REST API architecture", desc: "Scalable, secure web APIs with ASP.NET Core, clean routing, and JWT authentication." },
  { icon: "🗄️", title: "Database systems & ORM", desc: "Optimized SQL Server schemas, indexing, and Entity Framework Core mappings." },
  { icon: "🧩", title: "Clean code & SOLID", desc: "Readable, maintainable software with OOP design patterns and unit testing." },
];

/* ── Hero JSON API card ── */
function JsonApiCard({ delay }: { delay: number }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  const resolve = (v: any) => (v && typeof v === "object" && "children" in v ? v.children : v);
  const S = (v: any) => <span style={{ color: "var(--tint-ink)" }}>"{resolve(v)}"</span>;
  const N = (v: any) => <span style={{ color: "var(--accent)" }}>{resolve(v)}</span>;
  const K = (v: any) => <span style={{ color: "var(--ink)", fontWeight: 600 }}>"{resolve(v)}"</span>;
  const P = (v: any) => <span style={{ color: "var(--muted)" }}>{resolve(v)}</span>;
  const Bool = (v: any) => <span style={{ color: "var(--accent)", fontWeight: 700 }}>{resolve(v)}</span>;

  return (
    <div
      className="flowing-card"
      style={{
        background: "var(--card)",
        borderRadius: "16px",
        padding: "20px 22px",
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        fontSize: "12.5px",
        lineHeight: 1.9,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        opacity: 1,
        transform: "none",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        minWidth: 0,
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid var(--line)" }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>GET</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--ink)" }}>/api/developers/sufyan</span>
        <span style={{
          marginLeft: "auto", padding: "2px 8px", borderRadius: "100px",
          background: "var(--tint)", border: "1px solid var(--line)",
          color: "var(--tint-ink)", fontSize: "10px", fontWeight: 700,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>200 OK</span>
      </div>

      {/* JSON */}
      <div>
        <P>{"{"}</P>
        <div style={{ paddingLeft: "16px" }}>
          <div>{K("name")}<P>: </P>{S("Muhammad Sufyan Khan")}<P>,</P></div>
          <div>{K("role")}<P>: </P>{S("ASP.NET Core Developer")}<P>,</P></div>
          <div>{K("university")}<P>: </P>{S("Sir Syed UET")}<P>,</P></div>
          <div>{K("cgpa")}<P>: </P>{N("3.97")}<P>,</P></div>
          <div>{K("stack")}<P>: [</P>{S("C#")}<P>, </P>{S(".NET")}<P>, </P>{S("SQL Server")}<P>],</P></div>
          <div>{K("openToInternships")}<P>: </P>{Bool("true")}</div>
        </div>
        <P>{"}"}</P>
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px", height: "14px",
            background: "var(--accent)",
            marginLeft: "2px",
            verticalAlign: "middle",
            opacity: blink ? 1 : 0,
            transition: "opacity 0.05s",
          }}
        />
      </div>
    </div>
  );
}

/* ── Featured Project Coverflow Carousel (pic 1 style) ── */
function CoverflowCarousel({ featured, onSelect }: { featured: any[]; onSelect: (p: any) => void }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(c => (c - 1 + featured.length) % featured.length), [featured.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % featured.length), [featured.length]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Keyboard navigation [ArrowLeft] and [ArrowRight]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    setTouchStartX(null);
  };

  const stageVis = useVisible(80, 0.15);

  const project = featured[current];
  const prevProject = featured[(current - 1 + featured.length) % featured.length];
  const nextProject = featured[(current + 1) % featured.length];

  // Helper metadata
  const metaItems = [
    { label: "Category", val: project?.category === "dotnet" ? ".NET Core" : project?.category },
    { label: "Database", val: "SQL Server" },
    { label: "Status", val: project?.status || "Completed" },
  ];

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ position: "relative", width: "100%", margin: "0 auto", overflow: "hidden", userSelect: "none" }}>
      {/* 3D Stage Container */}
      <div
        ref={stageVis.ref}
        className="featured-carousel-stage"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "440px",
          position: "relative",
          perspective: "1000px",
          padding: "20px 0",
        }}
      >
        {/* Previous Card (Left side 3D preview) */}
        {featured.length > 1 && (
          <div
            onClick={prev}
            className="carousel-ghost-left flowing-card"
            style={{
              position: "absolute",
              left: "1%",
              width: "350px",
              maxWidth: "38vw",
              height: "440px",
              background: "var(--card)",
              borderRadius: "20px",
              opacity: stageVis.visible ? 0.6 : 0,
              transform: stageVis.visible
                ? "translateX(-20px) translateY(0px) scale(0.85) rotateY(16deg)"
                : "translateX(-20px) translateY(36px) scale(0.76) rotateY(16deg)",
              cursor: "pointer",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, box-shadow 0.3s ease, border-color 0.3s ease",
              zIndex: 2,
              pointerEvents: "all",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
            title="Click to view previous project"
          >
            {/* Left preview image with gentle pan-zoom */}
            <div
              style={{
                height: "140px",
                minHeight: "140px",
                maxHeight: "140px",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid var(--line)",
                background: "#18181b",
              }}
            >
              {prevProject?.image ? (
                <img
                  src={prevProject.image}
                  alt={prevProject.title}
                  className="pan-zoom-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>
                  {prevProject?.emoji || "📦"}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "12px",
                  padding: "3px 9px",
                  borderRadius: "100px",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span>← Previous</span>
              </div>
            </div>

            <div style={{ padding: "18px 20px", textAlign: "left", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", textTransform: "uppercase", marginBottom: "4px" }}>
                  {prevProject?.category === "dotnet" ? ".NET Project" : prevProject?.category}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: 1.3, marginBottom: "8px" }}>
                  {prevProject?.title}
                </div>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {prevProject?.description}
                </p>
              </div>
              <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Click to switch →
              </div>
            </div>
          </div>
        )}

        {/* Next Card (Right side 3D preview) */}
        {featured.length > 1 && (
          <div
            onClick={next}
            className="carousel-ghost-right flowing-card"
            style={{
              position: "absolute",
              right: "1%",
              width: "350px",
              maxWidth: "38vw",
              height: "440px",
              background: "var(--card)",
              borderRadius: "20px",
              opacity: stageVis.visible ? 0.6 : 0,
              transform: stageVis.visible
                ? "translateX(20px) translateY(0px) scale(0.85) rotateY(-16deg)"
                : "translateX(20px) translateY(36px) scale(0.76) rotateY(-16deg)",
              cursor: "pointer",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, box-shadow 0.3s ease, border-color 0.3s ease",
              zIndex: 2,
              pointerEvents: "all",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
            title="Click to view next project"
          >
            {/* Right preview image with gentle pan-zoom */}
            <div
              style={{
                height: "140px",
                minHeight: "140px",
                maxHeight: "140px",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid var(--line)",
                background: "#18181b",
              }}
            >
              {nextProject?.image ? (
                <img
                  src={nextProject.image}
                  alt={nextProject.title}
                  className="pan-zoom-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>
                  {nextProject?.emoji || "🚀"}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "12px",
                  padding: "3px 9px",
                  borderRadius: "100px",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span>Next →</span>
              </div>
            </div>

            <div style={{ padding: "18px 20px", textAlign: "right", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", textTransform: "uppercase", marginBottom: "4px" }}>
                  {nextProject?.category === "dotnet" ? ".NET Project" : nextProject?.category}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: 1.3, marginBottom: "8px" }}>
                  {nextProject?.title}
                </div>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {nextProject?.description}
                </p>
              </div>
              <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                ← Click to switch
              </div>
            </div>
          </div>
        )}

        {/* Center Active Card - Exactly identical size for all projects */}
        <div
          className="carousel-active-card flowing-card"
          style={{
            width: "100%",
            maxWidth: "540px",
            height: "535px",
            background: "var(--card)",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 16px 48px -10px rgba(194, 65, 12, 0.28)",
            opacity: stageVis.visible ? 1 : 0,
            transform: stageVis.visible ? "translateY(0px) scale(1)" : "translateY(42px) scale(0.92)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, box-shadow 0.3s ease, border-color 0.3s ease",
          }}
        >
          {/* Animated changing container on card change */}
          <div
            key={current}
            style={{
              animation: "cardGentleFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Card Visual Banner (Top Half - Fixed 165px height with dynamic image pan/zoom) */}
            <div
              style={{
                height: "165px",
                minHeight: "165px",
                maxHeight: "165px",
                background: "#18181b",
                borderBottom: "1px solid var(--line)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* High Quality Real Project Image with Gentle Motion */}
              {project?.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="pan-zoom-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{ fontSize: "50px", position: "relative", zIndex: 2 }}>{project?.emoji || "🚀"}</div>
              )}

              {/* Gradient Scrim for Readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.72) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Mock Window Controls Header */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 3,
                  padding: "3px 10px",
                  borderRadius: "100px",
                  background: "rgba(0, 0, 0, 0.45)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ marginLeft: "5px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "rgba(255, 255, 255, 0.9)" }}>
                  preview.live
                </span>
              </div>

              {/* Badges on top-right of banner */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    padding: "3px 10px",
                    borderRadius: "100px",
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#fdba74",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>★</span>
                  <span>{project?.expertise ? "Core expertise" : ".NET Project"}</span>
                </div>

                <div
                  style={{
                    padding: "3px 9px",
                    borderRadius: "100px",
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: project?.status === "Completed" ? "#34d399" : "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor" }} />
                  <span>{project?.status}</span>
                </div>
              </div>

              {/* Bottom category tag on image */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "14px",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "rgba(255, 255, 255, 0.9)",
                    background: "rgba(0, 0, 0, 0.48)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  {project?.category === "dotnet" ? "ASP.NET Core" : project?.category}
                </span>
              </div>
            </div>

            {/* Card Body Content - Exactly fixed heights */}
            <div
              style={{
                padding: "22px 24px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Title (clamped to 2 lines, minHeight 52px) */}
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    minHeight: "52px",
                    maxHeight: "52px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project?.title}
                </h3>

                {/* Description (clamped to 2 lines, minHeight 44px) */}
                <p
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.55,
                    margin: "0 0 16px",
                    minHeight: "44px",
                    maxHeight: "44px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project?.description}
                </p>

                {/* Metadata Info Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {metaItems.map(m => (
                    <div
                      key={m.label}
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--line)",
                        borderRadius: "10px",
                        padding: "6px 8px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "9.5px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {m.label}
                      </div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11.5px", fontWeight: 700, color: "var(--ink)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div style={{ display: "flex", flexWrap: "nowrap", gap: "6px", marginBottom: "18px", overflow: "hidden", height: "26px" }}>
                  {project?.tech?.slice(0, 4).map((t: string) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        padding: "2px 8px",
                        background: "var(--tint)",
                        border: "1px solid var(--line)",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: "var(--tint-ink)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full-width CTA buttons matching Pic 1 */}
              <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                <button
                  onClick={() => onSelect(project)}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: "center", height: "42px", fontSize: "14px" }}
                >
                  View details →
                </button>
                {project?.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    aria-label="GitHub repository"
                  >
                    <button
                      className="btn-secondary"
                      style={{ height: "42px", width: "42px", padding: 0, justifyContent: "center" }}
                      title="View source code on GitHub"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Row matching Pic 1: < 01 —————— 03 > */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Prev Button */}
          <button
            onClick={prev}
            aria-label="Previous project"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--card)",
              color: "var(--ink)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Index Counter & Progress Bar: 01 —————— 03 */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              {String(current + 1).padStart(2, "0")}
            </span>

            {/* Connecting line */}
            <div
              style={{
                width: "64px",
                height: "2px",
                background: "var(--line)",
                position: "relative",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${((current + 1) / featured.length) * 100}%`,
                  background: "var(--accent)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--muted)",
              }}
            >
              {String(featured.length).padStart(2, "0")}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            aria-label="Next project"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--card)",
              color: "var(--ink)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Keyboard hint matching Pic 1 */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.04em",
          }}
        >
          Use <span style={{ padding: "1px 5px", border: "1px solid var(--line)", borderRadius: "4px", background: "var(--card)" }}>←</span> <span style={{ padding: "1px 5px", border: "1px solid var(--line)", borderRadius: "4px", background: "var(--card)" }}>→</span> arrow keys to navigate
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .carousel-ghost-left, .carousel-ghost-right {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const featHero = useVisible(100);
  const whoVis = useVisible(100);

  // Top featured projects
  const featured = projects.dotnet;

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>

      {/* ── HERO ── */}
      <section id="hero" style={{ maxWidth: "980px", margin: "0 auto", padding: "100px 24px 60px" }} className="hero-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="hero-grid">

          {/* Left: text */}
          <div>
            {/* Status pill with floating animation */}
            <div
              data-in
              className={`status-pill-wrap floating-status-pill`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                background: "var(--tint)", border: "1px solid var(--line)",
                marginBottom: "24px",
                "--d": "0.2s",
              } as React.CSSProperties}
            >
              <span
                className="pulse-dot"
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }}
              />
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "13px", fontWeight: 600, color: "var(--tint-ink)" }}>
                Open to internship opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              data-in
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(36px, 6vw, 68px)",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                "--d": "0.28s",
              } as React.CSSProperties}
            >
              Muhammad<br />Sufyan Khan
            </h1>

            {/* Typewriter role */}
            <div
              data-in
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                fontWeight: 500,
                color: "var(--accent)",
                marginBottom: "20px",
                minHeight: "32px",
                "--d": "0.36s",
              } as React.CSSProperties}
            >
              <TypeWriter words={["ASP.NET Core Developer", ".NET Backend Engineer", "C# & SQL Server Specialist"]} />
            </div>

            {/* One-sentence intro */}
            <p
              data-in
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "17px",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "460px",
                margin: "0 0 32px",
                "--d": "0.44s",
              } as React.CSSProperties}
            >
              Final year CS student building production-grade .NET APIs with clean architecture and SOLID principles.
            </p>

            {/* CTA buttons */}
            <div
              data-in
              style={{
                display: "flex", gap: "12px", flexWrap: "wrap",
                "--d": "0.52s",
              } as React.CSSProperties}
            >
              <Link to="/projects" style={{ textDecoration: "none" }}>
                <button className="btn-primary">
                  Explore projects →
                </button>
              </Link>
              <a href="https://github.com/MuhammadSufyanKhn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-secondary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  GitHub
                </button>
              </a>
            </div>
          </div>

          {/* Right: JSON API card */}
          <div
            data-in
            style={{
              minWidth: 0,
              "--d": "0.56s",
            } as React.CSSProperties}
          >
            <JsonApiCard delay={0.56} />
          </div>
        </div>
      </section>

      {/* ── WHO AM I + WHAT I DO: Asymmetric Editorial Split ── */}
      <section id="about" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 64px" }} className="hero-section">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "start" }} className="who-what-grid">

          {/* Who am I: Editorial Profile */}
          <div
            ref={whoVis.ref}
            style={{
              borderLeft: "3px solid var(--accent)",
              paddingLeft: "26px",
              opacity: whoVis.visible ? 1 : 0,
              transform: whoVis.visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Introduction
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              Who am I
            </h2>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17.5px", color: "var(--ink)", lineHeight: 1.7, marginBottom: "14px", marginTop: 0 }}>
              Computer Science student at Sir Syed University of Engineering & Technology. I specialise in backend engineering including programming in C#, ASP.NET Core, Entity Framework Core and relational database systems.
            </p>
            <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "16px", color: "var(--muted)", lineHeight: 1.7, margin: "0 0 24px" }}>
              With internship experience at 10Pearls and CodeLabs, I build secure, high-performance applications with clean architecture.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "12px" }}>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ height: "40px", fontSize: "13px", padding: "0 18px" }}>Read full bio →</button>
              </Link>
              <Link to="/experience" style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ height: "40px", fontSize: "13px", padding: "0 18px" }}>Experience</button>
              </Link>
            </div>
          </div>

          {/* What I do: Capability Showcase */}
          <div
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "6px",
              opacity: whoVis.visible ? 1 : 0,
              transform: whoVis.visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.12s",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Core capabilities
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(24px, 3.5vw, 30px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              What I do
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {whatIDoItems.map((item, i) => (
                <WhatItem key={item.title} item={item} isLast={i === whatIDoItems.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS: Integrated Architectural Metric Ribbon ── */}
      <section id="skills" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 64px" }} className="hero-section">
        <div
          style={{
            background: "color-mix(in srgb, var(--card) 60%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
            overflow: "hidden",
            position: "relative",
          }}
          className="editorial-stats-ribbon"
        >
          {stats.map((stat, i) => {
            const sv = useVisible(i * 90);
            return (
              <div
                ref={sv.ref}
                key={stat.label}
                style={{
                  padding: "26px 20px",
                  textAlign: "center",
                  position: "relative",
                  borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none",
                  opacity: sv.visible ? 1 : 0,
                  transform: sv.visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
                className="stat-ribbon-col"
              >
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4vw, 38px)", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                  <Counter target={parseFloat(stat.value)} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "12.5px", color: "var(--muted)", fontWeight: 500, marginTop: "8px", letterSpacing: "0.02em" }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED PROJECTS (Pic 1 Coverflow Carousel) ── */}
      <section id="projects" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 80px" }} className="hero-section">
        <div ref={featHero.ref} style={{
          marginBottom: "32px",
          textAlign: "center",
          opacity: featHero.visible ? 1 : 0,
          transform: featHero.visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Selected work</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Featured projects</h2>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "16px", color: "var(--muted)", margin: 0 }}>My core expertise — production-grade .NET systems.</p>
        </div>

        {/* Coverflow Carousel */}
        <CoverflowCarousel featured={featured} onSelect={p => setSelectedProject(p)} />

        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">View all projects →</button>
          </Link>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <style>{`
        @keyframes caretBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function WhatItem({ item, isLast }: { item: typeof whatIDoItems[0]; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: "14px", padding: "14px 0",
        borderBottom: isLast ? "none" : "1px solid var(--line)",
        transition: "opacity 0.2s ease",
        cursor: "default",
      }}
    >
      <div style={{
        width: "36px", height: "36px", borderRadius: "10px",
        background: hovered ? "var(--tint)" : "var(--bg)",
        border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", flexShrink: 0,
        transition: "background 0.2s ease",
      }}>{item.icon}</div>
      <div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)", margin: "0 0 3px", letterSpacing: "-0.01em" }}>{item.title}</h3>
        <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
      </div>
    </div>
  );
}
