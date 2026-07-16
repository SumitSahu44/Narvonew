"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Calendar, CheckSquare, Award, Compass, Sparkles, MapPin, Eye, Leaf, ArrowUpRight } from "lucide-react";
import Process from "@/sections/Process";
import Reveal, { RevealStagger } from "@/components/Reveal";

// CountUp Helper Component
function CountUp({ target, duration = 1.5, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

const stats = [
  {
    icon: ShieldCheck,
    title: "Premium Materials",
    desc: "Sourced from the best materials in the industry.",
    targetNum: 100,
    suffix: "%",
    subtext: "Premium Quality"
  },
  {
    icon: Calendar,
    title: "Innovative Design",
    desc: "Stylish solutions designed for luxury and ergonomics.",
    targetNum: 25,
    suffix: "+",
    subtext: "Years of Trust"
  },
  {
    icon: CheckSquare,
    title: "Sustainable Future",
    desc: "Eco-friendly practices and processes for a greener tomorrow.",
    targetNum: 10000,
    suffix: "+",
    subtext: "Projects Delivered"
  },
  {
    icon: Award,
    title: "Pan India Presence",
    desc: "Reliable dealer network with over 100+ stores nationwide.",
    targetNum: 500,
    suffix: "+",
    subtext: "Dealers Network"
  }
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Top Banner Space */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/5 to-transparent overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Luxury Glow Blurs */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-0 top-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50 mb-8">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="text-secondary font-semibold">About Us</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary"
            >
              Our Heritage
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight"
            >
              About NARVO Textile & Hardware
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base font-sans text-text-custom/60 leading-relaxed"
            >
              Founded on the values of premium engineering, design elegance, and environmental integrity, NARVO is a leading brand in luxury architectural hardware, custom doors, wood veneers, and home textiles.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Corporate Profile Details */}
      <section className="py-24 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Beautiful brand image placeholder/graphic */}
            <Reveal yOffset={30} delay={0.1}>
              <div className="relative h-[320px] sm:h-[450px] rounded-[36px] overflow-hidden shadow-2xl bg-secondary">
                <Image
                  src="/hero_interior.png"
                  alt="Narvo Premium Craftsmanship"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/50 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white max-w-sm flex flex-col gap-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">
                    Since 2001
                  </span>
                  <h3 className="text-xl font-heading font-bold leading-tight">
                    Crafting spaces that inspire.
                  </h3>
                </div>
              </div>
            </Reveal>

            {/* Right: Company details */}
            <div className="flex flex-col gap-6">
              <Reveal yOffset={20} delay={0.2}>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary">
                  The Journey
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary tracking-wide mt-2">
                  Heritage of Luxury & Architectural Precision
                </h2>
              </Reveal>

              <Reveal yOffset={15} delay={0.3}>
                <p className="text-sm font-sans text-text-custom/70 leading-relaxed">
                  NARVO has built its reputation as a reliable partner for top-tier architects, designers, and homebuilders. Over the last two decades, we have expanded from supplying hardware elements to offering fully integrated modular solutions. We take pride in handling the complete journey of timber to designer board, ensuring rigorous quality checks.
                </p>
                <p className="text-sm font-sans text-text-custom/70 leading-relaxed mt-4">
                  Our products are engineered with the finest materials like solid brass, premium-grade steel, and highly durable veneers. Every hinges, drawer channel, and lockset undergoes strict performance testing to verify lifecycle longevity.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Reveal yOffset={15} delay={0.4}>
                  <div className="p-5 border border-border-custom bg-lightgray rounded-2xl">
                    <h4 className="font-heading font-bold text-secondary text-base">Our Mission</h4>
                    <p className="text-xs font-sans text-text-custom/60 mt-1.5 leading-relaxed">
                      To empower designers and homeowners with superior hardware and textile products that blend performance, longevity, and aesthetics.
                    </p>
                  </div>
                </Reveal>
                <Reveal yOffset={15} delay={0.45}>
                  <div className="p-5 border border-border-custom bg-lightgray rounded-2xl">
                    <h4 className="font-heading font-bold text-secondary text-base">Our Vision</h4>
                    <p className="text-xs font-sans text-text-custom/60 mt-1.5 leading-relaxed">
                      To become the leading pan-India standard for premium architectural fittings and sustainable designer interior materials.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Counters Stats Row (Why Choose Narvo layout) */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-2.5 inline-block">
              Key Indicators
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              NARVO by the Numbers
            </h2>
            <p className="text-sm md:text-base text-white/60 mt-3 font-sans">
              Our growth and accomplishments are a direct reflection of our customers' trust and our operational standards.
            </p>
          </div>

          <RevealStagger delay={0.1} staggerChildren={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85 } }
                    }}
                    className="group relative glass-panel-dark p-8 rounded-[24px] border border-white/5 shadow-xl hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[260px]"
                  >
                    <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-xs font-sans text-white/50 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex flex-col gap-1">
                      <div className="text-4xl font-heading font-extrabold text-primary tracking-tight">
                        <CountUp target={card.targetNum} suffix={card.suffix} />
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/40">
                        {card.subtext}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Methodology & Process timeline steps */}
      <Process />

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 bg-lightgray px-6 md:px-12 lg:px-24 border-t border-b border-border-custom relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Details */}
            <div className="flex flex-col gap-6">
              <Reveal yOffset={20} delay={0.1}>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" />
                  Green Choice
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary tracking-wide mt-2">
                  Committed to a Sustainable Future
                </h2>
              </Reveal>

              <Reveal yOffset={15} delay={0.2}>
                <p className="text-sm font-sans text-text-custom/70 leading-relaxed">
                  We believe that luxury should not cost our planet. All NARVO timber products, veneers, and boards are sourced from sustainably managed forests that adhere to strict reforestation policies.
                </p>
                <p className="text-sm font-sans text-text-custom/70 leading-relaxed mt-4">
                  Additionally, our plywood materials are certified E0/E1 formaldehyde emission-free, creating healthier indoor environments for homes, children, and workspaces. We align our chemical electroplating processes for solid-brass hardware with clean industrial water treatment benchmarks.
                </p>
              </Reveal>

              <div className="flex flex-col gap-3.5 mt-2">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs sm:text-sm font-sans font-bold text-secondary">
                    FSC Certified Raw Timber Supplies
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs sm:text-sm font-sans font-bold text-secondary">
                    E0 Grade Low-Formaldehyde Emissions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs sm:text-sm font-sans font-bold text-secondary">
                    Eco-Conscious Brass Electroplating
                  </span>
                </div>
              </div>
            </div>

            {/* Visual illustration (sustainability image) */}
            <Reveal yOffset={30} delay={0.3}>
              <div className="relative h-[300px] sm:h-[400px] rounded-[36px] overflow-hidden shadow-2xl bg-secondary">
                <Image
                  src="/door_cat.png"
                  alt="Sustainable Timber Sourcing"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Stores and Network Section */}
      <section id="stores" className="py-24 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Map/Store Details (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal yOffset={20} delay={0.1}>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary">
                  Network
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary tracking-wide mt-2">
                  Our Showroom & Stores
                </h2>
                <p className="text-sm font-sans text-text-custom/70 leading-relaxed mt-4">
                  Experience NARVO's craftsmanship in person. Visit our flagship showroom in Jaipur, Rajasthan, or locate our products across our dealer network.
                </p>
              </Reveal>

              <div className="flex flex-col gap-4 border-t border-border-custom pt-6 mt-2 font-sans text-sm text-text-custom/70 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-secondary mb-0.5">Flagship Showroom</p>
                    <p>A-1, Basement, Triveni Nagar Mod,</p>
                    <p>Gopalpura Bypass, Jaipur, Rajasthan - 302018</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300 group"
                >
                  Schedule Showroom Appointment
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right: Map Iframe (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <Reveal yOffset={30} delay={0.25}>
                <div className="w-full rounded-[32px] overflow-hidden border border-border-custom shadow-xl bg-lightgray aspect-video h-[300px] sm:h-[400px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2961.3006852964804!2d75.78214057543791!3d26.867862976673937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzA0LjMiTiA3NcKwNDcnMDUuMCJF!5e1!3m2!1sen!2sin!4v1783865193826!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    title="NARVO Showroom Location Map"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
