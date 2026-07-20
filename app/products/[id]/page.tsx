import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

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
      "/products/1/slimline-clip-showcase1.png",
      "/products/1/slimline-clip-showcase3.png",
      "/products/1/slimline-clip-white.png",
    ],
    specs: {
      "Suitable Door": "Cabinet Door",
      "Hinge Size": "5 Inch",
      "Hinge Type": "Hydraulic Soft-Close",
      "Closing Type": "Normal Close",
      "Hole Pattern": "4 Holes Plate",
      "Degree Angle": "15 Degrees",
      "Response Rate": "89% (Wholesale Support)",
      "Quality Stamp": "TrustSEAL Certified",
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
      "Load Capacity": "Heavy Duty Industrial",
      "Response Rate": "78% (Wholesale Support)",
      "Quality Stamp": "Premium B2B Grade",
    }
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | NARVO Hardware`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NARVO Hardware`,
      description: product.description,
      images: [{ url: product.images[0] }],
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 lg:px-24">
      {/* Background Subtle grid lines */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-32 pb-24 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2.5 text-xs font-sans text-text-custom/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-secondary font-semibold">{product.category}</span>
        </div>

        {/* Client-Side Interactive Part */}
        <ProductPageClient product={product} />
      </div>
    </div>
  );
}
