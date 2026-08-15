import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      background: "rgba(10, 10, 15, 0.96)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      padding: "28px 24px 18px",
      position: "relative",
      zIndex: 1,
    }} className="footer-root">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* COMPACT MAIN GRID (Brand + 3 Link Columns) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "32px",
          alignItems: "start",
        }} className="footer-main-grid">

          {/* Brand & Social Column */}
          <div style={{ paddingRight: "16px" }}>
            <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Logo size="sm" />
              <span style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontWeight: 700, fontSize: "15px",
                color: "#ffffff", letterSpacing: "-0.2px",
              }}>
                Muhammad Sufyan Khan
              </span>
            </Link>

            <p style={{
              fontSize: "12px",
              color: "#94a3b8",
              lineHeight: 1.5,
              margin: "0 0 12px",
              maxWidth: "290px",
            }}>
              ASP.NET Core Backend Developer
              <br />
              BSCS Student at Sir Syed University
            </p>

            {/* Social Icons Row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="footer-social-icons">
              {[
                { icon: "🐙", href: "https://github.com/MuhammadSufyanKhn", label: "GitHub" },
                { icon: "🔗", href: "https://www.linkedin.com/in/muhammad-sufyan-khan-72574b3a3/", label: "LinkedIn" },
                { icon: "✉️", href: "mailto:khansufyanasim@gmail.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  title={social.label}
                >
                  <div
                    style={{
                      width: "32px", height: "32px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(56, 189, 248, 0.15)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
                    }}
                  >
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: PAGES */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              PAGES
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Education", path: "/education" },
                { label: "Experience", path: "/experience" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#cbd5e1",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#cbd5e1"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: PROJECTS */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              PROJECTS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "All Projects", path: "/projects" },
                { label: ".NET Projects", path: "/dotnet-projects" },
                { label: "Python Projects", path: "/python-projects" },
                { label: "Semester Projects", path: "/semester-projects" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#cbd5e1",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#cbd5e1"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: CONTACT */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              CONTACT
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "Skills Overview", path: "/skills" },
                { label: "Certifications", path: "/certifications" },
                { label: "Hire Me", path: "/internship" },
                { label: "Get In Touch", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#cbd5e1",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#cbd5e1"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* SINGLE SUBTLE HORIZONTAL DIVIDER BEFORE COPYRIGHT */}
        <div style={{
          height: "1px",
          background: "rgba(255, 255, 255, 0.08)",
          margin: "18px 0 14px",
        }} />

        {/* BOTTOM COPYRIGHT LINE */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }} className="footer-copyright-row">
          <p style={{ fontSize: "12px", color: "#71717a", margin: 0, textAlign: "left" }}>
            © {year} Muhammad Sufyan Khan • All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}