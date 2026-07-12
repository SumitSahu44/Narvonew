"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function CtaBanner() {
  return (
    <section id="contact" className="relative py-20 bg-white overflow-hidden px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal yOffset={35} delay={0.1}>
          <div className="relative w-full rounded-[32px] overflow-hidden bg-gradient-to-r from-black to-[#111111] p-10 md:p-16 border border-white/5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 group">
            {/* Background Texture/Grid */}
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
            
            {/* Luxury Gold Glow Blurs */}
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />

            {/* Typography */}
            <div className="relative z-10 flex flex-col max-w-xl">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-primary mb-3">
                Let's Collaborate
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-[1.15]">
                Ready to bring your <br />
                vision to life?
              </h2>
              <p className="text-sm font-sans text-white/50 mt-4 leading-relaxed">
                Connect with our product and design experts to get personalized premium hardware recommendations and custom quotes.
              </p>
            </div>

            {/* Magnetic CTA Button */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-start md:justify-end">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group px-8 py-5 bg-primary hover:bg-[#b57a22] text-white text-sm font-sans font-bold tracking-widest rounded-full shadow-gold-glow flex items-center gap-3 transition-all duration-300 transform active:scale-95"
                >
                  LET'S CONNECT
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
