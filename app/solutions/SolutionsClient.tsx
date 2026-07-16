"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Home, Briefcase, Hotel, ArrowUpRight, HelpCircle, Hammer } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Categories from "@/sections/Categories";
import Reveal, { RevealStagger } from "@/components/Reveal";

const solutionsList = [
  {
    icon: Home,
    title: "Residential Interiors",
    tagline: "Designed for elegant living spaces",
    desc: "Transform your home with our curated hardware and premium wood collection. From silent-closing kitchen cabinets using our hydraulic hinges to custom teak wood veneer doors that make a grand statement.",
    benefits: ["Soft-Close Quiet Mechanisms", "Eco-friendly, Non-toxic Materials", "Premium Visual Finishes"],
    image: "/hero_interior.png",
  },
  {
    icon: Briefcase,
    title: "Commercial & Office Spaces",
    tagline: "Engineered for high durability and utility",
    desc: "Architectural-grade products crafted to withstand high traffic. Our cold-rolled steel sliding drawer channels and heavy-duty mortise locks guarantee durability and smooth functionality for office fit-outs.",
    benefits: ["High Load-Bearing Capacity", "Commercial Lock Standards", "Long-lasting Performance"],
    image: "/modular_cat.png",
  },
  {
    icon: Hotel,
    title: "Hospitality & Retail Projects",
    tagline: "Luxury finishes that leave a lasting impression",
    desc: "Bespoke design solutions tailored for luxury hotels, premium resorts, and designer retail stores. We provide high-end custom solid brass door pulls and decorative veneers that define luxury.",
    benefits: ["Custom Solid-Brass Hardware", "Architectural Certifications", "Dedicated Dedicated Project Support"],
    image: "/veneer_cat.png",
  },
];

export default function SolutionsClient() {
  const getWhatsAppSolutionLink = (solutionName: string) => {
    const text = `Hi NARVO Textile & Hardware, I am interested in your B2B "${solutionName}" Solutions. Please share brochures, pricing structures, and sample catalogs.`;
    return `https://wa.me/918875341190?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Subtle Accent Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Top Banner Space */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-secondary/5 to-transparent overflow-hidden">
        {/* Luxury Glow Blurs */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-0 top-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50 mb-8">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="text-secondary font-semibold">Solutions</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary"
            >
              Tailored Integrations
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight"
            >
              Luxury Architectural & Space Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base font-sans text-text-custom/60 leading-relaxed"
            >
              From premium cabinet fittings to state-of-the-art designer entryways, we partner with builders, architects, and homeowners to deliver top-tier engineering and craftsmanship.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Categories Section */}
      <Categories />

      {/* Solution Verticals Details */}
      <section className="py-24 bg-lightgray px-6 md:px-12 lg:px-24 border-t border-b border-border-custom relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-2.5 inline-block">
              Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
              Sectors We Serve
            </h2>
            <p className="text-sm md:text-base text-text-custom/60 mt-3 font-sans">
              Discover how we implement custom hardware and interior solutions across diverse property types.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {solutionsList.map((sol, idx) => {
              const Icon = sol.icon;
              const isEven = idx % 2 === 0;

              return (
                <Reveal key={sol.title} yOffset={40} delay={0.1}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    
                    {/* Visual Card (col-span-5) */}
                    <div className={`lg:col-span-5 relative h-[300px] sm:h-[400px] rounded-[32px] overflow-hidden shadow-2xl ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <Image
                        src={sol.image}
                        alt={sol.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-sans font-bold tracking-wide uppercase">
                          {sol.title}
                        </span>
                      </div>
                    </div>

                    {/* Content Column (col-span-7) */}
                    <div className={`lg:col-span-7 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-sans font-bold text-primary uppercase tracking-widest">
                          {sol.tagline}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary tracking-wide">
                          {sol.title}
                        </h3>
                      </div>

                      <p className="text-sm font-sans text-text-custom/70 leading-relaxed">
                        {sol.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
                        {sol.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-sans font-semibold text-secondary">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border-custom">
                        <a
                          href={getWhatsAppSolutionLink(sol.title)}
                          target="_blank"
                          rel="noreferrer"
                          className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 text-center cursor-pointer"
                        >
                          <FaWhatsapp className="w-4.5 h-4.5" />
                          DISCUSS PROJECT
                        </a>
                        <Link
                          href="/contact"
                          className="group py-3.5 px-6 border border-secondary hover:border-primary hover:bg-primary/5 text-secondary hover:text-primary text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 text-center"
                        >
                          CONTACT US
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-secondary tracking-tight">
            Need a Bespoke Solution?
          </h2>
          <p className="text-sm sm:text-base font-sans text-text-custom/60 max-w-xl leading-relaxed">
            Our architectural team can help you source specialized materials, configure structural panels, and arrange custom lock setups for your unique layout.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-primary hover:bg-[#b57a22] text-white text-sm font-sans font-bold tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center gap-2"
          >
            Consult With Our Team
            <ArrowUpRight className="w-4.5 h-4.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
