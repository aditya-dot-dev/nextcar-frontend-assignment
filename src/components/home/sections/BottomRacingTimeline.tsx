import React from 'react';
import Image from 'next/image';

export interface Checkpoint {
  lap: string;
  zone: string;
  left: number;
  yOffset: string;
  active: boolean;
}

interface BottomRacingTimelineProps {
  trClass: string;
  checkpoints: Checkpoint[];
}

export default function BottomRacingTimeline({ trClass, checkpoints }: BottomRacingTimelineProps) {
  return (
    <>
      {/* 7. BOTTOM RACING TIMELINE */}
      <div className="absolute top-[570px] left-0 w-full h-[256px] z-30 pointer-events-none">
        {/* The dashed racing path & its exact conforming atmospheric glow */}
        <svg
          className="absolute top-[64px] left-0 w-full h-[192px] overflow-visible"
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glowWeak" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="40%" stopColor="#c40504" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#c40504" stopOpacity="0.03" />
              <stop offset="90%" stopColor="#7f1d1d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glowMed" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="30%" stopColor="#c40504" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#c40504" stopOpacity="0.05" />
              <stop offset="95%" stopColor="#7f1d1d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glowStrong" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c40504" stopOpacity="0.18" />
              <stop offset="12%" stopColor="#c40504" stopOpacity="0.18" />
              <stop offset="95%" stopColor="#7f1d1d" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="horizMed" x1="20" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="horizStrong" x1="60" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>

            <mask id="maskMed">
              <rect x="0" y="0" width="100" height="160" fill="url(#horizMed)" />
            </mask>

            <mask id="maskStrong">
              <rect x="0" y="0" width="100" height="160" fill="url(#horizStrong)" />
            </mask>
          </defs>

          {/* Fill shape composite layers for atmospheric glow */}
          {[
            { fill: "url(#glowWeak)" },
            { fill: "url(#glowMed)", mask: "url(#maskMed)" },
            { fill: "url(#glowStrong)", mask: "url(#maskStrong)" },
          ].map((layer, i) => (
            <path
              key={i}
              d="M 0 90 C 1.7 88, 3.3 86, 5 84 C 6.7 82, 8.3 80, 10 79.5 C 11.7 79.8, 13.3 79.8, 15 79.5 C 16.7 79.2, 18.3 79.1, 20 77.6 C 21.7 76.1, 23.3 71.8, 25 70.5 C 26.7 69.2, 28.3 70.1, 30 70 C 31.7 69.9, 33.3 70.2, 35 70 C 36.7 69.8, 38.3 69.6, 40 69 C 41.7 68.5, 43.3 68.5, 45 66.7 C 46.7 64.9, 48.3 60.0, 50 58.1 C 51.7 56.2, 53.3 55.8, 55 55.2 C 56.7 54.6, 58.3 54.5, 60 54.3 C 61.7 54.1, 63.3 54.0, 65 53.8 C 66.7 53.6, 68.3 54.2, 70 52.9 C 71.7 51.6, 73.3 49.4, 75 46.2 C 76.7 43.0, 78.3 36.7, 80 33.8 C 81.7 30.9, 83.3 29.7, 85 28.6 C 86.7 27.5, 88.3 27.9, 90 27.1 C 91.7 26.3, 93.3 25.0, 95 23.8 C 96.7 22.6, 98.3 20.6, 100 20 L 100 160 L 0 160 Z"
              fill={layer.fill}
              mask={layer.mask}
              className="opacity-[0.25] dark:opacity-100 transition-opacity duration-300"
            />
          ))}

          {/* The dashed line */}
          <path
            d="M 0 90 C 1.7 88, 3.3 86, 5 84 C 6.7 82, 8.3 80, 10 79.5 C 11.7 79.8, 13.3 79.8, 15 79.5 C 16.7 79.2, 18.3 79.1, 20 77.6 C 21.7 76.1, 23.3 71.8, 25 70.5 C 26.7 69.2, 28.3 70.1, 30 70 C 31.7 69.9, 33.3 70.2, 35 70 C 36.7 69.8, 38.3 69.6, 40 69 C 41.7 68.5, 43.3 68.5, 45 66.7 C 46.7 64.9, 48.3 60.0, 50 58.1 C 51.7 56.2, 53.3 55.8, 55 55.2 C 56.7 54.6, 58.3 54.5, 60 54.3 C 61.7 54.1, 63.3 54.0, 65 53.8 C 66.7 53.6, 68.3 54.2, 70 52.9 C 71.7 51.6, 73.3 49.4, 75 46.2 C 76.7 43.0, 78.3 36.7, 80 33.8 C 81.7 30.9, 83.3 29.7, 85 28.6 C 86.7 27.5, 88.3 27.9, 90 27.1 C 91.7 26.3, 93.3 25.0, 95 23.8 C 96.7 22.6, 98.3 20.6, 100 20"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="8 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Checkpoint Markers & Labels */}
        {checkpoints.map((cp) => (
          <div
            key={cp.lap}
            className="absolute flex flex-col items-center -translate-x-1/2 pointer-events-auto"
            style={{
              left: `${cp.left}%`,
              top: `calc(64px + (120px * ${parseFloat(cp.yOffset) / 100}))`,
              bottom: '40px'
            }}
          >
            {/* Checkpoint visual element (no outer circle) centered exactly on the path */}
            <div
              className={`relative z-10 flex items-center justify-center h-[54px] w-[54px] -mt-[27px] ${trClass}`}
            >
              <Image
                src={cp.active ? "/assets/icons/progress_icon_active.svg" : "/assets/icons/progress_icon.svg"}
                alt={cp.lap}
                width={54}
                height={54}
                className={cp.active ? 'drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]' : 'dark:invert-0 invert transition-all duration-300'}
              />
            </div>

            {/* Vertical connector line growing downwards strictly from the bottom of the checkpoint */}
            <div className={`flex-1 border-l border-dashed ${trClass} ${cp.active ? 'border-red-600/50' : 'border-gray-300 dark:border-[#4b5563]/60'} transition-colors duration-300 w-0 mt-2 mb-2`} />

            {/* Text Label aligned identically at the bottom */}
            <div className="absolute top-full w-[140px] text-center" style={{ fontFamily: '"SF Pro Display", "SF Pro", -apple-system, sans-serif' }}>
              <div className={`text-[12px] md:text-[13px] font-bold tracking-wider ${trClass} ${cp.active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'} transition-colors duration-300`}>
                {cp.lap}
              </div>
              <div className={`text-[11px] md:text-[12px] tracking-wider mt-1 ${trClass} ${cp.active ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-[#6b7280]'} transition-colors duration-300`}>
                {cp.zone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
