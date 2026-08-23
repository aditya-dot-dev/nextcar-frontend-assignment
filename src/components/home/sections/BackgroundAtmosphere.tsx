import React from 'react';

export default function BackgroundAtmosphere() {
  return (
    <>
      {/* 1. BACKGROUND ATMOSPHERE & GLOWS */}
      {/* Dark ambient background base */}
      <div className="pointer-events-none absolute inset-0 bg-[#050405]" />

      {/* Soft diffuse atmospheric glow directly behind the car (no visible hard boundaries) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[495px] -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] opacity-80"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)"
        }}
      />

      {/* Figma Spotlight Layer */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-74px] h-[730px] w-[250px] flex justify-center z-0 blur-[24px]">
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.25) 55%, transparent 100%)",
            clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>
    </>
  );
}
