import React, { useEffect, useRef } from "react";

// --- 3D Vector & Mesh Types ---
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

interface WireframeMesh {
  vertices: Vec3[];
  edges: Edge[];
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  scale: number;
  color: [number, number, number];
}

// --- Fluid Wave Layer Type ---
interface WaveLayer {
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  offsetY: number;
  colorStart: string;
  colorEnd: string;
}

// Helper to generate 3D Polyhedra
function createIcosahedron(): { vertices: Vec3[]; edges: Edge[] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices: Vec3[] = [
    { x: -1, y: phi, z: 0 },
    { x: 1, y: phi, z: 0 },
    { x: -1, y: -phi, z: 0 },
    { x: 1, y: -phi, z: 0 },
    { x: 0, y: -1, z: phi },
    { x: 0, y: 1, z: phi },
    { x: 0, y: -1, z: -phi },
    { x: 0, y: 1, z: -phi },
    { x: phi, y: 0, z: -1 },
    { x: phi, y: 0, z: 1 },
    { x: -phi, y: 0, z: -1 },
    { x: -phi, y: 0, z: 1 },
  ];

  const edges: Edge[] = [];
  const distThreshold = 4.05;
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const dx = vertices[i].x - vertices[j].x;
      const dy = vertices[i].y - vertices[j].y;
      const dz = vertices[i].z - vertices[j].z;
      if (dx * dx + dy * dy + dz * dz < distThreshold) {
        edges.push({ a: i, b: j });
      }
    }
  }
  return { vertices, edges };
}

function createTorus(segments: number = 14, ringSegments: number = 8): { vertices: Vec3[]; edges: Edge[] } {
  const vertices: Vec3[] = [];
  const edges: Edge[] = [];
  const R = 1.3;
  const r = 0.55;

  for (let i = 0; i < segments; i++) {
    const u = (i / segments) * Math.PI * 2;
    for (let j = 0; j < ringSegments; j++) {
      const v = (j / ringSegments) * Math.PI * 2;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
      vertices.push({ x, y, z });
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < ringSegments; j++) {
      const current = i * ringSegments + j;
      const nextRing = ((i + 1) % segments) * ringSegments + j;
      const nextSeg = i * ringSegments + ((j + 1) % ringSegments);
      edges.push({ a: current, b: nextRing });
      edges.push({ a: current, b: nextSeg });
    }
  }

  return { vertices, edges };
}

function createOctahedron(): { vertices: Vec3[]; edges: Edge[] } {
  const vertices: Vec3[] = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ];
  const edges: Edge[] = [
    { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 }, { a: 0, b: 5 },
    { a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 1, b: 5 },
    { a: 2, b: 4 }, { a: 4, b: 3 }, { a: 3, b: 5 }, { a: 5, b: 2 },
  ];
  return { vertices, edges };
}

export const FluidGeometricCanvas: React.FC = () => {
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
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

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
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", resize);

    // Color Palette
    const palette: [number, number, number][] = [
      [79, 70, 229],   // Royal Indigo
      [6, 182, 212],   // Electric Cyan
      [139, 92, 246],  // Luminous Violet
      [56, 189, 248],  // Sky Blue
      [16, 185, 129],  // Emerald Accent
    ];

    // Build 3D Polyhedra Meshes
    const rawShapes = [createIcosahedron(), createTorus(), createOctahedron()];
    const meshes: WireframeMesh[] = [];

    // Spaced out 3D floating shapes
    for (let i = 0; i < 5; i++) {
      const shapeData = rawShapes[i % rawShapes.length];
      const color = palette[i % palette.length];
      meshes.push({
        vertices: shapeData.vertices,
        edges: shapeData.edges,
        x: (Math.random() - 0.5) * width * 0.85,
        y: (Math.random() - 0.5) * height * 0.85,
        z: 450 + Math.random() * 550,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (Math.random() - 0.5) * 0.007,
        speedZ: (Math.random() - 0.5) * 0.004,
        scale: 55 + Math.random() * 45,
        color,
      });
    }

    // Organic Wave Layers
    const waves: WaveLayer[] = [
      {
        amplitude: 45,
        frequency: 0.004,
        speed: 0.012,
        phase: 0,
        offsetY: 0.62,
        colorStart: "rgba(79, 70, 229, 0.12)",
        colorEnd: "rgba(6, 182, 212, 0.01)",
      },
      {
        amplitude: 60,
        frequency: 0.003,
        speed: 0.009,
        phase: 1.5,
        offsetY: 0.72,
        colorStart: "rgba(139, 92, 246, 0.10)",
        colorEnd: "rgba(56, 189, 248, 0.01)",
      },
      {
        amplitude: 35,
        frequency: 0.006,
        speed: 0.015,
        phase: 3.0,
        offsetY: 0.82,
        colorStart: "rgba(6, 182, 212, 0.08)",
        colorEnd: "rgba(79, 70, 229, 0.01)",
      },
    ];

    let time = 0;
    const focalLength = 520;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Smooth Mouse Interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const offsetX = (mouseX - width / 2) * 0.06;
      const offsetY = (mouseY - height / 2) * 0.06;

      // ─── 1. Render Undulating Fluid Gradient Waves ───
      for (let w = 0; w < waves.length; w++) {
        const wave = waves[w];
        wave.phase += wave.speed;

        ctx.beginPath();
        const baseLineY = height * wave.offsetY + offsetY * (0.3 + w * 0.1);
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 12) {
          const dxM = x - mouseX;
          const distM = Math.abs(dxM);
          const mouseLift = distM < 250 ? (1 - distM / 250) * 20 : 0;

          const y =
            baseLineY +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.7 + wave.phase * 0.8) * (wave.amplitude * 0.5) -
            mouseLift;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseLineY - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.colorStart);
        grad.addColorStop(1, wave.colorEnd);
        ctx.fillStyle = grad;
        ctx.fill();

        // Wave Edge Line Glow
        ctx.beginPath();
        for (let x = 0; x <= width; x += 16) {
          const dxM = x - mouseX;
          const distM = Math.abs(dxM);
          const mouseLift = distM < 250 ? (1 - distM / 250) * 20 : 0;

          const y =
            baseLineY +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.cos(x * wave.frequency * 0.7 + wave.phase * 0.8) * (wave.amplitude * 0.5) -
            mouseLift;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.colorStart.replace(/[\d\.]+\)$/, "0.22)");
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // ─── 2. Render 3D Polyhedra Wireframes (Particle-Free) ───
      for (let m = 0; m < meshes.length; m++) {
        const mesh = meshes[m];
        mesh.rotX += mesh.speedX;
        mesh.rotY += mesh.speedY;
        mesh.rotZ += mesh.speedZ;

        const cosX = Math.cos(mesh.rotX);
        const sinX = Math.sin(mesh.rotX);
        const cosY = Math.cos(mesh.rotY);
        const sinY = Math.sin(mesh.rotY);
        const cosZ = Math.cos(mesh.rotZ);
        const sinZ = Math.sin(mesh.rotZ);

        const cx = width / 2 + mesh.x + offsetX * (750 / mesh.z);
        const cy = height / 2 + mesh.y + offsetY * (750 / mesh.z);

        // Project Vertices
        const projected: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < mesh.vertices.length; i++) {
          const v = mesh.vertices[i];

          let y1 = v.y * cosX - v.z * sinX;
          let z1 = v.y * sinX + v.z * cosX;
          let x2 = v.x * cosY + z1 * sinY;
          let z2 = -v.x * sinY + z1 * cosY;
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          const x3d = x3 * mesh.scale;
          const y3d = y3 * mesh.scale;
          const z3d = z2 * mesh.scale + mesh.z;

          const scale2d = focalLength / (focalLength + z3d);
          projected.push({
            x: cx + x3d * scale2d,
            y: cy + y3d * scale2d,
            z: z3d,
          });
        }

        const [r, g, b] = mesh.color;

        // Draw Clean Wireframe Edges (NO Dots/Particles)
        ctx.lineWidth = 1.2;
        for (let i = 0; i < mesh.edges.length; i++) {
          const edge = mesh.edges[i];
          const p1 = projected[edge.a];
          const p2 = projected[edge.b];

          if (p1 && p2) {
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.05, Math.min(0.32, 550 / avgZ));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
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

export default FluidGeometricCanvas;
