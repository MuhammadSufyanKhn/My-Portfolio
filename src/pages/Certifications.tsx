import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { certifications } from "../data/portfolio";
import { useVisible } from "../utils/useVisible";

export default function Certifications() {
  const hero = useVisible();
  const [preview, setPreview] = useState<typeof certifications[0] | null>(null);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "76px", paddingBottom: "80px", position: "relative", zIndex: 1 }} className="page-container">
      <div className="page-inner" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div ref={hero.ref} style={{ marginBottom: "28px", opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Verified credentials
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Certifications & Training
          </h1>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "17px", color: "var(--muted)", maxWidth: "560px", lineHeight: 1.7, margin: 0 }}>
            Official industry-recognized credentials validating core engineering competencies across .NET, C#, AI foundations, and modern web architectures.
          </p>
        </div>

        {/* Credentials Registry Strip */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "32px",
            padding: "16px 22px",
            background: "var(--tint)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
          }}
          className="cert-summary-strip"
        >
          {[
            { label: "Total credentials", value: certifications.length },
            { label: "Issuing bodies", value: "Microsoft, Google, Cisco" },
            { label: "Status", value: "100% Verified" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>
                {item.value}
              </span>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "14px", color: "var(--muted)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Credential Directory (De-boxed Ledger) */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px -8px rgba(0, 0, 0, 0.06)",
          }}
          className="cert-directory-container"
        >
          {certifications.map((cert, i) => (
            <CredentialLedgerRow
              key={cert.id}
              cert={cert}
              index={i}
              onPreview={() => setPreview(cert)}
            />
          ))}
        </div>

        {preview && <CertModal cert={preview} onClose={() => setPreview(null)} />}
      </div>
    </div>
  );
}

function CredentialLedgerRow({
  cert,
  index,
  onPreview,
}: {
  cert: typeof certifications[0];
  index: number;
  onPreview: () => void;
}) {
  const { ref, visible } = useVisible(index * 70);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={onPreview}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "20px 24px",
        borderBottom: index < certifications.length - 1 ? "1px solid var(--line)" : "none",
        cursor: "pointer",
        background: hovered ? "var(--tint)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="credential-ledger-row"
    >
      {/* Authentic Certificate Preview Frame */}
      <div
        style={{
          width: "140px",
          height: "92px",
          borderRadius: "10px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
          background: "var(--bg)",
          flexShrink: 0,
          boxShadow: hovered ? "0 6px 16px rgba(0,0,0,0.12)" : "0 2px 6px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        className="cert-frame-thumb"
      >
        <img
          src={cert.image}
          alt={`${cert.title} preview`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            transition: "transform 0.35s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.02)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Credential Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "100px",
              background: "var(--card)",
              border: "1px solid var(--line)",
              color: "var(--accent)",
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {cert.organization}
          </span>
          {cert.credentialId && cert.credentialId !== "View certificate" && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "var(--muted)",
                background: "var(--tint)",
                padding: "2px 8px",
                borderRadius: "6px",
              }}
            >
              ID: {cert.credentialId}
            </span>
          )}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              color: "var(--muted)",
            }}
          >
            Issued: {cert.issueDate}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "17px",
            fontWeight: 700,
            color: hovered ? "var(--accent)" : "var(--ink)",
            margin: "0 0 6px",
            letterSpacing: "-0.01em",
            transition: "color 0.2s ease",
          }}
        >
          {cert.title}
        </h3>

        <p
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: "14px",
            color: "var(--muted)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {cert.description}
        </p>
      </div>

      {/* Action Strip */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "12px" }} className="cert-row-action">
        <button
          className={hovered ? "btn-primary" : "btn-secondary"}
          style={{
            height: "36px",
            padding: "0 14px",
            fontSize: "12px",
            borderRadius: "8px",
            fontWeight: 600,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          View Credential →
        </button>
      </div>
    </div>
  );
}

function CertModal({ cert, onClose }: { cert: typeof certifications[0]; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
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
          maxWidth: "640px",
          width: "100%",
          border: "1px solid var(--line)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            height: "min(55vh, 420px)",
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderBottom: "1px solid var(--line)",
            padding: "16px",
          }}
        >
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
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "100px",
                background: "var(--tint)",
                color: "var(--tint-ink)",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
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
