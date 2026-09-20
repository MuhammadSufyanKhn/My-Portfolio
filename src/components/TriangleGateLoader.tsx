import { useEffect, useState, useRef } from "react";

interface TriangleGateLoaderProps {
  title: string;
  isActive: boolean;
  onComplete: () => void;
  isInitial?: boolean;
}

const CIRCUMFERENCE = 2 * Math.PI * 52; // radius = 52

export default function TriangleGateLoader({
  title,
  isActive,
  onComplete,
  isInitial = false,
}: TriangleGateLoaderProps) {
  // Phase: 'idle' | 'closing' | 'closed' | 'opening'
  const [phase, setPhase] = useState<"idle" | "closing" | "closed" | "opening">(
    isInitial ? "closed" : "idle"
  );
  const [progress, setProgress] = useState(isInitial ? 0 : 0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Format title: "Welcome to Portfolio" vs "Welcome to [Tab] Section"
  const formattedHeading = (() => {
    const cleanTitle = title.trim();
    if (!cleanTitle || cleanTitle.toLowerCase() === "home" || cleanTitle.toLowerCase() === "portfolio") {
      return (
        <>
          Welcome to <span style={{ color: "var(--accent)" }}>Portfolio</span>
        </>
      );
    }
    // If it already includes "Section", don't duplicate
    const display = cleanTitle.toLowerCase().endsWith("section")
      ? cleanTitle
      : `${cleanTitle} Section`;

    return (
      <>
        Welcome to <span style={{ color: "var(--accent)" }}>{display}</span>
      </>
    );
  })();

  useEffect(() => {
    if (!isActive) {
      if (!isInitial) {
        setPhase("idle");
        setProgress(0);
      }
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf: number;
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (isInitial) {
      // For initial site load: start in closed position, animate progress to 100% over 1.4s, then open
      setPhase("closed");
      const start = performance.now();
      const DURATION = 1200;

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / DURATION, 1);
        const p = 1 - Math.pow(1 - t, 3);
        setProgress(Math.round(p * 100));

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          // Open gate
          timer1 = setTimeout(() => {
            setPhase("opening");
            timer2 = setTimeout(() => {
              document.body.style.overflow = prevOverflow;
              setPhase("idle");
              onCompleteRef.current();
            }, 550);
          }, 180);
        }
      };

      raf = requestAnimationFrame(tick);
    } else {
      // For tab navigation:
      // 1. Trigger closing animation (triangles meet at center)
      setPhase("closing");
      setProgress(0);

      timer1 = setTimeout(() => {
        setPhase("closed");

        // Animate progress 0 -> 100% over 480ms
        const start = performance.now();
        const DURATION = 480;

        const tickNav = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / DURATION, 1);
          const p = 1 - Math.pow(1 - t, 3);
          setProgress(Math.round(p * 100));

          if (t < 1) {
            raf = requestAnimationFrame(tickNav);
          } else {
            // Open gate
            timer2 = setTimeout(() => {
              setPhase("opening");
              timer3 = setTimeout(() => {
                document.body.style.overflow = prevOverflow;
                setPhase("idle");
                onCompleteRef.current();
              }, 550);
            }, 180);
          }
        };

        raf = requestAnimationFrame(tickNav);
      }, 420); // closing duration
    }

    const failsafe = setTimeout(() => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      setPhase("idle");
      onCompleteRef.current();
    }, 4500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(failsafe);
      document.body.style.overflow = prevOverflow;
    };
  }, [isActive, isInitial]);

  if (phase === "idle") return null;

  const isClosedOrClosing = phase === "closed";
  const isOpening = phase === "opening";
  const isClosing = phase === "closing";

  // Position calculations for each triangle
  // When 'closing' or 'closed', triangles are at (0, 0)
  // When 'opening', triangles retract outward
  const isRetracted = isOpening || (!isClosing && !isClosedOrClosing);

  const topTransform = isRetracted ? "translateY(-101%)" : "translateY(0)";
  const bottomTransform = isRetracted ? "translateY(101%)" : "translateY(0)";
  const leftTransform = isRetracted ? "translateX(-101%)" : "translateX(0)";
  const rightTransform = isRetracted ? "translateX(101%)" : "translateX(0)";

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div
      aria-live="assertive"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: isOpening ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* ── TRIANGLE 1: TOP ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
          WebkitClipPath: "polygon(0 0, 100% 0, 50% 50%)",
          background: "linear-gradient(180deg, #11100f 0%, #1a1816 100%)",
          transform: topTransform,
          transition: "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          zIndex: 2,
        }}
      >
        {/* Glowing border line along the bottom point */}
        <div
          style={{
            position: "absolute",
            bottom: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* ── TRIANGLE 2: BOTTOM ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
          WebkitClipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
          background: "linear-gradient(0deg, #11100f 0%, #1a1816 100%)",
          transform: bottomTransform,
          transition: "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* ── TRIANGLE 3: LEFT ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(0 0, 0 100%, 50% 50%)",
          WebkitClipPath: "polygon(0 0, 0 100%, 50% 50%)",
          background: "linear-gradient(90deg, #0e0d0c 0%, #181614 100%)",
          transform: leftTransform,
          transition: "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          zIndex: 2,
        }}
      />

      {/* ── TRIANGLE 4: RIGHT ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
          WebkitClipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
          background: "linear-gradient(270deg, #0e0d0c 0%, #181614 100%)",
          transform: rightTransform,
          transition: "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          zIndex: 2,
        }}
      />

      {/* ── SEAM ACCENT DIAGONALS (When gate is closed) ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          opacity: phase === "closed" ? 0.9 : 0,
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="100%" y1="0" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="0" y1="100%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>

      {/* ── CENTER REVEAL CONTENT ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
          padding: "0 24px",
          textAlign: "center",
          opacity: phase === "closed" ? 1 : 0,
          transform: phase === "closed" ? "scale(1)" : "scale(0.92)",
          transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      >
        {/* 132px Circular Badge with SVG Ring & MSK Logo */}
        <div
          style={{
            width: "128px",
            height: "128px",
            margin: "0 auto 24px",
            position: "relative",
          }}
        >
          <svg
            width="128"
            height="128"
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
              stroke="rgba(255, 255, 255, 0.12)"
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

          {/* Centered Monogram */}
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
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              MSK
            </span>
          </div>
        </div>

        {/* Dynamic Heading: Welcome to Portfolio / Welcome to [Tab] Section */}
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(24px, 4.5vw, 36px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
          }}
        >
          {formattedHeading}
        </h2>

        {/* Numeric progress indicator */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "20px",
            fontWeight: 500,
            color: "var(--accent)",
            marginBottom: "8px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {progress}%
        </div>

        {/* Status indicator */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.65)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {phase === "closed" && progress >= 100 ? "Opening gate..." : "Securing route..."}
        </div>
      </div>
    </div>
  );
}
