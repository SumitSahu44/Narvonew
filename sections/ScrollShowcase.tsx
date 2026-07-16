"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Settings, Wrench, Shield, Info, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface SlideData {
  num: string;
  icon: React.ComponentType<any>;
  tag: string;
  title: string;
  desc: string;
}

const slides: SlideData[] = [
  {
    num: "00",
    icon: Info,
    tag: "Engineering Teardown",
    title: "Scroll to Disassemble",
    desc: "Experience NARVO's master engineering. Scroll down to watch the cabinet door swing open in 3D and inspect the inner soft-close hinge assembly.",
  },
  {
    num: "01",
    icon: Settings,
    tag: "01. Hydraulic Cylinder",
    title: "Silent Dampening",
    desc: "Equipped with premium fluid-damper cylinders. Provides an ultra-smooth, slow close rate at 15 degrees, eliminating cabinet slamming completely. Tested for over 100,000 continuous open-close cycles.",
  },
  {
    num: "02",
    icon: Wrench,
    tag: "02. 4-Hole Base Plate",
    title: "Architectural Stability",
    desc: "Standard cabinet fittings use loose 2-hole plates. We engineer our hinges with heavy-duty 4-hole plates to guarantee zero sagging, even on extra-thick luxury wooden cabinet doors.",
  },
  {
    num: "03",
    icon: Shield,
    tag: "Get B2B Sample",
    title: "Test the Quality in Person",
    desc: "Verify the solid-steel weight, hydraulic feedback, and clip-on mounting plates before placing bulk wholesale orders.",
  }
];

export default function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Track scroll progress of the scroll-track container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Safe State Listener to update active slide to prevent text overlaps
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.2) {
        setActiveSlide(0);
      } else if (latest < 0.5) {
        setActiveSlide(1);
      } else if (latest < 0.8) {
        setActiveSlide(2);
      } else {
        setActiveSlide(3);
      }
    });
  }, [scrollYProgress]);

  // 3D Cabinet Door RotateY transform (swings open from 0 to -115 degrees)
  const doorRotateY = useTransform(
    scrollYProgress,
    [0.1, 0.65],
    [0, -115]
  );

  // Hinge scale-up/highlight transform as door opens
  const hingeScale = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [0.85, 1.05, 1.05, 0.95]
  );

  const getWhatsAppMessageLink = () => {
    const text = "Hi NARVO, I just experienced the scrolling teardown of your Slimline Hydraulic Hinges. I would like to order a wholesale sample batch to test in our luxury villa project.";
    return `https://wa.me/918875341190?text=${encodeURIComponent(text)}`;
  };

  const ActiveIcon = slides[activeSlide].icon;

  return (
    <div ref={containerRef} className="relative h-[320vh] bg-[#111111] overflow-visible">
      {/* Sticky viewport content box */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-24 pt-[70px] lg:pt-0 pb-4 lg:pb-0">
        
        {/* Background grids */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full h-[calc(100vh-110px)] lg:h-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-8 z-10 relative">
          
          {/* LEFT SIDE: Dynamic Text Overlays (Preventing Overlaps) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center h-auto min-h-[110px] sm:min-h-[150px] lg:h-[400px] relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-start gap-2.5 sm:gap-4 text-white"
              >
                <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                  <ActiveIcon className="w-4 h-4 text-primary" />
                  {slides[activeSlide].tag}
                </span>
                
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-5xl font-heading font-extrabold tracking-tight leading-[1.15]">
                  {slides[activeSlide].title}
                </h3>
                
                <p className="text-[11px] xs:text-xs lg:text-sm font-sans text-white/50 leading-relaxed max-w-md">
                  {slides[activeSlide].desc}
                </p>

                {activeSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="pt-2 pointer-events-auto"
                  >
                    <a
                      href={getWhatsAppMessageLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-5 sm:py-3.5 sm:px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] sm:text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 text-center cursor-pointer"
                    >
                      <FaWhatsapp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      GET A FREE SAMPLE BATCH
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Scroll Indicator dots */}
            <div className="absolute -bottom-6 left-0 flex gap-2">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-350 ${
                    activeSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: 3D Perspective Cabinet Door Swing */}
          <div className="w-full lg:w-[50%] flex items-center justify-center relative z-10 py-2 sm:py-6">
            
            {/* Viewport guide circles */}
            <div className="absolute w-[180px] h-[180px] sm:w-[360px] sm:h-[360px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute w-[260px] h-[260px] sm:w-[500px] sm:h-[500px] border border-white/5 rounded-full pointer-events-none opacity-50" />

            {/* 3D Container viewport */}
            <div className="relative w-[150px] h-[190px] xs:w-[170px] xs:h-[210px] sm:w-[280px] sm:h-[360px] bg-[#16120e] rounded-2xl border-4 border-[#2b211a] shadow-2xl overflow-visible flex items-center justify-center perspective-[1200px]">
              
              {/* Internal Cabinet Wall (Revealed when door swings open) */}
              <div className="absolute inset-0 bg-[#241c15] rounded-xl overflow-hidden z-0">
                {/* Wood Grain Vector texture overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[size:100%_10px] opacity-40" />
                
                {/* 3D Hinge Asset Mounted Inside */}
                <motion.div
                  style={{ scale: hingeScale }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(199,139,43,0.22),transparent_70%)]" />
                  <Image
                    src="/products/1/slimline-clip-showcase.png"
                    alt="Slimline Clip Hinge Mounted"
                    fill
                    className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </motion.div>

                {/* Hotspot overlays synced with active slide */}
                <AnimatePresence>
                  {activeSlide === 1 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-[35%] left-[60%] z-20 bg-primary border-2 border-white px-2.5 py-1 rounded-full text-[9px] font-sans font-bold text-white shadow-xl flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Hydraulic Cylinder
                    </motion.div>
                  )}

                  {activeSlide === 2 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute bottom-[30%] left-[25%] z-20 bg-primary border-2 border-white px-2.5 py-1 rounded-full text-[9px] font-sans font-bold text-white shadow-xl flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      4-Hole Plate
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CABINET DOOR (Front panel swinging open on scroll) */}
              <motion.div
                style={{
                  rotateY: doorRotateY,
                  originX: 0, // Pivot along the left edge
                }}
                className="absolute inset-0 bg-[#463528] rounded-xl border border-[#2b211a] shadow-2xl z-10 flex items-center justify-end pr-4 preserve-3d"
              >
                {/* Door Veneer Wood Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:100%_8px] rounded-xl opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10 rounded-xl" />

                {/* Solid Brass Pull Handle */}
                <div className="w-3.5 h-12 bg-gradient-to-r from-[#ffd34d] via-primary to-[#8c5e15] border border-primary/20 rounded-md shadow-lg" />
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
