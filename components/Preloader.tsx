"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter animation curve
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
          }, 300);
          return 100;
        }
        // Accelerate counter naturally
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    // Safety fallback to ensure preloader completes even on slow assets
    const timer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#080808] px-8 py-16 text-white select-none pointer-events-auto"
        >
          {/* Top Brand Marker */}
          <div className="flex items-center gap-2 opacity-60">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-medium">
              Architectural Luxury
            </span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center text-center my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-100 uppercase"
            >
              N A R V O
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-4 text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-200/60 font-light"
            >
              Crafting Exceptional Hardware & Interiors
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center gap-3">
            <div className="w-full h-[2px] bg-zinc-800/80 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
            
            <div className="flex justify-between w-full text-[11px] font-mono tracking-widest text-zinc-400">
              <span className="text-zinc-500 uppercase">Loading Experience</span>
              <span className="text-amber-200/90 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
