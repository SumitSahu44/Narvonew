"use client";

import React, { useRef, useEffect, useState } from "react";
import { Sparkles, RotateCw, Hand } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: number[];
  normal: Point3D;
  centerZ: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function HardwareVisualizer3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModel, setActiveModel] = useState<"handle" | "hinge" | "smartlock">("handle");

  // Rotation states
  const rotX = useRef(0.5);
  const rotY = useRef(0.6);
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  // Mouse hover offset for light reflections
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  // 3D Particle system state
  const particles = useRef<Particle[]>([]);

  // Generate 3D Vertices and Faces for the Pull Handle
  const buildHandleModel = (): { vertices: Point3D[]; faces: number[][] } => {
    const vertices: Point3D[] = [];
    const faces: number[][] = [];
    const segments = 16;

    const addCylinderZ = (r1: number, r2: number, z1: number, z2: number, cX = 0, cY = 0) => {
      const startIdx = vertices.length;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r1 * Math.cos(angle), y: cY + r1 * Math.sin(angle), z: z1 });
      }
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r2 * Math.cos(angle), y: cY + r2 * Math.sin(angle), z: z2 });
      }
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        faces.push([
          startIdx + i,
          startIdx + next,
          startIdx + segments + next,
          startIdx + segments + i
        ]);
      }
    };

    const addCylinderX = (r: number, x1: number, x2: number, cY = 0, cZ = 0) => {
      const startIdx = vertices.length;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x1, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x2, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        faces.push([
          startIdx + i,
          startIdx + next,
          startIdx + segments + next,
          startIdx + segments + i
        ]);
      }
    };

    // 1. Base Plate (Rose): radius = 42
    addCylinderZ(42, 42, -10, 0);

    // 2. Base Stem: radius = 12
    addCylinderZ(12, 12, 0, 40);

    // 3. Horizontal Grip: radius = 10, offset Z = 40
    addCylinderX(10, -10, 110, 0, 40);

    return { vertices, faces };
  };

  // Generate 3D Vertices and Faces for the Hinge
  const buildHingeModel = (): { vertices: Point3D[]; faces: number[][] } => {
    const vertices: Point3D[] = [];
    const faces: number[][] = [];
    const segments = 12;

    const addCylinderY = (r: number, y1: number, y2: number, cX = 0, cZ = 0) => {
      const startIdx = vertices.length;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r * Math.cos(angle), y: y1, z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r * Math.cos(angle), y: y2, z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        faces.push([
          startIdx + i,
          startIdx + next,
          startIdx + segments + next,
          startIdx + segments + i
        ]);
      }
    };

    const addBox = (w: number, h: number, d: number, ox: number, oy: number, oz: number) => {
      const startIdx = vertices.length;
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;

      const boxVerts = [
        { x: ox - hw, y: oy - hh, z: oz - hd },
        { x: ox + hw, y: oy - hh, z: oz - hd },
        { x: ox + hw, y: oy + hh, z: oz - hd },
        { x: ox - hw, y: oy + hh, z: oz - hd },
        { x: ox - hw, y: oy - hh, z: oz + hd },
        { x: ox + hw, y: oy - hh, z: oz + hd },
        { x: ox + hw, y: oy + hh, z: oz + hd },
        { x: ox - hw, y: oy + hh, z: oz + hd }
      ];
      vertices.push(...boxVerts);

      faces.push([startIdx + 0, startIdx + 1, startIdx + 2, startIdx + 3]); // front
      faces.push([startIdx + 1, startIdx + 5, startIdx + 6, startIdx + 2]); // right
      faces.push([startIdx + 5, startIdx + 4, startIdx + 7, startIdx + 6]); // back
      faces.push([startIdx + 4, startIdx + 0, startIdx + 3, startIdx + 7]); // left
      faces.push([startIdx + 3, startIdx + 2, startIdx + 6, startIdx + 7]); // top
      faces.push([startIdx + 4, startIdx + 5, startIdx + 1, startIdx + 0]); // bottom
    };

    // 1. Center Cylinder (Y-axis Pin)
    addCylinderY(8, -60, 60, 0, 0);

    // 2. Left Wing Plate
    addBox(45, 100, 4, -28, 0, 0);

    // 3. Right Wing Plate
    addBox(45, 100, 4, 28, 0, 0);

    return { vertices, faces };
  };

  // Generate 3D Vertices and Faces for the Smart Lock
  const buildSmartLockModel = (): { vertices: Point3D[]; faces: number[][] } => {
    const vertices: Point3D[] = [];
    const faces: number[][] = [];
    const segments = 16;

    const addBox = (w: number, h: number, d: number, ox: number, oy: number, oz: number) => {
      const startIdx = vertices.length;
      const hw = w / 2;
      const hh = h / 2;
      const hd = d / 2;

      const boxVerts = [
        { x: ox - hw, y: oy - hh, z: oz - hd },
        { x: ox + hw, y: oy - hh, z: oz - hd },
        { x: ox + hw, y: oy + hh, z: oz - hd },
        { x: ox - hw, y: oy + hh, z: oz - hd },
        { x: ox - hw, y: oy - hh, z: oz + hd },
        { x: ox + hw, y: oy - hh, z: oz + hd },
        { x: ox + hw, y: oy + hh, z: oz + hd },
        { x: ox - hw, y: oy + hh, z: oz + hd }
      ];
      vertices.push(...boxVerts);

      faces.push([startIdx + 0, startIdx + 1, startIdx + 2, startIdx + 3]); // front
      faces.push([startIdx + 1, startIdx + 5, startIdx + 6, startIdx + 2]); // right
      faces.push([startIdx + 5, startIdx + 4, startIdx + 7, startIdx + 6]); // back
      faces.push([startIdx + 4, startIdx + 0, startIdx + 3, startIdx + 7]); // left
      faces.push([startIdx + 3, startIdx + 2, startIdx + 6, startIdx + 7]); // top
      faces.push([startIdx + 4, startIdx + 5, startIdx + 1, startIdx + 0]); // bottom
    };

    const addCylinderZ = (r1: number, r2: number, z1: number, z2: number, cX = 0, cY = 0) => {
      const startIdx = vertices.length;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r1 * Math.cos(angle), y: cY + r1 * Math.sin(angle), z: z1 });
      }
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r2 * Math.cos(angle), y: cY + r2 * Math.sin(angle), z: z2 });
      }
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        faces.push([
          startIdx + i,
          startIdx + next,
          startIdx + segments + next,
          startIdx + segments + i
        ]);
      }
    };

    const addCylinderX = (r: number, x1: number, x2: number, cY = 0, cZ = 0) => {
      const startIdx = vertices.length;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x1, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x2, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        faces.push([
          startIdx + i,
          startIdx + next,
          startIdx + segments + next,
          startIdx + segments + i
        ]);
      }
    };

    // 1. Titanium Lock Plate: width = 44, height = 120, depth = 6
    addBox(44, 120, 6, 0, 0, 0); // Vertices 0 to 7.

    // 2. Handle Stem (Brass Gold): Z cylinder at y = -25, radius = 6
    addCylinderZ(7, 7, 3, 25, 0, -25);

    // 3. Lever Handle Grip (Brass Gold): X cylinder at y = -25, Z = 25, from X = -5 to X = 65, radius = 7
    addCylinderX(7, -5, 65, -25, 25);

    // 4. Lock Ring (Brass Gold): Z cylinder at y = 25
    addCylinderZ(11, 11, 3, 8, 0, 25);

    return { vertices, faces };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load active model
    const { vertices, faces } =
      activeModel === "handle"
        ? buildHandleModel()
        : activeModel === "hinge"
        ? buildHingeModel()
        : buildSmartLockModel();

    let animationFrameId: number;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!ctx || !canvas) return;

      // Clear Canvas with smooth transparent dark background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.28;

      // Update automatic rotation if not dragging
      if (!isDragging.current) {
        rotY.current += 0.007;
        if (isHovered) {
          rotX.current += (0.2 - rotX.current) * 0.05;
        } else {
          rotX.current += (0.35 - rotX.current) * 0.03;
        }
      }

      const cosX = Math.cos(rotX.current);
      const sinX = Math.sin(rotX.current);
      const cosY = Math.cos(rotY.current);
      const sinY = Math.sin(rotY.current);

      // --- Update & Draw 3D Particle Sparks ---
      // Spawn new sparks
      if (particles.current.length < 35 && Math.random() < 0.2) {
        particles.current.push({
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          z: (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.5, // Float upwards
          vz: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 80 + 40
        });
      }

      // Update particle kinematics
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;
      });

      // Filter out dead particles
      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      // Render 3D Sparks in projected space
      particles.current.forEach((p) => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y1 = p.y;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const dist = 300;
        const scaleFactor = dist / (dist + z2);
        const px = cx + x2 * scaleFactor * scale * 0.015;
        const py = cy + y2 * scaleFactor * scale * 0.015;

        ctx.beginPath();
        ctx.arc(px, py, p.size * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 139, 43, ${p.alpha * 0.75})`;
        ctx.shadowColor = "#C78B2B";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur for model rendering
      });

      // --- Model Rendering ---
      // Transform vertices
      const transformedVerts = vertices.map((v) => {
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        let y1 = v.y;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const dist = 300;
        const scaleFactor = dist / (dist + z2);

        return {
          x: cx + x2 * scaleFactor * scale * 0.015,
          y: cy + y2 * scaleFactor * scale * 0.015,
          z: z2
        };
      });

      // Map faces
      const renderedFaces: Face[] = [];

      faces.forEach((indices) => {
        let sumZ = 0;
        indices.forEach((idx) => {
          sumZ += transformedVerts[idx].z;
        });
        const centerZ = sumZ / indices.length;

        const p0 = vertices[indices[0]];
        const p1 = vertices[indices[1]];
        const p2 = vertices[indices[2]];

        const u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
        const v = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };

        const nx = u.y * v.z - u.z * v.y;
        const ny = u.z * v.x - u.x * v.z;
        const nz = u.x * v.y - u.y * v.x;

        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        let normal = { x: nx / len, y: ny / len, z: nz / len };

        let nx1 = normal.x * cosY - normal.z * sinY;
        let nz1 = normal.x * sinY + normal.z * cosY;
        let ny1 = normal.y;

        let nx2 = nx1;
        let ny2 = ny1 * cosX - nz1 * sinX;
        let nz2 = ny1 * sinX + nz1 * cosX;

        const rotatedNormal = { x: nx2, y: ny2, z: nz2 };

        // Back-face culling
        if (rotatedNormal.z < 0) {
          renderedFaces.push({ indices, normal: rotatedNormal, centerZ });
        }
      });

      // Depth sort
      renderedFaces.sort((a, b) => b.centerZ - a.centerZ);

      // Draw faces
      renderedFaces.forEach((face) => {
        ctx.beginPath();
        face.indices.forEach((idx, i) => {
          const pt = transformedVerts[idx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();

        const lx = mousePos.current.x * 2 - 1;
        const ly = mousePos.current.y * 2 - 1;
        const lz = -1.5;
        const lenLight = Math.sqrt(lx * lx + ly * ly + lz * lz);
        const lightDir = { x: lx / lenLight, y: ly / lenLight, z: lz / lenLight };

        const dot = face.normal.x * lightDir.x + face.normal.y * lightDir.y + face.normal.z * lightDir.z;
        const diffuse = Math.max(0, dot);

        const xMin = Math.min(...face.indices.map((i) => transformedVerts[i].x));
        const xMax = Math.max(...face.indices.map((i) => transformedVerts[i].x));
        const yMin = Math.min(...face.indices.map((i) => transformedVerts[i].y));
        const yMax = Math.max(...face.indices.map((i) => transformedVerts[i].y));

        const grad = ctx.createLinearGradient(xMin, yMin, xMax, yMax);

        // Apply shader style based on active model
        if (activeModel === "handle") {
          // Luxury Brushed Gold / Brass
          if (diffuse > 0.6) {
            grad.addColorStop(0, "#FCE8A4");
            grad.addColorStop(0.5, "#C78B2B");
            grad.addColorStop(1, "#945F12");
          } else if (diffuse > 0.25) {
            grad.addColorStop(0, "#C78B2B");
            grad.addColorStop(1, "#7D4F0B");
          } else {
            grad.addColorStop(0, "#7D4F0B");
            grad.addColorStop(1, "#362200");
          }
        } else if (activeModel === "hinge") {
          // Architectural Chromium Steel / Silver
          if (diffuse > 0.6) {
            grad.addColorStop(0, "#FFFFFF");
            grad.addColorStop(0.5, "#E2E8F0");
            grad.addColorStop(1, "#64748B");
          } else if (diffuse > 0.25) {
            grad.addColorStop(0, "#CBD5E1");
            grad.addColorStop(1, "#475569");
          } else {
            grad.addColorStop(0, "#334155");
            grad.addColorStop(1, "#0F172A");
          }
        } else {
          // Smart Lock: Titanium Black Backplate & Brass Gold handle lever
          // Vertices index > 7 represents the handles and rings
          const isGoldAccent = face.indices.some((idx) => idx > 7);
          if (isGoldAccent) {
            if (diffuse > 0.6) {
              grad.addColorStop(0, "#FCE8A4");
              grad.addColorStop(0.5, "#C78B2B");
              grad.addColorStop(1, "#945F12");
            } else if (diffuse > 0.25) {
              grad.addColorStop(0, "#C78B2B");
              grad.addColorStop(1, "#7D4F0B");
            } else {
              grad.addColorStop(0, "#7D4F0B");
              grad.addColorStop(1, "#362200");
            }
          } else {
            // Matte Titanium Black
            if (diffuse > 0.6) {
              grad.addColorStop(0, "#52525B");
              grad.addColorStop(0.5, "#27272A");
              grad.addColorStop(1, "#18181B");
            } else if (diffuse > 0.25) {
              grad.addColorStop(0, "#27272A");
              grad.addColorStop(1, "#09090B");
            } else {
              grad.addColorStop(0, "#18181B");
              grad.addColorStop(1, "#020202");
            }
          }
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Wireframe overlay lines
        ctx.strokeStyle = activeModel === "hinge" ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeModel, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
    }

    if (!isDragging.current) return;
    const deltaX = e.clientX - prevMouseX.current;
    const deltaY = e.clientY - prevMouseY.current;

    rotY.current += deltaX * 0.007;
    rotX.current += deltaY * 0.007;

    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUpOrLeave();
      }}
      className="w-full flex flex-col h-full bg-[#111111]/80 backdrop-blur-md rounded-[28px] overflow-hidden border border-white/10 shadow-2xl relative select-none group"
    >
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />

      {/* Header controls bar */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 relative z-10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-white font-heading font-extrabold text-xs tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Interactive 3D Studio</span>
        </div>

        <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
          <button
            onClick={() => setActiveModel("handle")}
            className={`px-3 py-1.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeModel === "handle"
                ? "bg-primary text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            Handle
          </button>
          <button
            onClick={() => setActiveModel("hinge")}
            className={`px-3 py-1.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeModel === "hinge"
                ? "bg-primary text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            Hinge
          </button>
          <button
            onClick={() => setActiveModel("smartlock")}
            className={`px-3 py-1.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeModel === "smartlock"
                ? "bg-primary text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            Lock
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="flex-grow relative cursor-grab active:cursor-grabbing h-[220px] sm:h-[260px]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Floating guidance overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-[8px] font-sans font-bold uppercase tracking-widest text-white/50 pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100 shadow-lg">
          <Hand className="w-2.5 h-2.5 text-primary" />
          <span>Hold & Drag to Rotate</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <RotateCw className="w-2.5 h-2.5 text-primary" />
          <span>Hover for Reflections</span>
        </div>
      </div>

      {/* Info panel details */}
      <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center flex flex-col gap-1 z-10">
        <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest">
          {activeModel === "handle"
            ? "Solid Brass Pull"
            : activeModel === "hinge"
            ? "Hydraulic soft-close hinge"
            : "Architectural Smart Lock"}
        </span>
        <p className="text-[11px] font-sans text-white/40 leading-relaxed max-w-xs mx-auto">
          {activeModel === "handle"
            ? "Hand-buffed modular brass lever."
            : activeModel === "hinge"
            ? "Soft-close damper with E-clip bases."
            : "Sleek titanium and solid-brass biometrics lock."}
        </p>
      </div>
    </div>
  );
}
