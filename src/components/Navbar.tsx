import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "About", path: "/about", icon: "👨‍💻" },
  { label: "Education", path: "/education", icon: "🎓" },
  { label: "Experience", path: "/experience", icon: "💼" },
  {
    label: "Projects", path: "/projects", icon: "🚀", children: [
      { label: "All Projects", path: "/projects", icon: "📂" },
      { label: ".NET Projects", path: "/dotnet-projects", icon: "⚡" },
      { label: "Python Projects", path: "/python-projects", icon: "🐍" },
      { label: "Semester Projects", path: "/semester-projects", icon: "🏫" },
    ]
  },
  { label: "Skills", path: "/skills", icon: "⚙️" },
  { label: "Certifications", path: "/certifications", icon: "🏅" },
  { label: "Internship", path: "/internship", icon: "🎯" },
  { label: "Contact", path: "/contact", icon: "✉️" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path) || (path === "/projects" && ["/projects", "/dotnet-projects", "/python-projects", "/semester-projects"].includes(location.pathname));
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          width: scrolled ? "calc(100% - 24px)" : "calc(100% - 48px)",
          maxWidth: "1200px",
        }}
        ref={dropdownRef}
      >
        <div style={{
          background: scrolled ? "rgba(10, 10, 15, 0.92)" : "rgba(12, 12, 18, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "18px",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: scrolled
            ? "0 12px 40px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.12)"
            : "0 4px 24px rgba(0, 0, 0, 0.35)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {/* Brand Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontWeight: 800, color: "#ffffff", fontSize: "13px",
                letterSpacing: "-0.3px",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
              }}>
                MSK
              </div>
              <span style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontWeight: 700, fontSize: "14px",
                color: "#ffffff", letterSpacing: "-0.3px",
              }} className="nav-brand-text">
                Muhammad Sufyan Khan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="nav-desktop">
            {navItems.filter(item => item.path !== "/download").map((item) => (
              <div key={item.path} style={{ position: "relative" }}>
                {"children" in item ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: isActive(item.path) ? 600 : 500,
                      color: isActive(item.path) ? "#38bdf8" : "#94a3b8",
                      background: isActive(item.path) ? "rgba(56, 189, 248, 0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: "5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                    <span style={{ fontSize: "9px", opacity: 0.6, transform: activeDropdown === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", display: "inline-block" }}>▼</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: isActive(item.path) ? 600 : 500,
                      color: isActive(item.path) ? "#38bdf8" : "#94a3b8",
                      background: isActive(item.path) ? "rgba(56, 189, 248, 0.1)" : "transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
                        (e.currentTarget as HTMLElement).style.color = "#f8fafc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu for Desktop */}
                {"children" in item && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(10, 10, 15, 0.96)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "14px",
                    padding: "8px",
                    minWidth: "190px",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
                    opacity: activeDropdown === item.label ? 1 : 0,
                    pointerEvents: activeDropdown === item.label ? "all" : "none",
                    translate: `calc(-50%) ${activeDropdown === item.label ? "0px" : "-8px"}`,
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 10,
                  }}>
                    {item.children?.map((child) => (
                      <Link key={child.path} to={child.path} style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: location.pathname === child.path ? 600 : 500,
                        color: location.pathname === child.path ? "#38bdf8" : "#94a3b8",
                        background: location.pathname === child.path ? "rgba(56, 189, 248, 0.1)" : "transparent",
                        transition: "all 0.15s ease",
                        marginBottom: "2px",
                      }}>
                        <span>{child.icon}</span>
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Action + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/internship" className="nav-desktop" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "8px 18px",
                borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "#ffffff", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s ease",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                display: "flex", alignItems: "center", gap: "6px",
                whiteSpace: "nowrap",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
                Hire Me
              </button>
            </Link>

            {/* ANIMATED HAMBURGER BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile-btn"
              aria-label="Toggle navigation menu"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: menuOpen ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.05)",
                cursor: "pointer",
                width: "40px", height: "40px",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "5px",
                borderRadius: "10px", padding: "8px",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{
                width: "20px", height: "2px",
                background: menuOpen ? "#38bdf8" : "#f8fafc",
                borderRadius: "2px", display: "block",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }} />
              <span style={{
                width: "20px", height: "2px",
                background: menuOpen ? "#38bdf8" : "#f8fafc",
                borderRadius: "2px", display: "block",
                transition: "all 0.2s ease",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }} />
              <span style={{
                width: "20px", height: "2px",
                background: menuOpen ? "#38bdf8" : "#f8fafc",
                borderRadius: "2px", display: "block",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }} />
            </button>
          </div>
        </div>

        {/* ANIMATED RESPONSIVE MOBILE DRAWER */}
        <div
          style={{
            marginTop: "8px",
            background: "rgba(10, 10, 16, 0.97)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "18px",
            overflow: "hidden",
            maxHeight: menuOpen ? "82vh" : "0px",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.98)",
            transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: menuOpen ? "0 24px 70px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.1)" : "none",
            pointerEvents: menuOpen ? "all" : "none",
          }}
          className="nav-mobile-drawer"
        >
          <div style={{ padding: "16px 14px", overflowY: "auto", maxHeight: "calc(82vh - 20px)" }}>
            <div style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
              color: "#38bdf8", textTransform: "uppercase", marginBottom: "12px", paddingLeft: "10px"
            }}>
              Navigation Menu
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navItems.map((item, idx) => {
                const itemActive = isActive(item.path);
                const hasChildren = "children" in item && item.children;

                return (
                  <div key={item.path} style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04}s`,
                  }}>
                    <Link
                      to={item.path}
                      style={{
                        display: "flex", alignItems: "center", justifyItems: "space-between",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        textDecoration: "none",
                        fontSize: "15px",
                        fontWeight: itemActive ? 700 : 500,
                        color: itemActive ? "#38bdf8" : "#f1f5f9",
                        background: itemActive ? "rgba(56, 189, 248, 0.12)" : "rgba(255, 255, 255, 0.02)",
                        border: itemActive ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid transparent",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                        <span style={{ fontSize: "18px" }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {itemActive && (
                        <span style={{
                          padding: "2px 8px", borderRadius: "100px",
                          background: "#38bdf8", color: "#000000",
                          fontSize: "10px", fontWeight: 800,
                        }}>
                          ACTIVE
                        </span>
                      )}
                    </Link>

                    {/* Mobile Nested Children (for Projects) */}
                    {hasChildren && (
                      <div style={{
                        marginLeft: "24px", marginTop: "4px", marginBottom: "4px",
                        paddingLeft: "12px", borderLeft: "1.5px solid rgba(56, 189, 248, 0.2)",
                        display: "flex", flexDirection: "column", gap: "3px",
                      }}>
                        {item.children?.map((child) => {
                          const childActive = location.pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              style={{
                                display: "flex", alignItems: "center", gap: "10px",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontSize: "13px",
                                fontWeight: childActive ? 700 : 500,
                                color: childActive ? "#38bdf8" : "#a1a1aa",
                                background: childActive ? "rgba(56, 189, 248, 0.08)" : "transparent",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <span style={{ fontSize: "14px" }}>{child.icon}</span>
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Hire Me CTA Button */}
              <div style={{
                marginTop: "16px", paddingTop: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${navItems.length * 0.04}s`,
              }}>
                <Link to="/internship" style={{ textDecoration: "none" }}>
                  <button style={{
                    width: "100%", padding: "14px",
                    borderRadius: "14px", border: "none",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "#ffffff", fontSize: "15px", fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
                    Hire Me (Open to Internships)
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 960px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-drawer { display: none !important; }
        }
        @media (max-width: 959px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-mobile-drawer { display: block !important; }
        }
        @media (max-width: 480px) {
          .nav-brand-text { display: none !important; }
        }
      `}</style>
    </>
  );
}
