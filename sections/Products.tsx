"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowUpRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Reveal, { RevealStagger } from "@/components/Reveal";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  images: string[];
  specs: { [key: string]: string };
}

const productsData: Product[] = [
  {
    id: "slimline-hinge",
    name: "Slimline Clip On Cabinet Hinges Hydraulic 4 Hole - 15 Degrees",
    price: "₹ 320 / pair",
    category: "Cabinet Hardware",
    description: "Premium B2B wholesale soft-closing hydraulic hinges designed specifically for luxury cabinet doors. Features an advanced hydraulic mechanism for smooth closing, a 4-hole mounting pattern for maximum stability, and a 15-degree adjustment angle.",
    images: [
      "/products/1/slimline-clip-showcase.png",
      "/products/1/slimline-clip-showcase2.png",
      "/products/1/slimline-clip-whiteg.png",
    ],
    specs: {
      "Suitable Door": "Cabinet Door",
      "Hinge Size": "5 Inch",
      "Hinge Type": "Hydraulic Soft-Close",
      "Closing Type": "Normal Close",
      "Hole Pattern": "4 Holes Plate",
      "Degree Angle": "15 Degrees",
    }
  },
  {
    id: "drawer-channel",
    name: "Self Closing 20inch Sliding Drawer Channel",
    price: "₹ 36 / Inch",
    category: "Drawer Channels",
    description: "Heavy-duty 20-inch self-closing sliding drawer runners. Engineered with premium cold rolled steel, integrated double-spring hydraulic dampening for silent closing, and dual-direction steel ball bearings for smooth cabinet operations.",
    images: [
      "/products/2/sliding-drawer-showcase.png",
      "/products/2/sliding-drawer-whitebg.png",
      "/products/2/sliding-drawer-info.png",
    ],
    specs: {
      "Channel Size": "20 Inch (500mm)",
      "Mount Type": "Side / Under Mount",
      "Mechanism": "Self Closing Hydraulic",
      "Material": "Cold Rolled Steel",
    }
  }
];

export default function Products({ isSubPage = false }: { isSubPage?: boolean }) {
  // Track active image index for each product
  const [activeImages, setActiveImages] = useState<{ [key: string]: number }>({
    "slimline-hinge": 0,
    "drawer-channel": 0,
  });

  const handleImageChange = (productId: string, index: number) => {
    setActiveImages((prev) => ({ ...prev, [productId]: index }));
  };

  const getWhatsAppLink = (product: Product) => {
    const text = `Hi NARVO Textile & Hardware, I want to enquire about the B2B product: "${product.name}" priced at ${product.price}. Please share wholesale catalogs, lead times, and shipping terms.`;
    return `https://wa.me/918875341190?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className={`relative ${isSubPage ? "pb-24 pt-0" : "py-24"} bg-lightgray overflow-hidden px-6 md:px-12 lg:px-24`}>
      {/* Background Section Index "02" */}
      {!isSubPage && (
        <div className="absolute left-6 top-10 text-[12rem] md:text-[16rem] font-heading font-extrabold text-[#ECECEC]/50 select-none pointer-events-none leading-none z-0">
          02
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        {!isSubPage && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-2.5 inline-block">
                Catalogue
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
                Premium Collections
              </h2>
              <p className="text-sm md:text-base text-text-custom/60 mt-3 font-sans">
                High-performance, durable, and architecturally certified solutions.
              </p>
            </div>
          </div>
        )}

        {/* 2-Column Product Grid */}
        <RevealStagger delay={0.1} staggerChildren={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {productsData.map((product) => {
              const activeIndex = activeImages[product.id] || 0;
              const activeImageSrc = product.images[activeIndex];

              return (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
                  }}
                  className="group bg-white rounded-[28px] overflow-hidden shadow-xl border border-border-custom flex flex-col justify-between"
                >
                  {/* Image Showcase Card */}
                  <div className="relative h-[300px] sm:h-[350px] bg-secondary flex items-center justify-center p-6 overflow-hidden">
                    {/* Background Soft Mesh */}
                    <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
                    
                    <div className="relative w-full h-full">
                      <Image
                        src={activeImageSrc}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                      />
                    </div>

                    {/* Category Floating Tag */}
                    <span className="absolute top-6 left-6 px-4 py-1.5 bg-secondary text-white text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/10 shadow-lg">
                      {product.category}
                    </span>

                    {/* Small image thumbnails for quick switching inside card */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-secondary/80 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 flex gap-2.5 z-10 shadow-xl">
                      {product.images.map((img, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={() => handleImageChange(product.id, imgIdx)}
                          className={`w-6 h-6 rounded-full border relative overflow-hidden transition-all duration-300 ${
                            activeIndex === imgIdx
                              ? "border-primary scale-110"
                              : "border-white/20 hover:border-white/60"
                          }`}
                        >
                          <Image
                            src={img}
                            alt="thumbnail"
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Metadata Box */}
                  <div className="p-8 flex flex-col justify-between flex-grow gap-6 bg-white">
                    <div className="flex flex-col gap-4">
                      {/* Title & Price */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <h3 className="text-xl md:text-2xl font-heading font-extrabold text-secondary tracking-wide leading-snug">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-heading font-extrabold text-primary">
                          {product.price}
                        </span>
                        <span className="text-[10px] font-sans font-bold bg-[#E8F8EE] text-[#25D366] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Wholesale Price
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm font-sans text-text-custom/70 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>

                      {/* Specs Snippet (badges) */}
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                          <span
                            key={key}
                            className="text-[11px] font-sans font-medium text-secondary bg-lightgray border border-border-custom px-3 py-1 rounded-full flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <strong className="text-secondary/70">{key}:</strong> {val}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-border-custom pt-6">
                      <Link
                        href={`/products/${product.id}`}
                        className="group py-3.5 border border-secondary hover:border-primary hover:bg-primary/5 text-secondary hover:text-primary text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-center"
                      >
                        <Eye className="w-4 h-4" />
                        VIEW DETAILS
                      </Link>

                      <a
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-bold tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 text-center"
                      >
                        <FaWhatsapp className="w-4.5 h-4.5" />
                        ENQUIRE NOW
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
