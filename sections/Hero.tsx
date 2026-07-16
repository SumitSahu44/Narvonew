"use client";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[#080808] overflow-hidden">
      <video
        src="https://www.pexels.com/download/video/7314250/"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Smooth bottom gradient transition to blend video with the rest of the dark sections */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}
