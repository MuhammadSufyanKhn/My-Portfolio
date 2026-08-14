import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: [number, number, number];
  pulseSpeed: number;
  pulseOffset: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle colors: vivid cyan, indigo, violet, emerald, blue
    const colorPalette: [number, number, number][] = [
      [56, 189, 248],   // Sky cyan
      [96, 165, 250],   // Light blue
      [129, 140, 248],  // Indigo
      [167, 139, 250],  // Violet
      [52, 211, 153],   // Emerald
      [244, 114, 182],  // Pink (rare)
    ];

    const particleCount = Math.min(160, Math.floor((width * height) / 8000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const baseAlpha = 0.15 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.1 - Math.random() * 0.3,
        radius: 0.6 + Math.random() * 1.6,
        baseAlpha,
        alpha: baseAlpha,
        color,
        pulseSpeed: 0.005 + Math.random() * 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const maxConnectDistance = 130;
    const mouseInfluenceRadius = 200;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion / attraction
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseInfluenceRadius && distMouse > 0) {
          const force = (1 - distMouse / mouseInfluenceRadius) * 0.8;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.vx += Math.cos(angle) * force * 0.15;
          p.vy += Math.sin(angle) * force * 0.15;
        }

        // Apply velocity with damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Gentle upward drift
        p.y -= 0.08;

        // Wrap around boundaries
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.15;

        // Draw particle with glow
        const [r, g, b] = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Outer glow
        if (p.radius > 1.2) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.6})`);
          grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.15})`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.fill();

        // Draw connection lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.12;
            const avgR = (r + p2.color[0]) / 2;
            const avgG = (g + p2.color[1]) / 2;
            const avgB = (b + p2.color[2]) / 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connection line to mouse if close
        if (distMouse < mouseInfluenceRadius && distMouse > 0) {
          const lineAlpha = (1 - distMouse / mouseInfluenceRadius) * 0.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;
