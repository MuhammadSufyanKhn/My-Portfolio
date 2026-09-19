import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const CIRCUMFERENCE = 2 * Math.PI * 52; // radius = 52

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete" | "exit">("loading");

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Progress animation — ease-out over ~1.7s
  useEffect(() => {
    let p = 0;
    const start = performance.now();
    const DURATION = 1700;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      p = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(p * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // At 100%: wait 180ms then exit
        setTimeout(() => setPhase("complete"), 0);
        setTimeout(() => {
          setPhase("exit");
          // After exit animation, unlock and notify
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete();
          }, 950);
        }, 180);
      }
    }

    let raf = requestAnimationFrame(tick);

    // Failsafe: close after 5s
    const failsafe = setTimeout(() => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      onComplete();
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);
  const isExiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: isExiting
          ? "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
        pointerEvents: isExiting ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* 8px terracotta bar at bottom (sweeps up as loader exits) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: "var(--accent)",
        }}
      />

      <div style={{ textAlign: "center" }}>
        {/* 132px circular badge with SVG ring */}
        <div
          style={{
            width: "132px",
            height: "132px",
            margin: "0 auto 24px",
            position: "relative",
          }}
        >
          <svg
            width="132"
            height="132"
            viewBox="0 0 132 132"
            fill="none"
            style={{ transform: "rotate(-90deg)" }}
            aria-hidden="true"
          >
            {/* Track ring */}
            <circle
              cx="66"
              cy="66"
              r="52"
              stroke="var(--line)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress arc */}
            <circle
              cx="66"
              cy="66"
              r="52"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.06s linear" }}
            />
          </svg>

          {/* Initials in center */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              MSK
            </span>
          </div>
        </div>

        {/* Percentage counter */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "22px",
            fontWeight: 500,
            color: "var(--ink)",
            marginBottom: "8px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {progress}%
        </div>

        {/* Loading label */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "13px",
            color: "var(--muted)",
            letterSpacing: "0.02em",
          }}
        >
          Loading portfolio
        </div>
      </div>
    </div>
  );
}
