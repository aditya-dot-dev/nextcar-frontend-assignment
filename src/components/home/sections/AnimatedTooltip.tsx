import React from 'react';
import { FlowState } from '../hooks/useTimelineFlow';

interface AnimatedTooltipProps {
  flowState: FlowState;
}

export default function AnimatedTooltip({ flowState }: AnimatedTooltipProps) {
  return (
    <>
      {/* GLOBAL ANIMATED TOOLTIP */}
      {/* Anchored right side, animates X via transform to avoid layout reflow */}
      <div
        className="absolute top-[429px] -translate-y-1/2 right-[calc(10%+15px)] pointer-events-none z-50"
      >
        <div
          className={`transition-all ${flowState === 0 || flowState === 15 ? 'duration-[1000ms] delay-0' : 'duration-[600ms] delay-[300ms]'} ease-[cubic-bezier(0.2,0.8,0.2,1)] ${flowState >= 3 && flowState !== 15 ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: flowState === 0 || flowState === 15 ? 'translateX(calc(-80vw + 158px))' : 'translateX(0)' }}
        >
          {/* Fixed width pill with crossfading text and SVG backgrounds to perfectly match the pointed-tail design */}
          <div className="relative w-[130px] h-[36px] overflow-visible drop-shadow-[0_0_15px_rgba(239,68,68,0.15)]">

            {/* SVG Background for LEFT SIDE (flowState === 0) */}
            <svg
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${flowState === 0 || flowState === 15 ? 'opacity-100' : 'opacity-0'}`}
              viewBox="0 0 130 36"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="30%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <path
                d="M 112 1 L 18 1 A 6 6 0 0 0 12 7 L 12 13 Q 7 13 7 18 Q 7 23 12 23 L 12 29 A 6 6 0 0 0 18 35 L 112 35 A 17 17 0 0 0 112 1 Z"
                className="fill-white dark:fill-[#262626] transition-colors duration-300"
                stroke="url(#grad-left)"
                strokeWidth="1.5"
              />
            </svg>

            {/* SVG Background for RIGHT SIDE (flowState > 0) */}
            <svg
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${(flowState > 0 && flowState !== 15) ? 'opacity-100' : 'opacity-0'}`}
              viewBox="0 0 130 36"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="70%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M 18 1 L 112 1 A 6 6 0 0 1 118 7 L 118 13 Q 123 13 123 18 Q 123 23 118 23 L 118 29 A 6 6 0 0 1 112 35 L 18 35 A 17 17 0 0 1 18 1 Z"
                className="fill-white dark:fill-[#262626] transition-colors duration-300"
                stroke="url(#grad-right)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Text Content */}
            <div
              className={`absolute inset-0 flex items-center justify-center text-gray-800 dark:text-white/90 text-[12px] font-light tracking-wide whitespace-nowrap transition-[opacity,color] duration-500 ${flowState === 0 || flowState === 15 ? 'opacity-100' : 'opacity-0'}`}
              style={{ fontFamily: '"SF Pro Display", "SF Pro", -apple-system, sans-serif' }}
            >
              Click for Home
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-gray-800 dark:text-white/90 text-[12px] font-light tracking-wide whitespace-nowrap transition-[opacity,color] duration-500 ${(flowState > 0 && flowState !== 15) ? 'opacity-100' : 'opacity-0'}`}
              style={{ fontFamily: '"SF Pro Display", "SF Pro", -apple-system, sans-serif' }}
            >
              Explore timeline
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
