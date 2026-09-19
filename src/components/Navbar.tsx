import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Education", path: "/education" },
  { label: "Experience", path: "/experience" },
  {
    label: "Projects", path: "/projects", children: [
      { label: "All Projects", path: "/projects" },
      { label: ".NET Projects", path: "/dotnet-projects" },
      { label: "Python Projects", path: "/python-projects" },
      { label: "Others", path: "/others-projects" },
      { label: "Semester Projects", path: "/semester-projects" },
    ]
  },
  { label: "Skills", path: "/skills" },
  { label: "Certifications", path: "/certifications" },
  { label: "Internship", path: "/internship" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark") setDark(true);
    else if (current === "light") setDark(false);
    else setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (_) {}
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch color theme"
      title="Switch color theme"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid var(--line)",
        background: "var(--card)",
        color: "var(--muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "border-color 0.2s ease, color 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
      }}
    >
      {/* Half-filled circle icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" fill="currentColor" />
      </svg>
    </button>
  );
}

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docH > 0 ? window.scrollY / docH : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isNavActive = (item: typeof navItems[0]) => {
    if (item.children) {
      return item.children.some(c => location.pathname === c.path);
    }
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  const isChildActive = (childPath: string) => {
    return location.pathname === childPath;
  };

  return (
    <>
      <nav
        className="nav-root-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "64px",
          background: "color-mix(in srgb, var(--bg) 92%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Scroll progress line — 2px terracotta */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: "var(--accent)",
            width: `${scrollProgress * 100}%`,
            transition: "width 0.1s linear",
            zIndex: 2,
          }}
        />

        {/* Nav inner */}
        <div
          className="nav-inner-bar"
          style={{
            flex: 1,
            maxWidth: "980px",
            margin: "0 auto",
            width: "100%",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* LEFT: MSK Logo + Name */}
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "var(--on-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              MSK
            </div>
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                display: "none",
              }}
              className="nav-name"
            >
              Sufyan Khan
            </span>
          </Link>

          {/* CENTER: Desktop nav links */}
          <div
            ref={dropdownRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
              justifyContent: "center",
            }}
            className="desktop-nav"
          >
            {navItems.map(item => (
              item.children ? (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: isNavActive(item) ? "var(--tint)" : "transparent",
                      color: isNavActive(item) ? "var(--accent)" : "var(--muted)",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "background 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      if (!isNavActive(item)) (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                    }}
                    onMouseLeave={e => {
                      if (!isNavActive(item)) (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
                    }}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                      style={{ transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease" }}>
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === item.label && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--card)",
                      border: "1px solid var(--line)",
                      borderRadius: "12px",
                      padding: "6px",
                      minWidth: "185px",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
                      zIndex: 100,
                    }}>
                      {item.children.map(child => {
                        const childActive = isChildActive(child.path);
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "9px 12px",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontFamily: "'Bricolage Grotesque', sans-serif",
                              fontSize: "13px",
                              fontWeight: childActive ? 600 : 500,
                              color: childActive ? "var(--accent)" : "var(--muted)",
                              background: childActive ? "var(--tint)" : "transparent",
                              transition: "background 0.15s ease, color 0.15s ease",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = "var(--tint)";
                              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = childActive ? "var(--tint)" : "transparent";
                              (e.currentTarget as HTMLAnchorElement).style.color = childActive ? "var(--accent)" : "var(--muted)";
                            }}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isNavActive(item) ? "var(--accent)" : "var(--muted)",
                    background: isNavActive(item) ? "var(--tint)" : "transparent",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isNavActive(item)) (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                  }}
                  onMouseLeave={e => {
                    if (!isNavActive(item)) (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                  }}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT: Theme toggle + Contact pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <ThemeToggle />
            <Link
              to="/contact"
              style={{ textDecoration: "none" }}
              className="contact-pill-link"
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "36px",
                  padding: "0 16px",
                  borderRadius: "100px",
                  background: "var(--accent)",
                  color: "var(--on-accent)",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease, transform 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLSpanElement).style.background = "var(--accent-strong)";
                  (e.currentTarget as HTMLSpanElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLSpanElement).style.background = "var(--accent)";
                  (e.currentTarget as HTMLSpanElement).style.transform = "none";
                }}
              >
                Contact
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="hamburger-btn"
              style={{
                display: "none",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "transparent",
                color: "var(--ink)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <line x1="3" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: "64px 0 0 0",
            background: "var(--bg)",
            zIndex: 999,
            overflowY: "auto",
            padding: "16px 24px 32px",
            borderTop: "1px solid var(--line)",
          }}
        >
          {navItems.map(item => (
            <div key={item.label}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 12px",
                  borderBottom: "1px solid var(--line)",
                  textDecoration: "none",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: isNavActive(item) ? "var(--accent)" : "var(--ink)",
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div style={{ paddingLeft: "20px" }}>
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "11px 12px",
                        borderBottom: "1px solid var(--line)",
                        textDecoration: "none",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: isChildActive(child.path) ? "var(--accent)" : "var(--muted)",
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex",
              marginTop: "24px",
              height: "46px",
              padding: "0 24px",
              borderRadius: "10px",
              background: "var(--accent)",
              color: "var(--on-accent)",
              textDecoration: "none",
              alignItems: "center",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Contact me
          </Link>
        </div>
      )}

      {/* Responsive CSS for navbar */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .contact-pill-link { display: none; }
        }
        @media (min-width: 861px) {
          .nav-name { display: block !important; }
        }
        @media (min-width: 1100px) {
          .nav-name { display: block !important; }
        }
      `}</style>
    </>
  );
}
