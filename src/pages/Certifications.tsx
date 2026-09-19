import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { certifications } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Certifications() {
  const hero = useVisible();
  const [preview, setPreview] = useState<typeof certifications[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Verified credentials
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Certifications & Training
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
            Industry-recognized certifications validating core competencies in backend software development.
          </p>
        </div>

        {/* Cert Cards Grid */}
        <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "20px" }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onPreview={() => setPreview(cert)} />
          ))}
        </div>

        {preview && <CertModal cert={preview} onClose={() => setPreview(null)} />}
      </div>
    </div>
  );
}

function CertCard({ cert, index, onPreview }: { cert: typeof certifications[0]; index: number; onPreview: () => void }) {
  const { ref, visible } = useVisible(index * 90);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="cert-card flowing-card"
      onClick={onPreview}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <div style={{ height: "170px", background: "var(--tint)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "transform 0.3s ease", transform: hovered ? "scale(1.04)" : "none" }}
        />
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
          <span style={{ padding: "2px 8px", borderRadius: "100px", background: "var(--tint)", color: "var(--tint-ink)", fontSize: "11px", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {cert.organization}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--muted)" }}>
            {cert.issueDate}
          </span>
        </div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.3 }}>
          {cert.title}
        </h3>
        <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
          {cert.description}
        </p>
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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        background: "rgba(26, 22, 19, 0.65)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)",
          borderRadius: "20px",
          maxWidth: "600px",
          width: "100%",
          border: "1px solid var(--line)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height: "min(55vh, 420px)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid var(--line)", padding: "16px" }}>
          <img
            src={cert.image}
            alt={`${cert.title} certificate full preview`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "var(--card)",
              color: "var(--muted)",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ padding: "3px 10px", borderRadius: "100px", background: "var(--tint)", color: "var(--tint-ink)", fontSize: "11px", fontWeight: 600, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {cert.organization}
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--muted)" }}>
              Issued {cert.issueDate}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
            {cert.title}
          </h2>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 20px" }}>
            {cert.description}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={onClose} className="btn-secondary" style={{ height: "38px", fontSize: "13px", padding: "0 20px" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
