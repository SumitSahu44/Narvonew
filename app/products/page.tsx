import { Metadata } from "next";
import Link from "next/link";
import Products from "@/sections/Products";

export const metadata: Metadata = {
  title: "Premium Collections | NARVO Textile & Hardware",
  description: "Browse NARVO's luxury hardware collections, hydraulic cabinet hinges, sliding drawer channels, designer doors, and decorative veneers.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-32 pb-6">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-4 relative z-10">
        <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50">
          <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <span>/</span>
          <span className="text-secondary font-semibold">Products</span>
        </div>
      </div>

      {/* Main product catalogue section */}
      <Products />
    </div>
  );
}
