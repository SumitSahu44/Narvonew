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

export default function HardwareVisualizer3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModel, setActiveModel] = useState<"handle" | "hinge">("handle");

  // Rotation states
  const rotX = useRef(0.5);
  const rotY = useRef(0.6);
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  // Mouse hover offset for light reflections
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  // Generate 3D Vertices and Faces for the model
  const buildHandleModel = (): { vertices: Point3D[]; faces: number[][] } => {
    const vertices: Point3D[] = [];
    const faces: number[][] = [];

    const segments = 16;
    let vOffset = 0;

    // Helper: generate a cylinder along Z-axis
    const addCylinderZ = (r1: number, r2: number, z1: number, z2: number, cX = 0, cY = 0) => {
      const startIdx = vertices.length;
      // Circle 1 (front)
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r1 * Math.cos(angle), y: cY + r1 * Math.sin(angle), z: z1 });
      }
      // Circle 2 (back)
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: cX + r2 * Math.cos(angle), y: cY + r2 * Math.sin(angle), z: z2 });
      }

      // Connect rings with quad faces
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

    // Helper: generate a cylinder along X-axis (the handle grip)
    const addCylinderX = (r: number, x1: number, x2: number, cY = 0, cZ = 0) => {
      const startIdx = vertices.length;
      // Circle 1
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x1, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }
      // Circle 2
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push({ x: x2, y: cY + r * Math.cos(angle), z: cZ + r * Math.sin(angle) });
      }

      // Connect rings
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

    // 1. Base Plate (Rose): thin cylinder at z = -10 to z = 0, radius = 45
    addCylinderZ(45, 45, -10, 0);

    // 2. Base Stem: cylinder at z = 0 to z = 40, radius = 12
    addCylinderZ(12, 12, 0, 40);

    // 3. Horizontal Handle: cylinder along X from x = -10 to x = 110 at y = 0, z = 40, radius = 10
    addCylinderX(10, -10, 110, 0, 40);

    return { vertices, faces };
  };

  const buildHingeModel = (): { vertices: Point3D[]; faces: number[][] } => {
    const vertices: Point3D[] = [];
    const faces: number[][] = [];
    const segments = 12;

    // Helper: generate a cylinder along Y-axis (Hinge Center Pin)
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

    // Helper: flat box plates (hinge wings)
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

    // 1. Center Barrel Pin (Y-axis)
    addCylinderY(8, -60, 60, 0, 0);

    // 2. Left Hinge Plate (hinge wing 1)
    addBox(45, 100, 4, -28, 0, 0);

    // 3. Right Hinge Plate (hinge wing 2) - slightly angled
    addBox(45, 100, 4, 28, 0, 0);

    return { vertices, faces };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load active model
    const { vertices, faces } = activeModel === "handle" ? buildHandleModel() : buildHingeModel();

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

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.28;

      // Update automatic rotation if not dragging
      if (!isDragging.current) {
        rotY.current += 0.006;
        if (isHovered) {
          rotX.current += (0.25 - rotX.current) * 0.05;
        } else {
          rotX.current += (0.4 - rotX.current) * 0.03;
        }
      }

      const cosX = Math.cos(rotX.current);
      const sinX = Math.sin(rotX.current);
      const cosY = Math.cos(rotY.current);
      const sinY = Math.sin(rotY.current);

      // Transform Vertices (rotation X and Y)
      const transformedVerts = vertices.map((v) => {
        // Rotate around Y
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        let y1 = v.y;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Simple perspective projection offset
        const dist = 300;
        const scaleFactor = dist / (dist + z2);

        return {
          x: cx + x2 * scaleFactor * scale * 0.015,
          y: cy + y2 * scaleFactor * scale * 0.015,
          z: z2
        };
      });

      // Map Faces and Calculate Normals & Depths
      const renderedFaces: Face[] = [];

      faces.forEach((indices) => {
        // Calculate average Z for depth sorting
        let sumZ = 0;
        indices.forEach((idx) => {
          sumZ += transformedVerts[idx].z;
        });
        const centerZ = sumZ / indices.length;

        // Calculate Face Normal Vector in Screen Space
        const p0 = vertices[indices[0]];
        const p1 = vertices[indices[1]];
        const p2 = vertices[indices[2]];

        const u = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
        const v = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };

        // Cross product for normal
        const nx = u.y * v.z - u.z * v.y;
        const ny = u.z * v.x - u.x * v.z;
        const nz = u.x * v.y - u.y * v.x;

        // Normalize
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        let normal = { x: nx / len, y: ny / len, z: nz / len };

        // Rotate normal around Y then X
        let nx1 = normal.x * cosY - normal.z * sinY;
        let nz1 = normal.x * sinY + normal.z * cosY;
        let ny1 = normal.y;

        let nx2 = nx1;
        let ny2 = ny1 * cosX - nz1 * sinX;
        let nz2 = ny1 * sinX + nz1 * cosX;

        const rotatedNormal = { x: nx2, y: ny2, z: nz2 };

        // Back-face culling (if normal points away, don't render it)
        if (rotatedNormal.z < 0) {
          renderedFaces.push({ indices, normal: rotatedNormal, centerZ });
        }
      });

      // Painter's algorithm: Sort faces by depth (Z coordinate) back-to-front
      renderedFaces.sort((a, b) => b.centerZ - a.centerZ);

      // Draw Faces with metallic gradients
      renderedFaces.forEach((face) => {
        ctx.beginPath();
        face.indices.forEach((idx, i) => {
          const pt = transformedVerts[idx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();

        // Calculate dynamic directional light alignment based on normal and mouse hover
        const lx = mousePos.current.x * 2 - 1;
        const ly = mousePos.current.y * 2 - 1;
        const lz = -1.5;
        const lenLight = Math.sqrt(lx * lx + ly * ly + lz * lz);
        const lightDir = { x: lx / lenLight, y: ly / lenLight, z: lz / lenLight };

        // Dot product between light and face normal
        const dot = face.normal.x * lightDir.x + face.normal.y * lightDir.y + face.normal.z * lightDir.z;
        const diffuse = Math.max(0, dot);

        // Solid-Brass color palette mapping
        // We simulate gold reflections using a linear gradient aligning with light vector
        const xMin = Math.min(...face.indices.map(i => transformedVerts[i].x));
        const xMax = Math.max(...face.indices.map(i => transformedVerts[i].x));
        const yMin = Math.min(...face.indices.map(i => transformedVerts[i].y));
        const yMax = Math.max(...face.indices.map(i => transformedVerts[i].y));

        const grad = ctx.createLinearGradient(xMin, yMin, xMax, yMax);

        if (diffuse > 0.6) {
          // Shiny Highlight zone
          grad.addColorStop(0, "#FCE8A4"); // bright gold
          grad.addColorStop(0.5, "#D4AF37"); // standard brass
          grad.addColorStop(1, "#AA7C11"); // shadow gold
        } else if (diffuse > 0.25) {
          // Medium lit area
          grad.addColorStop(0, "#D4AF37");
          grad.addColorStop(1, "#8A5A00"); // copper brass shadow
        } else {
          // Shadow zone
          grad.addColorStop(0, "#8A5A00");
          grad.addColorStop(1, "#362200"); // dark bronze
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle wireframe stroke to enhance the 3D aesthetic lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
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

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevMouseX.current = e.clientX;
    prevMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      // Calculate cursor coordinates relative to canvas for shader reflection direction
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
      className="w-full flex flex-col h-full bg-[#111111] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl relative select-none"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />

      {/* Header Tabs */}
      <div className="p-5 flex items-center justify-between border-b border-white/5 relative z-10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-white font-heading font-extrabold text-sm tracking-wide">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span>Interactive 3D Preview</span>
        </div>

        {/* Model select buttons */}
        <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
          <button
            onClick={() => setActiveModel("handle")}
            className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeModel === "handle"
                ? "bg-primary text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            Handle
          </button>
          <button
            onClick={() => setActiveModel("hinge")}
            className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeModel === "hinge"
                ? "bg-primary text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            Hinge
          </button>
        </div>
      </div>

      {/* The 3D Canvas */}
      <div className="flex-grow relative cursor-grab active:cursor-grabbing h-[220px] sm:h-[260px]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Instruction overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-widest text-white/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
          <Hand className="w-3 h-3 text-primary" />
          <span>Drag to rotate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/25 mx-1" />
          <RotateCw className="w-3 h-3 text-primary" />
          <span>Move mouse for light glints</span>
        </div>
      </div>

      {/* Info footer description */}
      <div className="p-5 bg-white/[0.02] border-t border-white/5 text-center flex flex-col gap-1 z-10">
        <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest">
          {activeModel === "handle" ? "Solid Brass L-Door Pull" : "Slimline Soft-Close Hinge"}
        </span>
        <p className="text-[11px] font-sans text-white/40 leading-relaxed">
          {activeModel === "handle" 
            ? "Hand-buffed luxury brass pulls designed for premium villas." 
            : "4-hole mounting patterns and hydraulic closing dampers."}
        </p>
      </div>
    </div>
  );
}
