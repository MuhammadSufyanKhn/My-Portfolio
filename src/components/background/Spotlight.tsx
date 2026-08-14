import React, { useEffect, useRef } from "react";

export const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
            spotlightRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={spotlightRef} className="mouse-spotlight" aria-hidden="true" />;
};

export default Spotlight;
