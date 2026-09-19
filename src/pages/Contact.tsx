import { useState } from "react";
import { useVisible } from "../utils/useVisible";

const contactLinks = [
  { label: "Email", value: "khansufyanasim@gmail.com", icon: "✉️", href: "mailto:khansufyanasim@gmail.com", desc: "Direct inbox — replies within 24 hours" },
  { label: "GitHub", value: "github.com/MuhammadSufyanKhn", icon: "🐙", href: "https://github.com/MuhammadSufyanKhn", desc: "Open-source repos, architecture, and projects" },
  { label: "LinkedIn", value: "Muhammad Sufyan Khan", icon: "🔗", href: "https://www.linkedin.com/in/muhammad-sufyan-khan-72574b3a3/", desc: "Professional network and connections" },
  { label: "Location", value: "Karachi, Pakistan", icon: "📍", href: null as string | null, desc: "Available for Remote, On-site & Hybrid roles" },
];

export default function Contact() {
  const hero = useVisible();
  const cta = useVisible(120);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Get in touch
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Contact & Connect
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            Looking for a dedicated .NET Backend Developer? Reach out via email, review my GitHub repositories, or connect on LinkedIn.
          </p>
        </div>

        {/* Contact Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "32px", alignItems: "start" }} className="contact-grid">
          {/* Left: contact channel links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {contactLinks.map((link, i) => (
              <ContactLinkCardItem key={link.label} link={link} index={i} />
            ))}
          </div>

          {/* Right: Email card */}
          <ContactEmailCard ctaRef={cta.ref} visible={cta.visible} />
        </div>
      </div>
    </div>
  );
}

function ContactLinkCardItem({ link, index }: { link: typeof contactLinks[0]; index: number }) {
  const { ref, visible } = useVisible(index * 70);
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="contact-link-card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "18px 20px",
        background: "var(--card)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
        borderRadius: "16px",
        cursor: link.href ? "pointer" : "default",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-3px)" : "none") : "translateY(20px)",
        boxShadow: hovered ? "0 12px 32px -8px rgba(194, 65, 12, 0.12)" : "0 2px 8px rgba(0, 0, 0, 0.03)",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "var(--tint)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          flexShrink: 0,
        }}
      >
        {link.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "11px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {link.label}
        </div>
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "14px", color: "var(--ink)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {link.value}
        </div>
        <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)" }}>
          {link.desc}
        </div>
      </div>
      {link.href && (
        <span
          style={{
            color: hovered ? "var(--accent)" : "var(--muted)",
            fontSize: "14px",
            transition: "transform 0.2s ease, color 0.2s ease",
            transform: hovered ? "translateX(4px)" : "none",
          }}
        >
          →
        </span>
      )}
    </div>
  );

  return link.href ? (
    <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

function ContactEmailCard({ ctaRef, visible }: { ctaRef: any; visible: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("khansufyanasim@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      ref={ctaRef}
      style={{
        background: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: "20px",
        padding: "36px 32px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s ease",
      }}
      className="contact-email-card"
    >
      <div style={{ display: "inline-flex", padding: "4px 12px", borderRadius: "100px", background: "var(--tint)", border: "1px solid var(--line)", color: "var(--accent)", fontSize: "11px", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "16px" }}>
        Quick messaging
      </div>
      <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.01em" }}>
        Send an email directly
      </h2>
      <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", color: "var(--muted)", lineHeight: 1.65, margin: "0 0 24px" }}>
        Feel free to write to me regarding backend roles, software opportunities, or technical inquiries.
      </p>

      {/* Email box */}
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "var(--ink)", wordBreak: "break-all" }}>
          khansufyanasim@gmail.com
        </span>
        <button
          onClick={copyEmail}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            background: "var(--tint)",
            border: "1px solid var(--line)",
            color: "var(--accent)",
            padding: "4px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {copied ? "Copied! ✓" : "Copy"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <a href="mailto:khansufyanasim@gmail.com" style={{ textDecoration: "none", flex: 1 }}>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Open email client ✉️
          </button>
        </a>
      </div>
    </div>
  );
}
