"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Leaf, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import HardwareVisualizer3D from "@/components/HardwareVisualizer3D";

export default function Hero() {
  const [treeCount, setTreeCount] = useState(90000185);

  // Spring animations for high-performance mouse-tracking parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  // Mouse transforms using useTransform to avoid TypeErrors
  const rotateX = useTransform(springY, (y) => y * 16);
  const rotateY = useTransform(springX, (x) => x * 16);

  const ambientX = useTransform(springX, (x) => x * 120);
  const ambientY = useTransform(springY, (y) => y * 120);

  const leftX = useTransform(springX, (x) => x * -20);
  const leftY = useTransform(springY, (y) => y * -20);

  const rightRotateX = useTransform(springY, (y) => y * -20);
  const rightRotateY = useTransform(springX, (x) => x * 20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTreeCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate values between -0.5 and 0.5
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const formattedCount = treeCount.toString();

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-between bg-[#080808] overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-24 perspective-[1600px]"
    >
      {/* 3D Grid mesh overlay reacting to mouse movement */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ: -80,
        }}
        className="absolute inset-0 z-0 grid-bg opacity-[0.15] pointer-events-none transform scale-110"
      />

      {/* Luxury lighting glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,139,43,0.05)_0%,transparent_60%)] pointer-events-none z-0" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating ambient lighting bubble following the mouse spring */}
      <motion.div
        style={{
          x: ambientX,
          y: ambientY,
        }}
        className="absolute top-[20%] left-[55%] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(199,139,43,0.08),transparent_65%)] rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Hero Content Wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: Typography Block with Parallax offset */}
        <motion.div
          style={{
            x: leftX,
            y: leftY,
          }}
          className="lg:col-span-7 flex flex-col items-start text-white"
        >
          <Reveal yOffset={25} delay={0.2} blur>
            <span className="text-[11px] md:text-xs font-sans font-bold uppercase tracking-[0.3em] text-primary mb-5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              NARVO TEXTILE & HARDWARE
            </span>
          </Reveal>

          <Reveal yOffset={35} delay={0.35} blur>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.08] font-heading font-extrabold tracking-tight mb-6">
              Designed for <br />
              Every <span className="bg-gradient-to-r from-primary via-[#ffd58c] to-primary bg-clip-text text-transparent italic font-serif font-light">Detail.</span>
            </h1>
          </Reveal>

          <Reveal yOffset={30} delay={0.5} blur>
            <p className="text-base sm:text-lg text-white/70 max-w-lg leading-relaxed font-sans mb-10">
              Elevate your spaces with our handcrafted collection of luxury door handles, smart biometrics locks, silent cabinet fittings, and premium textiles.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal yOffset={20} delay={0.65} blur={false}>
            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <Link
                  href="#products"
                  className="group px-7 py-4 bg-primary hover:bg-[#b57a22] text-white text-sm font-sans font-semibold tracking-wider rounded-full shadow-gold-glow flex items-center gap-3 transition-all duration-300 transform active:scale-95"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#stores"
                  className="px-7 py-4 border border-white/20 hover:border-primary/60 hover:bg-white/5 text-white text-sm font-sans font-semibold tracking-wider rounded-full flex items-center gap-3 transition-all duration-300 transform active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  Find a Store
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* Slide Indicator */}
          <div className="mt-16 flex items-center gap-4 text-xs font-sans font-bold tracking-widest text-white/40">
            <span className="text-primary">01</span>
            <span className="w-16 h-[1px] bg-white/20 relative">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-primary" />
            </span>
            <span>03</span>
          </div>
        </motion.div>

        {/* Right Column: 3D Studio Stage with Parallax tilt */}
        <motion.div
          style={{
            rotateX: rightRotateX,
            rotateY: rightRotateY,
            z: 50,
          }}
          className="lg:col-span-5 flex flex-col gap-6 items-center lg:items-end justify-center w-full transform-style-3d preserve-3d"
        >
          {/* Glassmorphic Showcase Stage Ring */}
          <div className="relative w-[320px] xs:w-[350px] sm:w-[380px] h-[340px] sm:h-[380px] flex items-center justify-center rounded-[32px] overflow-visible bg-gradient-to-tr from-white/[0.01] to-white/[0.03] p-1 border border-white/5 shadow-2xl preserve-3d group">
            {/* Shimmering rim reflection */}
            <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
            
            {/* Glow spotlight behind Visualizer */}
            <div className="absolute top-[25%] left-[25%] right-[25%] bottom-[25%] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            
            <HardwareVisualizer3D />
          </div>

          {/* Compact Ticking Eco Counter widget */}
          <Reveal yOffset={30} delay={0.9}>
            <div className="glass-panel-dark p-4 rounded-[20px] max-w-[380px] w-[320px] xs:w-[350px] sm:w-[380px] border border-white/10 shadow-lg flex flex-col relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-20 h-20 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-700" />
              
              <div className="flex items-center gap-2 text-[9px] font-sans font-bold uppercase tracking-widest text-white/50 mb-3">
                <Leaf className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>Trees Planted Till Date</span>
              </div>

              {/* Ticking number widget */}
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-center xs:justify-start gap-1 mb-3">
                {formattedCount.split("").map((digit, index) => {
                  const isHighlight = index >= formattedCount.length - 3;
                  return (
                    <motion.span
                      key={index}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.03 }}
                      className={`text-sm xs:text-base font-heading font-extrabold px-1.5 py-1 rounded-md ${
                        isHighlight
                          ? "bg-primary text-white"
                          : "bg-white/5 text-white/95 border border-white/5"
                      }`}
                    >
                      {digit}
                    </motion.span>
                  );
                })}
              </div>

              {/* Progress Slider */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2 relative">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-[#b57a22] rounded-full"
                />
              </div>

              <p className="text-[10px] text-white/40 font-sans leading-relaxed">
                Every hardware purchase helps restore forests.
              </p>
            </div>
          </Reveal>
        </motion.div>

      </div>
    </section>
  );
}
