"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/#products" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Inspiration", href: "/#inspiration" },
  { name: "About Us", href: "/#about" },
  { name: "Contact", href: "/contact" },
];

const searchableProducts = [
  { id: "slimline-hinge", name: "Slimline Clip On Cabinet Hinges Hydraulic 4 Hole - 15 Degrees", category: "Cabinet Hardware" },
  { id: "drawer-channel", name: "Self Closing 20inch Sliding Drawer Channel", category: "Drawer Channels" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const match = searchableProducts.find(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      router.push(`/products/${match.id}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const filteredProducts = searchQuery
    ? searchableProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 bg-white/95 backdrop-blur-md border-b border-border-custom shadow-sm ${scrolled ? "py-3" : "py-4.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center">
            <div className="relative h-14 w-56 md:h-20 md:w-80 transition-transform duration-300 hover:scale-103">
              <Image
                src="/narvo-transparent.png"
                alt="NARVO Textile & Hardware"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-sans font-semibold tracking-wide text-[#222222] hover:text-primary transition-colors duration-300 hover-underline-grow"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="p-2.5 rounded-full border border-border-custom hover:border-primary/40 hover:bg-lightgray transition-all duration-300 text-secondary hover:text-primary"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Magnetic CTA Button */}
            <Magnetic>
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary hover:bg-[#b57a22] text-white text-sm font-sans font-semibold tracking-wider rounded-full shadow-gold-glow transition-all duration-300 transform active:scale-95"
              >
                Get in Touch
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full border border-border-custom text-secondary"
              aria-label="Search"
            >
              <Search className="w-[16px] h-[16px]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-border-custom text-secondary z-50 hover:bg-lightgray transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Floating Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-45 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-24 px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl flex flex-col gap-2.5"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-primary/20 shadow-2xl bg-white/95"
              >
                <Search className="text-secondary/60 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hinges, drawer channels, plywood..."
                  className="bg-transparent text-secondary placeholder-secondary/40 focus:outline-none w-full text-sm py-1 font-sans"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-secondary/40 hover:text-secondary text-xs font-semibold px-2 py-1"
                >
                  Close
                </button>
              </form>

              {/* Search Results Dropdown List */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="w-full bg-white rounded-2xl border border-border-custom shadow-2xl p-4 flex flex-col gap-1.5"
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            router.push(`/products/${prod.id}`);
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-3 rounded-xl hover:bg-lightgray flex items-center justify-between transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">
                              {prod.category}
                            </span>
                            <span className="text-sm font-sans font-semibold text-secondary leading-snug">
                              {prod.name}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-secondary/40 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                        </button>
                      ))
                    ) : (
                      <p className="text-xs text-text-custom/50 text-center py-4 font-sans">
                        No B2B products found matching your search.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-0 bg-white z-45 flex flex-col justify-between pt-32 pb-12 px-8 lg:hidden"
          >
            {/* Background glowing mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(199,139,43,0.05),transparent_45%)] pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              <p className="text-secondary/40 text-[11px] font-sans font-bold uppercase tracking-widest border-b border-border-custom pb-2">
                Navigation
              </p>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-heading font-bold tracking-wide text-secondary hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 relative z-10"
            >
              <div className="border-t border-border-custom pt-6 flex flex-col gap-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 bg-primary text-white text-center text-sm font-semibold tracking-wider rounded-full shadow-lg"
                >
                  Get in Touch
                </Link>
                <div className="flex justify-between text-xs text-secondary/60 px-2 font-medium">
                  <span>info@narvohardware.com</span>
                  <span>+91 8875341190</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
