"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Layers, Leaf, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Reveal, { RevealStagger } from "@/components/Reveal";

const categories = [
  {
    name: "Plywood & Board",
    image: "/plywood_cat.png",
    href: "#products",
  },
  {
    name: "Doors",
    image: "/door_cat.png",
    href: "#products",
  },
  {
    name: "Hardware",
    image: "/hardware_cat.png",
    href: "#products",
  },
  {
    name: "Decorative Veneers",
    image: "/veneer_cat.png",
    href: "#products",
  },
  {
    name: "Modular Solutions",
    image: "/modular_cat.png",
    href: "#products",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Trusted by Experts",
  },
  {
    icon: Layers,
    title: "Wide Range",
    desc: "Everything You Need",
  },
  {
    icon: Leaf,
    title: "Sustainable Choice",
    desc: "For a Better Tomorrow",
  },
  {
    icon: HeartHandshake,
    title: "Expert Support",
    desc: "We're Here to Help",
  },
];

export default function Categories() {
  return (
    <section id="solutions" className="relative py-24 bg-white overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Section Index "01" */}
      <div className="absolute left-6 top-10 text-[12rem] md:text-[16rem] font-heading font-extrabold text-[#F8F8F8] select-none pointer-events-none leading-none z-0">
        01
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <Reveal yOffset={20} delay={0.1}>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-2.5 inline-block">
                Solutions
              </span>
            </Reveal>
            <Reveal yOffset={25} delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
                Design your interiors
              </h2>
            </Reveal>
            <Reveal yOffset={20} delay={0.3}>
              <p className="text-sm md:text-base text-text-custom/70 mt-3 font-sans">
                Explore our wide range of products and create spaces that inspire.
              </p>
            </Reveal>
          </div>

          <Reveal yOffset={15} delay={0.4}>
            <Link
              href="#products"
              className="group inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
            >
              View all categories
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Categories Horizontal Grid */}
        <RevealStagger delay={0.1} staggerChildren={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
                }}
                className="group relative h-[380px] md:h-[420px] rounded-[24px] overflow-hidden shadow-md cursor-pointer"
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 bg-secondary">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:brightness-95"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10 transition-opacity duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/80 mb-2">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-heading font-bold leading-tight tracking-wide mb-5">
                    {cat.name}
                  </h3>

                  {/* Circular Hover Arrow Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 group-hover:text-white transition-colors duration-300">
                      Explore More
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-secondary transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealStagger>

        {/* Bottom Trust Features Row */}
        <Reveal yOffset={30} delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-border-custom">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex items-center gap-4 p-4 hover:bg-[#F8F8F8] rounded-2xl transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-sans font-bold text-secondary">
                      {feat.title}
                    </span>
                    <span className="text-xs font-sans text-text-custom/60 mt-0.5">
                      {feat.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
