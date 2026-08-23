import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function BackgroundAtmosphere() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* 1. BACKGROUND ATMOSPHERE & GLOWS */}
      {/* Dark ambient background base */}
      <div className="pointer-events-none absolute inset-0 bg-transparent dark:bg-[#050405] transition-colors duration-300" />

      {/* Soft diffuse atmospheric glow directly behind the car (no visible hard boundaries) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[495px] -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] opacity-80 transition-colors duration-300"
        style={{
          background: mounted && theme === 'light' 
            ? "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, transparent 60%)"
            : "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)"
        }}
      />

      {/* Figma Spotlight Layer */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-74px] h-[730px] w-[250px] flex justify-center z-0 blur-[24px]">
        <div
          className="w-full h-full transition-colors duration-300"
          style={{
            background: mounted && theme === 'light'
              ? "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5) 55%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.25) 55%, transparent 100%)",
            clipPath: "polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>
    </>
  );
}
