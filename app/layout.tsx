import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";
import Preloader from "@/components/Preloader";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NARVO Hardware | Luxury Architectural Interiors",
  description: "Premium architectural hardware, doors, plywood, and wood veneers. Redefining modern luxury spaces with handcrafted precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-white text-[#222222]">
        {/* Luxury Preloader */}
        <Preloader />

        {/* Grain/Noise texture overlay */}
        <div className="noise-bg" />
        
        {/* Smooth scroll and cursor container */}
        <SmoothScroll>
          <CustomCursor />
          <Chatbot />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

