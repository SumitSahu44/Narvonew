"use client";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[#080808] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/hero_interior.png"
        className="w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Smooth bottom gradient transition to blend video with the rest of the dark sections */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}

