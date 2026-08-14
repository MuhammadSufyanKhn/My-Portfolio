import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { certifications } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Certifications() {
  const hero = useVisible();

  const [preview, setPreview] = useState<typeof certifications[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", position: "relative", zIndex: 1 }}>
      <div className="page-inner" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div ref={hero.ref} style={{ marginBottom: "48px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)", transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#f59e0b", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.6s ease 0.2s" }}>Credentials</div>
          <h1 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 12px", letterSpacing: "-2px", lineHeight: 1.1, opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.3s" }}>Certifications</h1>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "500px", lineHeight: 1.7, opacity: hero.visible ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
            Professional certifications demonstrating my commitment to continuous learning.
          </p>
        </div>

        <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))", gap: "20px" }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onPreview={() => setPreview(cert)} />
          ))}
        </div>

        {preview && <CertModal cert={preview} onClose={() => setPreview(null)} />}
      </div>

      <style>{`
        @keyframes certShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function CertCard({ cert, index, onPreview }: { cert: typeof certifications[0]; index: number; onPreview: () => void }) {
  const { ref, visible } = useVisible(index * 120);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="cert-card"
      onClick={onPreview}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${cert.color}50` : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(40px) scale(0.95)",
        boxShadow: hovered ? `0 20px 40px -12px ${cert.color}25` : "none",
      }}
    >
      {/* Shimmer top accent */}
      <div style={{
        height: "3px",
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
        backgroundSize: "200% 100%",
        animation: visible ? "certShimmer 2.5s ease-in-out infinite" : "none",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.3s ease",
      }} />

      <div style={{ height: "180px", background: "#0f172a", border: `1px solid ${cert.color}35`, margin: "16px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "transform 0.4s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}>
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <h3 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px", lineHeight: 1.3 }}>{cert.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "100px", background: `${cert.color}15`, color: cert.color, fontSize: "11px", fontWeight: 600 }}>{cert.organization}</span>
          <span style={{ fontSize: "11px", color: "#475569" }}>{cert.issueDate}</span>
        </div>
        <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{cert.description}</p>
      </div>
    </div>
  );
}

function CertModal({ cert, onClose }: { cert: typeof certifications[0]; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 99990, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }} onClick={onClose}>
      <div style={{ background: "#0f172a", borderRadius: "24px", maxWidth: "600px", width: "100%", border: "1px solid rgba(255,255,255,0.1)", transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)", transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ height: "min(55vh, 440px)", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${cert.color}20`, padding: "16px" }}>
          <img
            src={cert.image}
            alt={`${cert.title} certificate full preview`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }}
          />
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>×</button>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <h2 style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontSize: "20px", fontWeight: 800, color: "#f8fafc", margin: "0 0 8px" }}>{cert.title}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ padding: "4px 12px", borderRadius: "100px", background: `${cert.color}20`, color: cert.color, fontSize: "12px", fontWeight: 600 }}>{cert.organization}</span>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>Issued {cert.issueDate}</span>
          </div>
          <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "20px" }}>{cert.description}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href={cert.file} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "11px", borderRadius: "11px", border: "none", background: cert.color, color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: `0 4px 14px ${cert.color}40` }}>View Original PDF</button>
            </a>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: "11px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
