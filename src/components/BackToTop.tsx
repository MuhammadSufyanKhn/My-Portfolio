import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        background: "rgba(15, 15, 15, 0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: visible ? "all" : "none",
        fontSize: "16px",
        color: "#38bdf8",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(56, 189, 248, 0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(59, 130, 246, 0.3)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4)";
      }}
      title="Back to top"
    >
      ↑
    </button>
  );
}
