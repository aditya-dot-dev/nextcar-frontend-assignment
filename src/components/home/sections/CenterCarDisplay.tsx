import React from 'react';
import Image from 'next/image';
import { FlowState } from '../hooks/useTimelineFlow';

interface CenterCarDisplayProps {
  flowState: FlowState;
  trClass: string;
  TIMELINE_WIDTH: string;
}

export default function CenterCarDisplay({ flowState, trClass, TIMELINE_WIDTH }: CenterCarDisplayProps) {
  return (
    <>
      {/* 4. CENTER CAR WRAPPER (TRUE VIEWPORT & OPTICAL CENTER) */}
      <div className="absolute top-[429px] left-1/2 z-10 w-[534px] h-[534px]" style={{ transform: 'translate(-50%, -50%)' }}>

        {/* CAR DISPLAY — no scaling on click, only the car image at its natural size */}
        <div className={`relative flex items-center justify-center w-full h-full ${trClass}`}>
          {/* RIPPLE ANIMATION — Decoupled from car center */}
          {flowState !== 3 && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[
                { scale: 4.2, opacity: 0.3, show: true },
                { scale: 3.0, opacity: 0.5, show: true },
                { scale: 1.8, opacity: 0.8, show: true },
                { scale: 0.9, opacity: 1.0, show: flowState >= 4 }
              ].map((ring, idx) => ring.show && (
                <div
                  key={idx}
                  className={`absolute top-1/2 left-1/2 w-[360px] h-[360px] rounded-full border-[1px] border-white/[0.05] shadow-[inset_0_4px_15px_rgba(255,255,255,0.3)] [-webkit-mask-image:linear-gradient(to_bottom,black_15%,transparent_90%)] [mask-image:linear-gradient(to_bottom,black_15%,transparent_90%)] transition-all ${flowState === 0 || flowState === 15 ? 'duration-[300ms] delay-0 ease-in' : 'duration-[600ms] delay-[300ms] ease-[cubic-bezier(0.175,0.885,0.32,1.1)]'}`}
                  style={{
                    transform: `translate(-50%, -50%) scale(${flowState > 0 && flowState !== 15 ? ring.scale : 0.1})`,
                    opacity: flowState > 0 && flowState !== 15 ? ring.opacity : 0
                  }}
                />
              ))}
            </div>
          )}

          {/* CAR DISPLAY & TIMELINE MORPH */}
          <div className={`absolute top-1/2 left-1/2 flex items-center justify-center transition-all z-10 overflow-hidden ${flowState >= 10 ? 'duration-[1000ms] ease-in-out' : flowState >= 5 ? 'duration-[150ms] ease-in' : 'duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]'
            } ${flowState <= 3 ? 'w-[534px] h-[534px] bg-transparent border-[0px] border-transparent opacity-100 rounded-none' :
              flowState === 4 ? `${TIMELINE_WIDTH} h-[320px] bg-black/50 border-[2px] border-dotted border-[#C40504] opacity-100 rounded-none shadow-[0_0_20px_rgba(196,5,4,0.5)]` :
                `${TIMELINE_WIDTH} h-0 bg-transparent border-t-[2px] border-b-0 border-x-0 border-dotted border-[#C40504] opacity-100 rounded-none shadow-[0_0_10px_rgba(196,5,4,0.5)]`
            }`} style={{
              transform: `translate(-50%, -50%)`,
              clipPath: flowState >= 10 ? 'inset(-50px -50px -50px 105%)' : 'inset(-50px -50px -50px -20px)'
            }}>
            {/* TOP Bar-code band */}
            <div
              className={`absolute top-0 left-0 w-full h-[100px] z-20 pointer-events-none transition-opacity duration-200 ${flowState === 4 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(196,5,4,0.3) 0px, rgba(196,5,4,0.3) 2px, transparent 2px, transparent 5px)'
              }}
            />
            {/* BOTTOM Bar-code band */}
            <div
              className={`absolute bottom-0 left-0 w-full h-[100px] z-20 pointer-events-none transition-opacity duration-200 ${flowState === 4 ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(196,5,4,0.3) 0px, rgba(196,5,4,0.3) 2px, transparent 2px, transparent 5px)'
              }}
            />

            {/* Native img used here to bypass Next.js Image aspect-ratio constraints during the aggressive morph */}
            <img
              src={flowState >= 3 && flowState !== 15 ? "/assets/images/car_3.png" : (flowState === 1 || flowState === 2) ? "/assets/images/car_2.png" : "/assets/images/car_1.png"}
              alt="Engineered Car"
              className={`relative z-10 transition-all ${flowState >= 5 && flowState !== 15 ? 'duration-[150ms] ease-in' : flowState === 0 ? 'duration-[400ms] delay-[150ms] ease-out' : 'duration-[250ms] ease-out'
                } ${flowState === 4 ? 'w-full h-full object-fill opacity-50 blur-[2px]' :
                  (flowState >= 5 && flowState !== 15) ? 'w-full h-0 opacity-0 blur-[4px]' :
                    flowState === 15 ? 'w-[534px] h-[534px] max-w-none object-contain opacity-0 blur-none !duration-0' :
                      'w-[534px] h-[534px] max-w-none object-contain opacity-100 blur-none'
                } ${flowState === 15 ? '' : trClass}`}
              style={{
                width: (flowState >= 4 && flowState !== 15) ? '100%' : '534px',
                height: (flowState >= 4 && flowState !== 15) ? '100%' : '534px',
                transform: (flowState < 4 || flowState === 15) ? 'translateY(110px)' : 'translateY(0px)'
              }}
            />
          </div>

          {/* STATS OVERLAY - Only visible in animated screen state (flowState 1 and 2) */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.2)] ${(flowState === 1 || flowState === 2) ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.3]'}`}
            style={{ fontFamily: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            {/* Top Left */}
            <div className="absolute right-[calc(100%-81px)] top-[110px] text-right w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">352</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">Top Speed</div>
            </div>

            {/* Mid Left */}
            <div className="absolute right-[calc(100%-30px)] top-1/2 -translate-y-1/2 text-right w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">620</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">Power (HP)</div>
            </div>

            {/* Bottom Left */}
            <div className="absolute right-[calc(100%-81px)] bottom-[110px] text-right w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">780</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">Torque</div>
            </div>

            {/* Top Right */}
            <div className="absolute left-[calc(100%-81px)] top-[110px] text-left w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">3.2 Sec</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">0-100 KM/H</div>
            </div>

            {/* Mid Right */}
            <div className="absolute left-[calc(100%-30px)] top-1/2 -translate-y-1/2 text-left w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">2,450 KM</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">Oil Change</div>
            </div>

            {/* Bottom Right */}
            <div className="absolute left-[calc(100%-81px)] bottom-[110px] text-left w-max">
              <div className="text-[30px] font-semibold text-white leading-none tracking-tight">520 KM</div>
              <div className="text-[13px] text-white/60 mt-1.5 font-normal">Range</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. HORIZONTAL TIMELINE FLOW (Visible >= 4) */}
      <div className={`absolute top-[429px] left-1/2 ${TIMELINE_WIDTH} z-20 pointer-events-none transition-opacity duration-500 delay-200 ${flowState >= 4 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translate(-50%, -50%)' }}>

        {/* The timeline line is now formed by the morphing red car wrapper! */}
        {/* We only render the nodes and the small car marker here. */}

        {/* 5 Red Circular Nodes (Appear dynamically as car reaches them) */}
        <div
          className={`absolute top-1/2 left-0 w-full h-0 -translate-y-1/2 transition-all ${flowState >= 10 ? 'duration-[1000ms] ease-in-out delay-0' : 'duration-500 delay-300'
            } ${flowState >= 5 && flowState < 11 ? 'opacity-100' : 'opacity-0'}`}
          style={{ clipPath: flowState >= 10 ? 'inset(-50px -50px -50px 105%)' : 'inset(-50px -50px -50px -20px)' }}
        >
          {[0, 33.33, 66.66, 100].map((pos, index) => (
            <div key={index} className={`absolute top-1/2 w-[14px] h-[14px] bg-red-600 rounded-full border-[2px] border-[#050405] shadow-[0_0_10px_rgba(196,5,4,0.8)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${flowState >= index + 6 ? 'opacity-100' : 'opacity-0'}`} style={{ left: `${pos}%`, transitionDelay: flowState >= index + 6 && index > 0 ? '1000ms' : '0ms' }} />
          ))}
        </div>

        {/* Small Car Marker & Cards Wrapper */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all ${
            flowState >= 13 ? 'duration-0' : 
            flowState >= 12 ? 'duration-[300ms] ease-in-out' : 
            flowState >= 11 ? 'duration-[600ms] ease-in-out' : 
            (flowState === 7 || flowState === 8 || flowState === 9) ? 'duration-[400ms] ease-in' : 
            (flowState === 7.5 || flowState === 8.5 || flowState === 9.5) ? 'duration-[800ms] ease-out' : 
            'duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]'
          } z-10`}
          style={{
            left: flowState <= 6.5 ? '0%' : 
                  flowState === 7 ? '16.66%' : 
                  flowState === 7.5 ? '33.33%' : 
                  flowState === 8 ? '50%' : 
                  flowState === 8.5 ? '66.66%' : 
                  flowState === 9 ? '83.33%' : 
                  flowState < 11 ? '100%' : 
                  flowState === 11 ? '-8%' : '45%',
            opacity: flowState >= 13 ? 0 : flowState >= 6 ? 1 : 0,
            marginTop: flowState >= 11 ? '30px' : '0px'
          }}
        >
          {/* Glowing dot/car */}
          <div className={`relative flex items-center justify-center transition-all ${flowState >= 11 ? 'duration-[600ms] ease-in-out w-[270px] h-[270px] bg-transparent border-[0px] border-transparent shadow-none' : 'w-[50px] h-[50px] bg-[#111] rounded-full border-[3px] border-[#403636] shadow-xl'} -translate-x-1/2`}>
            {/* Small image */}
            <Image src="/assets/images/car_3_reshaped.png" alt="Car Marker" width={100} height={100} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] h-[82%] rounded-full object-cover transition-opacity ${flowState >= 11 ? 'duration-[600ms] opacity-0' : 'duration-300 opacity-100'}`} />

            {/* Large image */}
            <Image src="/assets/images/car_3.png" alt="Large Car" width={342} height={341} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%*342/320)] h-[calc(100%*341/320)] max-w-none object-contain transition-opacity ${flowState >= 11 ? 'duration-[600ms] opacity-100' : 'duration-300 opacity-0'}`} />
          </div>

          {/* Dynamic Process Card */}
          <div 
            className={`absolute bottom-[57px] left-1/2 -translate-x-1/2 w-[261.5px] h-[120px] pointer-events-none ${flowState >= 6.5 && flowState < 11 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: 'opacity 300ms ease',
              transitionDelay: flowState >= 6.5 && flowState < 11 ? '0ms' : '300ms'
            }}
          >
            {/* Horizontal Expander (Forms the vertical line and expands left/right) */}
            <div 
              className="absolute inset-0 w-full h-full origin-center"
              style={{
                transform: flowState >= 6.5 && flowState < 11 ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              {/* Perfect SVG Trapezium matching Figma geometry and exact colors */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 262 120" preserveAspectRatio="none">
                <polygon
                  points="32,0 262,0 230,120 0,120"
                  fill="#D9D9D9"
                  fillOpacity="0.3"
                  stroke="#FFFFFF"
                  strokeOpacity="0.1"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
            
            {/* Text Content (Fades in without being horizontally squashed) */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center pl-[16px] pr-[16px]"
              style={{
                opacity: flowState >= 6.5 && flowState < 11 ? 1 : 0,
                transition: 'opacity 300ms ease',
                transitionDelay: flowState >= 6.5 && flowState < 11 ? '300ms' : '0ms'
              }}
            >
              <div className="text-white font-semibold text-[20px] uppercase tracking-wide">
                {flowState <= 7 ? 'Registration' : flowState <= 8 ? 'Consultation' : flowState <= 9 ? 'Artist assign' : 'Vehicle Pickup'}
              </div>
              <div className="text-[#a3a3a3] text-[13px] mt-1 font-light tracking-wide">
                {flowState <= 7 ? 'Fill form for submission' : flowState <= 8 ? 'Planning and pricing' : flowState <= 9 ? 'according to task' : 'Payment & dropoff'}
              </div>
            </div>
          </div>
        </div>

        {/* TRUCK ELEMENT (State 11, Exits in 13) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all ${flowState >= 13 ? 'duration-[800ms] ease-in-out' : 'duration-[600ms] ease-in-out'} z-20`}
          style={{
            left: flowState >= 13 ? '200vw' : flowState >= 11 ? '55%' : '150%',
            opacity: flowState >= 11 ? 1 : 0
          }}
        >
          <div className="relative flex items-center justify-center -translate-x-1/2">
            <Image
              src="/assets/images/Truck.png"
              alt="Truck"
              width={1002}
              height={392}
              className="w-[635px] md:w-[825px] max-w-none object-contain drop-shadow-2xl"
              priority
            />
            {/* Truck Branding Overlay (Moves and scales with the truck) */}
            <div className="absolute top-[10%] left-[12%] w-[64%] h-[59%] flex flex-col items-center justify-center pointer-events-none z-10">
              <div className="flex flex-col items-center -translate-y-[20%]">
                <Image
                  src="/assets/icons/brand_logo.svg"
                  alt="Brand Logo"
                  width={260}
                  height={86}
                  className="w-[67px] md:w-[90px] h-auto mb-[6px]"
                />
                <span
                  className="text-black/80 font-black uppercase tracking-tight text-[27px] md:text-[38px] leading-none whitespace-nowrap"
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  VEHICLE DELIVERY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
