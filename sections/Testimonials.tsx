"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    name: "Priya Sen",
    role: "Lead Architect, Studio Form",
    quote: "NARVO's hardware solutions completely redefined the entryways of our premium seaside villa project. The solid-brass tactile feel and precise engineering are unmatched.",
    stars: 5,
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Sanjay Malhotra",
    role: "Principal Designer, Malhotra & Co",
    quote: "We specify NARVO for all our luxury projects. From magnetic locks to premium veneers, the detailing and structural craftsmanship are exemplary and highly recommended.",
    stars: 5,
    location: "New Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Kabir Mehta",
    role: "Interior Designer, Atelier Mehta",
    quote: "Their modular fittings and drawer slides are absolute works of art. Seamless movement, silent closes, and incredible aesthetic elegance. A game-changer for high-end kitchens.",
    stars: 5,
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 bg-lightgray overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Quote className="w-6 h-6 fill-primary" />
          </div>
        </div>

        {/* Carousel Content */}
        <div className="min-h-[250px] flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6 text-primary">
                {[...Array(testimonials[active].stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl sm:text-2xl font-heading font-semibold text-secondary leading-relaxed tracking-wide mb-8 italic">
                "{testimonials[active].quote}"
              </p>

              {/* Author Metadata */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg mb-4">
                  <img
                    src={testimonials[active].avatar}
                    alt={testimonials[active].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-sans font-bold text-secondary">
                  {testimonials[active].name}
                </span>
                <span className="text-xs font-sans text-text-custom/50 mt-1">
                  {testimonials[active].role} • {testimonials[active].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-border-custom hover:border-primary hover:bg-white flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 transform active:scale-95 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Slide Indicator Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === idx ? "w-6 bg-primary" : "bg-secondary/20"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-border-custom hover:border-primary hover:bg-white flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 transform active:scale-95 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
