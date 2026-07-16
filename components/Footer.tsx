"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Magnetic from "./Magnetic";

const footerLinks = {
  products: [
    { name: "Plywood & Board", href: "/products" },
    { name: "Hardware", href: "/products" },
  ],
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/solutions" },
    { name: "Inspiration", href: "/inspiration" },
    { name: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary text-white pt-24 pb-10 border-t border-white/5 overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Subtle mesh glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(199,139,43,0.06),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Columns Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pb-16">
          {/* Column 1: Brand & Logo (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-56 transition-transform duration-300 hover:scale-103">
                <Image
                  src="/narvo-transparent.png"
                  alt="NARVO Textile & Hardware"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm font-sans leading-relaxed">
              Delivering premium textile and hardware solutions that blend quality, design, and sustainability for luxury spaces.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-secondary hover:bg-primary hover:border-primary transition-all duration-300 transform hover:-y-1"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2: Links (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start gap-12">
            {/* Quick Links Sub-grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Products */}
              <div className="flex flex-col gap-5">
                <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-white/95">
                  Products
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {footerLinks.products.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-sans text-white/50 hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-5">
                <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-white/95">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {footerLinks.quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-sans text-white/50 hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Address details on far right (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-white/95">
              Contact Details
            </h4>
            <div className="flex flex-col gap-5 font-sans text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Address</p>
                  <p>A-1, Basement, Triveni Nagar Mod,</p>
                  <p>Gopalpura Bypass, Jaipur,</p>
                  <p>Rajasthan - 302018</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Phone</p>
                  <a href="tel:+918875341190" className="hover:text-primary transition-colors font-medium">
                    +91 8875341190
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider and Copyright Area */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-sans text-white/40">
            © 2026 Narvo Premium Hardware. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs font-sans text-white/40 flex items-center gap-1.5">
              Made with <span className="text-primary font-bold">♥</span> for better living.
            </p>
            {/* Back to Top */}
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="p-3 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary rounded-full transition-all duration-300 text-white"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
