import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      background: "var(--card)",
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
              <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "var(--accent)", color: "var(--on-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "10px", fontWeight: 700 }}>MSK</div>
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700, fontSize: "15px",
                color: "var(--ink)", letterSpacing: "-0.02em",
              }}>
                Muhammad Sufyan Khan
              </span>
            </Link>

            <p style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "13px",
              color: "var(--muted)",
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
                      border: "1px solid var(--line)",
                      background: "var(--tint)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--tint)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--tint)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                    }}
                  >
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Pages */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              Pages
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
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Projects */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              Projects
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "All Projects", path: "/projects" },
                { label: ".NET Projects", path: "/dotnet-projects" },
                { label: "Python Projects", path: "/python-projects" },
                { label: "Others", path: "/others-projects" },
                { label: "Semester Projects", path: "/semester-projects" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div style={{ textAlign: "left" }}>
            <h4 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              margin: "0 0 10px",
            }}>
              Contact
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
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: "1.4",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Horizontal divider */}
        <div style={{
          height: "1px",
          background: "var(--line)",
          margin: "18px 0 14px",
        }} />

        {/* Bottom copyright line */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }} className="footer-copyright-row">
          <p style={{ fontFamily: "'Newsreader', serif", fontSize: "13px", color: "var(--muted)", margin: 0, textAlign: "left" }}>
            © {year} Muhammad Sufyan Khan • All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}