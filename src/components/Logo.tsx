interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: "28px", height: "28px", fontSize: "11px", radius: "6px" },
    md: { width: "34px", height: "34px", fontSize: "12px", radius: "8px" },
    lg: { width: "42px", height: "42px", fontSize: "15px", radius: "10px" },
  }[size];

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.radius,
        background: "var(--accent)",
        color: "var(--on-accent)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: dimensions.fontSize,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        flexShrink: 0,
        userSelect: "none",
      }}
      aria-label="MSK Logo"
    >
      MSK
    </div>
  );
}
