import { Metadata } from "next";
import Link from "next/link";
import Products from "@/sections/Products";

export const metadata: Metadata = {
  title: "Premium Collections | NARVO Textile & Hardware",
  description: "Browse NARVO's luxury hardware collections, hydraulic cabinet hinges, sliding drawer channels, designer doors, and decorative veneers.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-lightgray pt-32 pb-24 relative overflow-hidden">
      {/* Background Subtle Accent Grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Luxury Glow Blurs */}
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <span>/</span>
          <span className="text-secondary font-semibold">Products</span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col max-w-2xl gap-3">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">
              Catalogue
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-secondary tracking-tight">
              Premium Collections
            </h1>
            <p className="text-sm sm:text-base font-sans text-text-custom/60 leading-relaxed">
              High-performance, durable, and architecturally certified B2B solutions.
            </p>
          </div>
        </div>

        {/* Main product catalogue section */}
        <Products isSubPage />
      </div>
    </div>
  );
}
