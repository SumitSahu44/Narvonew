"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, Eye, Info, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "@/components/Reveal";

interface Product {
  id: string;
  name: string;
  price?: string;
  category: string;
  description: string;
  images: string[];
  specs: { [key: string]: string };
}

const productsData: Product[] = [
  {
    id: "slimline-hinge",
    name: "Slimline Clip On Cabinet Hinges Hydraulic 4 Hole - 15 Degrees",
    price: "₹ 320 / pair",
    category: "Cabinet Hardware",
    description: "Premium B2B wholesale soft-closing hydraulic hinges designed specifically for luxury cabinet doors. Features an advanced hydraulic mechanism for smooth closing, a 4-hole mounting pattern for maximum stability, and a 15-degree adjustment angle.",
    images: [
      "/products/1/slimline-clip-showcase1.png",
      "/products/1/slimline-clip-showcase3.png",
      "/products/1/slimline-clip-white.png",
    ],
    specs: {
      "Suitable Door": "Cabinet Door",
      "Hinge Size": "5 Inch",
      "Hinge Type": "Hydraulic Soft-Close",
      "Hole Pattern": "4 Holes Plate",
      "Degree Angle": "15 Degrees",
      "Response Rate": "89% (Wholesale Support)",
      "Quality Stamp": "TrustSEAL Certified",
    }
  },
  {
    id: "drawer-channel",
    name: "Self Closing 20inch Sliding Drawer Channel",
    // price: "₹ 36 / Inch",
    category: "Drawer Channels",
    description: "Heavy-duty 20-inch self-closing sliding drawer runners. Engineered with premium cold rolled steel, integrated double-spring hydraulic dampening for silent closing, and dual-direction steel ball bearings for smooth cabinet operations.",
    images: [
      "/products/2/sliding-drawer-showcase.png",
      "/products/2/sliding-drawer-whitebg.png",
      "/products/2/sliding-drawer-info.png",
    ],
    specs: {
      "Channel Size": "20 Inch (500mm)",
      "Mount Type": "Side / Under Mount",
      "Mechanism": "Self Closing Hydraulic",
      "Material": "Cold Rolled Steel",
      "Load Capacity": "Heavy Duty Industrial",
      "Response Rate": "78% (Wholesale Support)",
      "Quality Stamp": "Premium B2B Grade",
    }
  }
];

export default function InteractiveShowcase() {
  const [doorOpen, setDoorOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(productsData[0]);

  // 360 Degree Viewer states
  const [imageIndex, setImageIndex] = useState(0);
  const dragStart = useRef(0);
  const isDragging = useRef(false);

  // Change product when door/drawer interacts
  const selectProduct = (id: string) => {
    const prod = productsData.find(p => p.id === id) || null;
    setSelectedProduct(prod);
    setImageIndex(0); // reset index
  };

  const getWhatsAppLink = (product: Product) => {
    const text = `Hi NARVO Hardware, I want to enquire about the B2B product: "${product.name}". Please share wholesale catalogs, lead times, and shipping terms.`;
    return `https://wa.me/918875341190?text=${encodeURIComponent(text)}`;
  };

  // Drag handlers for 360-degree rotation
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStart.current = clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !selectedProduct) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart.current;

    // Shift images every 20px of drag drag movement
    const threshold = 25;
    if (Math.abs(diff) > threshold) {
      const steps = Math.floor(diff / threshold);
      const totalImages = selectedProduct.images.length;

      // Calculate new image index cyclicly
      setImageIndex((prev) => {
        let nextIndex = (prev - steps) % totalImages;
        if (nextIndex < 0) nextIndex += totalImages;
        return nextIndex;
      });
      dragStart.current = clientX; // reset start anchor
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden px-6 md:px-12 lg:px-24 border-t border-border-custom">
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col mb-20 max-w-xl">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-2.5 inline-block">
            Virtual Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
            See Hardware in Action
          </h2>
          <p className="text-sm md:text-base text-text-custom/60 mt-3 font-sans">
            Open the cabinet door or pull the drawer to reveal and inspect our B2B fittings in detail.
          </p>
        </div>
        {/* 2-Column Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Interactive Cabinet Mockup (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-lightgray rounded-[36px] border border-border-custom p-8 md:p-12 relative min-h-[500px]">
            {/* The 3D Perspective Cabinet Box - Matte Charcoal Exterior */}
            <div className="w-[240px] h-[380px] bg-[#1e2226] rounded-2xl border-4 border-[#2d3135] shadow-2xl relative flex flex-col overflow-visible preserve-3d">
              {/* Internal elements (visible when door is open) */}
              <div className="absolute top-1 right-2 z-0 w-8 h-8 flex flex-col gap-1 items-center justify-center opacity-80">
                {/* Simulated hinge placement inside cabinet */}
                <div className="w-1.5 h-6 bg-zinc-400 rounded-sm" />
                <div className="w-2.5 h-2 bg-zinc-300 rounded-sm" />
              </div>

              {/* CABINET DOOR (Top Section) - Shaker Style with Vertical Pull */}
              <div className="h-[240px] w-full relative z-20 border-b-2 border-[#16120e] preserve-3d origin-left">
                {/* Cabinet Backing Board (Internal warm oak wood background revealed when door opens) */}
                <div className="absolute inset-0 bg-[#ebd4b8] rounded-t-lg z-0 overflow-hidden pointer-events-none">
                  {/* Internal wood grain detail */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:100%_8px] opacity-35" />
                  {/* Internal depth shadow */}
                  <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/25 to-transparent" />
                </div>

                <motion.div
                  animate={{ rotateY: doorOpen ? -115 : 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 15 }}
                  onClick={() => {
                    setDoorOpen(!doorOpen);
                    if (!doorOpen) {
                      selectProduct("slimline-hinge");
                      setDrawerOpen(false);
                    }
                  }}
                  className="absolute inset-0 bg-[#2d3135] border-8 border-[#202326] rounded-t-xl cursor-pointer p-1.5 shadow-xl select-none flex items-center justify-end preserve-3d z-10"
                  style={{ originX: 0 }}
                >
                  {/* Recessed Shaker Panel center */}
                  <div className="w-full h-full bg-[#24272b] border border-[#17191b] rounded-sm relative flex items-center justify-end pr-3">
                    {/* Charcoal texture lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px] rounded-sm pointer-events-none opacity-40" />

                    {/* Click indicator badge */}
                    {!doorOpen && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#dfb76c] bg-[#1e2226]/90 border border-[#dfb76c]/30 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                          Click to Open
                        </span>
                      </div>
                    )}

                    {/* Brass Sleek Vertical Pull handle */}
                    <div className="w-2.5 h-14 bg-gradient-to-b from-[#dfb76c] via-[#c59b27] to-[#9a751c] border border-[#e5c386]/30 rounded-sm shadow-md" />
                  </div>
                </motion.div>

                {/* Inner Glow Spotlight for Hinge Hotspot */}
                {doorOpen && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => selectProduct("slimline-hinge")}
                    className="absolute top-8 right-6 z-20 w-9 h-9 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Info className="w-4.5 h-4.5 animate-pulse" />
                  </motion.button>
                )}
              </div>

              {/* SLIDING DRAWER (Bottom Section) - With Side Runner Metals */}
              <div className="flex-grow w-full relative z-10 overflow-visible">
                {/* The Drawer Box Side Walls (visible when drawer slides out) - Maple Wood Finish */}
                <motion.div
                  animate={{ y: drawerOpen ? 30 : 0, z: drawerOpen ? 25 : 0 }}
                  transition={{ type: "spring", stiffness: 95, damping: 14 }}
                  className="absolute top-0 left-4 right-4 h-[85%] bg-[#dfc3a2] border-x border-[#b09677] origin-top z-0 pointer-events-none"
                >
                  {/* Left & Right Metallic sliding runners */}
                  <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-3.5 h-[70%] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300 border border-zinc-500 rounded-sm shadow-sm" />
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-3.5 h-[70%] bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300 border border-zinc-500 rounded-sm shadow-sm" />
                </motion.div>

                {/* Front Drawer Panel - Matte Charcoal */}
                <motion.div
                  animate={{ y: drawerOpen ? 30 : 0, z: drawerOpen ? 25 : 0 }}
                  transition={{ type: "spring", stiffness: 95, damping: 14 }}
                  onClick={() => {
                    setDrawerOpen(!drawerOpen);
                    if (!drawerOpen) {
                      selectProduct("drawer-channel");
                      setDoorOpen(false);
                    }
                  }}
                  className="absolute inset-0 bg-[#202326] border-2 border-[#181a1c] rounded-b-xl cursor-pointer flex flex-col justify-center items-center shadow-xl select-none z-10"
                >
                  {/* Textures lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_12px] rounded-b-xl pointer-events-none opacity-30" />

                  {/* Click indicator badge */}
                  {!drawerOpen && (
                    <div className="absolute top-4 pointer-events-none">
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#dfb76c] bg-[#1e2226]/90 border border-[#dfb76c]/30 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                        Pull to Open
                      </span>
                    </div>
                  )}

                  {/* Wide Horizontal Pull Handle - Brushed Gold */}
                  <div className="w-32 h-3 bg-gradient-to-r from-[#dfb76c] via-[#c59b27] to-[#dfb76c] border border-[#e5c386]/30 rounded-full shadow-md mt-6" />
                </motion.div>

                {/* Hotspot pointing to Drawer Channels (positioned directly on the exposed side runner) */}
                {drawerOpen && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => selectProduct("drawer-channel")}
                    className="absolute -right-6 top-6 z-35 w-9 h-9 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Info className="w-4.5 h-4.5 animate-pulse" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Tap Guide Overlay */}
            <div className="mt-8 flex flex-col items-center gap-1.5 text-center text-xs font-sans font-semibold text-secondary/60">
              <p className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Hand className="w-3.5 h-3.5 text-primary" />
                Tap cabinet segments
              </p>
              <p className="text-[11px] text-text-custom/50 font-normal">
                Click Door to inspect Hinges. Click Drawer to inspect Channels.
              </p>
            </div>
          </div>

          {/* Right Column: B2B Specifications & 360 Product Inspection (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-lightgray border border-border-custom p-8 rounded-[32px] flex flex-col gap-6"
                >
                  {/* Header metadata */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-2xl font-heading font-extrabold text-secondary tracking-wide leading-snug">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  {/* 360 Rotation View Card */}
                  <div
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    className="relative aspect-video max-h-[250px] bg-secondary rounded-[24px] overflow-hidden flex items-center justify-center p-6 border border-white/10 cursor-grab active:cursor-grabbing select-none"
                  >
                    {/* Background grid */}
                    <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

                    <Image
                      src={selectedProduct.images[imageIndex]}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain p-4 transition-all pointer-events-none"
                      priority
                    />

                    {/* 360 Icon indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-[9px] font-sans font-bold uppercase tracking-widest text-white/60 pointer-events-none">
                      <Hand className="w-3 h-3 text-primary animate-bounce" />
                      <span>Drag left / right to rotate</span>
                    </div>

                    {/* Image indicator count dots */}
                    <div className="absolute right-4 top-4 flex gap-1.5 bg-black/30 backdrop-blur-sm p-1.5 rounded-full">
                      {selectedProduct.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${imageIndex === idx ? "bg-primary scale-110" : "bg-white/30"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pricing / Details */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-sans font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Price on Request
                    </span>
                    <span className="text-[10px] font-sans font-bold bg-secondary/5 text-secondary px-2.5 py-1 rounded-full uppercase tracking-wider">
                      B2B Only
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-text-custom/75 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Specifications snippet */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border-custom">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-border-custom"
                      >
                        <span className="text-[11px] font-sans font-bold text-secondary/60">
                          {key}
                        </span>
                        <span className="text-[11px] font-sans font-bold text-secondary text-right">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <a
                    href={getWhatsAppLink(selectedProduct)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg active:scale-97 text-center cursor-pointer mt-2"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    ENQUIRE ABOUT THIS PRODUCT
                  </a>

                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 bg-lightgray rounded-[32px] border border-border-custom border-dashed min-h-[400px]"
                >
                  <Sparkles className="w-10 h-10 text-primary mb-4 animate-pulse" />
                  <h3 className="text-lg font-heading font-extrabold text-secondary tracking-wide">
                    Inspect Internal Hardware
                  </h3>
                  <p className="text-xs font-sans text-text-custom/50 max-w-sm mt-1 leading-relaxed">
                    Tap the wooden cabinet parts to open doors and draw them out. You will see detailed hotspots pointing to internal hardware assemblies.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
