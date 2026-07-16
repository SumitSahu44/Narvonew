"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function About() {
  return (
    <section id="about-intro" className="relative py-24 bg-white overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Subtle Accent Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      
      {/* Decorative Index "01" */}
      <div className="absolute left-6 top-10 text-[12rem] md:text-[16rem] font-heading font-extrabold text-[#F8F8F8] select-none pointer-events-none leading-none z-0">
        01
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Showcase Image */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[420px] rounded-[32px] overflow-hidden shadow-2xl bg-secondary">
            <Image
              src="/hero_interior.png"
              alt="NARVO Premium Interior Concept"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/50 to-transparent" />
          </div>

          {/* Right Column: Narrative Block */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <Reveal yOffset={20} delay={0.1}>
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                Our Heritage
              </span>
            </Reveal>

            <Reveal yOffset={25} delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
                Crafting Luxury & Precision for Elegant Interiors
              </h2>
            </Reveal>

            <Reveal yOffset={20} delay={0.3}>
              <p className="text-sm sm:text-base font-sans text-text-custom/75 leading-relaxed">
                Founded on the values of premium engineering, design elegance, and environmental integrity, NARVO is a leading brand in luxury architectural hardware, custom doors, wood veneers, and home textiles. We empower architects, builders, and designers with top-tier materials that define the modern standard of living.
              </p>
            </Reveal>

            <Reveal yOffset={15} delay={0.4}>
              <Magnetic>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-secondary text-white text-xs font-sans font-bold uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-primary shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
                >
                  View More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
