"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Grid, Sparkles, Filter } from "lucide-react";
import Reveal, { RevealStagger } from "@/components/Reveal";

const categories = ["All", "Minimalist", "Modern", "Luxury", "Wooden"];

const galleryItems = [
  {
    title: "Minimalist Home",
    desc: "Clean lines and warm tones create a perfect balance.",
    image: "/hero_interior.png",
    category: "Minimalist",
  },
  {
    title: "Modern Office",
    desc: "Functional spaces that inspire productivity and focus.",
    image: "/modular_cat.png",
    category: "Modern",
  },
  {
    title: "Luxury Living",
    desc: "Sophisticated materials tailored for elegant interiors.",
    image: "/veneer_cat.png",
    category: "Luxury",
  },
  {
    title: "Wooden Wonders",
    desc: "Timeless beauty and durability of natural wood veneers.",
    image: "/door_cat.png",
    category: "Wooden",
  },
  {
    title: "Ergonomic Kitchen",
    desc: "Smart soft-close drawer storage with integrated hydraulic rails.",
    image: "/plywood_cat.png",
    category: "Modern",
  },
  {
    title: "Classic Main Entry",
    desc: "Stunning handcrafted solid-brass pivot doors for villa facades.",
    image: "/hardware_cat.png",
    category: "Luxury",
  },
  {
    title: "Scandinavian Studio",
    desc: "Airy, natural wood panels with minimal hardware interference.",
    image: "/hero_interior.png",
    category: "Minimalist",
  },
  {
    title: "Veneer Accent Walls",
    desc: "Handpicked architectural teak veneers offering premium grains.",
    image: "/veneer_cat.png",
    category: "Wooden",
  },
];

export default function InspirationClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = activeFilter === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-lightgray pt-32 pb-24 relative overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Subtle Accent Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Luxury Glow Blurs */}
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <span>/</span>
          <span className="text-secondary font-semibold">Inspiration</span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col max-w-2xl gap-3">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">
              Design Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
              Design & Style Inspiration Gallery
            </h1>
            <p className="text-sm sm:text-base font-sans text-text-custom/60 leading-relaxed">
              Explore completed real-world interior design projects using NARVO's premium hardware, veneers, and custom fittings. Let these aesthetics guide your vision.
            </p>
          </div>
        </div>

        {/* Filter Buttons Section */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 border-b border-border-custom pb-6">
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-secondary/60 flex items-center gap-1.5 mr-2.5">
            <Filter className="w-3.5 h-3.5" />
            Filter Style:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-103"
                  : "bg-white hover:bg-primary/5 text-secondary border border-border-custom"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest-style dynamic grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                key={`${item.title}-${idx}`}
                className="group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border-custom cursor-pointer"
              >
                {/* Image header with scale effect */}
                <div className="relative h-[240px] sm:h-[260px] overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-secondary text-[9px] font-sans font-bold uppercase tracking-widest rounded-full border border-border-custom shadow-sm z-10">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Text Content Box */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-4 relative bg-white">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-secondary tracking-wide mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans text-text-custom/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-sans font-bold text-primary/75 group-hover:text-primary transition-colors uppercase tracking-widest">
                      Explore Design
                    </span>
                    <div className="w-8 h-8 rounded-full bg-lightgray group-hover:bg-primary/10 flex items-center justify-center text-text-custom group-hover:text-primary transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if none found */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-border-custom rounded-3xl shadow-sm">
            <Sparkles className="w-10 h-10 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-secondary">No Designs Found</h3>
            <p className="text-xs font-sans text-text-custom/50 mt-1">We will upload more design references soon.</p>
          </div>
        )}

      </div>
    </div>
  );
}
