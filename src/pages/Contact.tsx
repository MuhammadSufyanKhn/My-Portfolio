import { useState } from "react";
import { useVisible } from "../utils/useVisible";

const contactLinks = [
  { label: "Email", value: "khansufyanasim@gmail.com", icon: "✉️", href: "mailto:khansufyanasim@gmail.com", color: "#38bdf8", desc: "Direct contact: fast reply within 24 hours" },
  { label: "GitHub", value: "github.com/MuhammadSufyanKhn", icon: "🐙", href: "https://github.com/MuhammadSufyanKhn", color: "#6366f1", desc: "Explore open-source backend repositories" },
  { label: "LinkedIn", value: "Muhammad Sufyan Khan", icon: "🔗", href: "https://www.linkedin.com/in/muhammad-sufyan-khan-72574b3a3/", color: "#3b82f6", desc: "Professional network & profile" },
  { label: "Location", value: "Karachi, Pakistan", icon: "📍", href: null as string | null, color: "#60a5fa", desc: "Open to Remote, On-site & Hybrid" },
];

export default function Contact() {
  const hero = useVisible();
  const cta = useVisible(200);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "64px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#38bdf8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Direct Contact</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-2px", lineHeight: 1.1 }}>Get In Touch</h1>
          <p style={{ fontSize: "16px", color: "#cbd5e1", maxWidth: "680px", lineHeight: 1.8 }}>Looking for a passionate .NET Backend Developer? I am based in Karachi, Pakistan and available for Remote, On-site, or Hybrid roles.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", alignItems: "start" }} className="contact-grid">
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {contactLinks.map((link, i) => (
                <ContactLinkCardItem key={link.label} link={link} index={i} />
              ))}
            </div>
          </div>

          <ContactEmailCard ctaRef={cta.ref} visible={cta.visible} />
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .contact-email-card {
            padding: 24px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ContactLinkCardItem({ link, index }: { link: typeof contactLinks[0]; index: number }) {
  const { ref, visible } = useVisible(index * 80);
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="contact-link-card"
      style={{
        display: "flex", alignItems: "center", gap: "16px", padding: "18px 20px",
        background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? `${link.color}50` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "14px",
        cursor: link.href ? "pointer" : "default",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-4px) scale(1.015)" : "translateX(0)")
          : "translateX(-20px)",
        boxShadow: hovered ? `0 12px 28px -8px ${link.color}25` : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: `${link.color}15`, border: `1px solid ${link.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", flexShrink: 0,
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
      }}>{link.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500, marginBottom: "2px" }}>{link.label}</div>
        <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.value}</div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>{link.desc}</div>
      </div>
      {link.href && (
        <span style={{
          color: hovered ? link.color : "#64748b",
          fontSize: "14px",
          transition: "transform 0.3s ease, color 0.3s ease",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}>→</span>
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

function ContactEmailCard({ ctaRef, visible }: { ctaRef: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div ref={ctaRef} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 0.8s ease 0.2s" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "40px",
          background: hovered ? "rgba(20, 20, 20, 0.85)" : "rgba(15, 15, 15, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${hovered ? "rgba(59, 130, 246, 0.35)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "24px",
          textAlign: "center",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 40px -15px rgba(59, 130, 246, 0.18)" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="contact-email-card"
      >
        <div style={{
          fontSize: "44px", marginBottom: "16px",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
        }}>✉️</div>
        <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: "0 0 12px" }}>Send Me an Email</h2>
        <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.7, margin: "0 0 28px" }}>Click below to send an email directly. I look forward to discussing engineering opportunities with you!</p>
        <a
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          href="mailto:khansufyanasim@gmail.com?subject=Opportunity%20-%20.NET%20Developer&body=Hi%20Muhammad%20Sufyan%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity%20with%20you.%0A%0A"
          style={{
            textDecoration: "none", display: "block", width: "100%", padding: "14px 16px",
            borderRadius: "12px", border: "none",
            background: btnHovered ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#ffffff", fontSize: "clamp(12px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer",
            textAlign: "center" as const, boxSizing: "border-box" as const,
            wordBreak: "break-all" as const, overflowWrap: "break-word" as const,
            boxShadow: btnHovered ? "0 12px 32px rgba(59, 130, 246, 0.5)" : "0 8px 24px rgba(59, 130, 246, 0.35)",
            transform: btnHovered ? "scale(1.02)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          khansufyanasim@gmail.com →
        </a>
      </div>
    </div>
  );
}
