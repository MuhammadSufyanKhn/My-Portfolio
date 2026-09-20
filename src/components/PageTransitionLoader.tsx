import { useEffect, useState, useRef } from "react";

interface PageTransitionLoaderProps {
  title: string;
  isActive: boolean;
  onComplete: () => void;
}

const CIRCUMFERENCE = 2 * Math.PI * 52; // radius = 52

export default function PageTransitionLoader({
  title,
  isActive,
  onComplete,
}: PageTransitionLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "exit">("idle");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      setProgress(0);
      return;
    }

    setPhase("loading");
    setProgress(0);

    // Lock scroll during transition
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf: number;
    const start = performance.now();
    const DURATION = 650; // smooth 650ms progress animation

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const p = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(p * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Complete -> trigger curtain sweep up
        setPhase("exit");
        const exitTimer = setTimeout(() => {
          document.body.style.overflow = prevOverflow;
          onCompleteRef.current();
        }, 750); // matches the 0.75s transition duration

        return () => clearTimeout(exitTimer);
      }
    }

    raf = requestAnimationFrame(tick);

    // Failsafe timer (3s)
    const failsafe = setTimeout(() => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      onCompleteRef.current();
    }, 3000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      document.body.style.overflow = prevOverflow;
    };
  }, [isActive]);

  if (phase === "idle") return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);
  const isExiting = phase === "exit";

  return (
    <div
      aria-live="assertive"
      aria-label={`Loading ${title}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: isExiting
          ? "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)"
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

      <div
        style={{
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "600px",
          transform: isExiting ? "scale(0.96)" : "scale(1)",
          opacity: isExiting ? 0.7 : 1,
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
        }}
      >
        {/* 132px circular badge with SVG ring */}
        <div
          style={{
            width: "132px",
            height: "132px",
            margin: "0 auto 28px",
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
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
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

        {/* Welcome message */}
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(24px, 4.5vw, 36px)",
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            margin: "0 0 12px 0",
            lineHeight: 1.2,
          }}
        >
          Welcome to{" "}
          <span
            style={{
              color: "var(--accent)",
              display: "inline-block",
              position: "relative",
            }}
          >
            {title}
          </span>
        </h2>

        {/* Percentage counter */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "20px",
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
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Loading view...
        </div>
      </div>
    </div>
  );
}
