import { useEffect, useState } from "react";
import { globalLenis } from "../App";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    if (globalLenis) {
      globalLenis.scrollTo(0, { duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={scrollTop}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "1px solid var(--line)",
          background: "var(--card)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 900,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, color 0.2s ease",
          pointerEvents: visible ? "all" : "none",
          fontSize: "15px",
          color: "var(--ink)",
        }}
        className="back-to-top-btn"
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.05)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
          (e.currentTarget as HTMLElement).style.color = "var(--ink)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
        }}
        title="Back to top"
        aria-label="Back to top"
      >
        ↑
      </button>
      <style>{`
        @media (max-width: 600px) {
          .back-to-top-btn {
            bottom: 16px !important;
            right: 14px !important;
            width: 36px !important;
            height: 36px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}
