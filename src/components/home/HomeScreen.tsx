"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  // flowState:
  // 0 = HOME_INITIAL (frame-1)
  // 1 = ANIMATE_SCREEN (frame-2)
  // 2 = NAVIGATE_TO_TIMELINE (frame-2 variant)
  // 3 = TIMELINE_STARTED (red car screen)
  // 4, 5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11 = TIMELINE ENTRANCE & STEPS
  const [flowState, setFlowState] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 11 | 12 | 13 | 14 | 15>(0);

  const TIMELINE_WIDTH = "w-[65vw] max-w-[750px]";

  // Automatic transition from B (1) -> C (2) after 10ms
  useEffect(() => {
    if (flowState === 1) {
      const timer = setTimeout(() => {
        setFlowState(2);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  // Derived state flags
  const isAnimatedScreen = flowState === 1 || flowState === 2;
  const isTimelineStarted = flowState === 3;

  // Transition class dynamically changes based on the target state's Figma duration
  const getTransitionClass = () => {
    if (flowState === 1) return "transition-all duration-100 ease-in-out";
    if (flowState === 2) return "transition-all duration-500 ease-in-out";
    if (flowState === 3 || flowState === 4) return "transition-all duration-500 ease-in-out";
    if (flowState === 7) return "transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
    if (flowState >= 8) return "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
    return "transition-all duration-300 ease-in-out"; // default/reset
  };
  const trClass = getTransitionClass();

  const activeLap = isTimelineStarted ? 'LAP 05' : 'LAP 03';

  const checkpoints = [
    { lap: 'LAP 01', zone: 'Speed Zone', left: 10, yOffset: '75%', active: activeLap === 'LAP 01' },
    { lap: 'LAP 02', zone: 'Acceleration Zone', left: 30, yOffset: '65%', active: activeLap === 'LAP 02' },
    { lap: 'LAP 03', zone: 'Technical Section', left: 50, yOffset: '52.5%', active: activeLap === 'LAP 03' },
    { lap: 'LAP 04', zone: 'High Speed Zone', left: 70, yOffset: '35%', active: activeLap === 'LAP 04' },
    { lap: 'LAP 05', zone: 'Final Corner', left: 90, yOffset: '20%', active: activeLap === 'LAP 05' },
  ];

  return (
    <main 
      className="relative flex h-screen w-full overflow-hidden bg-[#050405] text-white select-none"
      onClick={() => {
        if (flowState === 2) {
          setFlowState(15);
          setTimeout(() => setFlowState(0), 300);
        }
      }}
    >
      {/* 1. BACKGROUND ATMOSPHERE & GLOWS */}
      {/* Dark ambient background base */}
      <div className="pointer-events-none absolute inset-0 bg-[#050405]" />

      {/* Soft diffuse atmospheric glow directly behind the car (no visible hard boundaries) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] opacity-80"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)"
        }}
      />

      {/* Figma Spotlight Layer: Inner element gets clipped, outer parent applies heavy blur for diffuse soft edges */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[74px] h-[800px] w-[500px] flex justify-center blur-[50px] opacity-70">
        <div
          className="h-[688px] w-[189px]"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 70%, transparent 100%)",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      {/* 2. HEADER */}
      {/* Brand logo (top-left) */}
      <div className="absolute left-8 top-6 z-20">
        <Image
          src="/assets/icons/brand_logo.svg"
          alt="NextCar"
          width={110}
          height={32}
          priority
          className="h-auto w-auto opacity-90"
        />
      </div>

      {/* Back button below logo */}
      <button
        type="button"
        className="absolute left-8 top-20 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10"
      >
        <Image
          src="/assets/icons/back_icon.svg"
          alt="Back"
          width={16}
          height={16}
        />
      </button>

      {/* Top-right theme toggle pill + action controls */}
      <div className="absolute right-8 top-6 z-20 flex items-center gap-3">
        {/* Theme sun/moon pill control container */}
        <div 
          className="flex items-center rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sun icon / Light theme toggle */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:text-white transition-colors"
            title="Light mode"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zm-12.37 12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z" />
            </svg>
          </button>

          {/* Moon icon / Dark theme active state */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white shadow-sm"
            title="Dark mode"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.3 2a10 10 0 0 0-1.9 20 10 10 0 0 0 8.7-4.9 1 1 0 0 0-1.1-1.5 8 8 0 1 1-7.2-12.5 1 1 0 0 0 1.5-1.1A10 10 0 0 0 12.3 2z" />
            </svg>
          </button>
        </div>

        {/* Action buttons (Download, Share, Check) */}
        <div className="flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-md">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/5 transition-colors hover:bg-white/15"
          >
            <Image
              src="/assets/icons/download_icon.svg"
              alt="Download"
              width={15}
              height={15}
            />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/5 transition-colors hover:bg-white/15"
          >
            <Image
              src="/assets/icons/share_icon.svg"
              alt="Share"
              width={15}
              height={15}
            />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dc2626] shadow-sm shadow-red-900/50 transition-colors hover:bg-red-600"
            onClick={() => {
              setIsAnimatedScreen(true);
              setFlowState(1);
              setTimeout(() => setFlowState(2), 600);
              setTimeout(() => setFlowState(3), 1200);
            }}
          >
            <Image
              src="/assets/icons/check_icon.svg"
              alt="Confirm"
              width={15}
              height={15}
            />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {/* 4. CENTER CAR WRAPPER (TRUE VIEWPORT & OPTICAL CENTER) */}
      <div className="fixed top-[55%] left-1/2 z-10 w-[320px] h-[320px]" style={{ transform: 'translate(-50%, -50%)' }}>
        {/* 3. TITLE SECTION (Anchored above the car) */}
        <div className={`absolute bottom-[calc(100%+70px)] left-1/2 flex flex-col items-center text-center w-max ${trClass} ${isAnimatedScreen ? '-translate-x-1/2 -translate-y-[60px] scale-90' : '-translate-x-1/2 translate-y-0 scale-100'} opacity-100`}>
          <h1 className="text-3xl md:text-[34px] font-extrabold italic tracking-wider uppercase font-serif">
            <span className="text-white drop-shadow-sm">ENGINEERED FOR </span>
            <span className="text-[#ef4444] drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">PASSION</span>
          </h1>

          <p className="mt-2 text-xs md:text-sm tracking-[0.22em] text-gray-400 uppercase font-medium">
            Precision. Power. Performance
          </p>

          {/* Small red underline/accent */}
          <div className="mt-4 h-[2px] w-10 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        </div>

        {/* CAR DISPLAY — no scaling on click, only the car image at its natural size */}
        <div className={`relative flex items-center justify-center w-full h-full ${trClass}`}>
          {/* RIPPLE ANIMATION — Decoupled from car center, shifted 5vh higher */}
          {flowState !== 3 && (
            <div className="absolute inset-0 pointer-events-none z-0 -translate-y-[5vh]">
              {[
                { scale: 4.2, opacity: 0.3, show: true },
                { scale: 3.0, opacity: 0.5, show: true },
                { scale: 1.8, opacity: 0.8, show: true },
                { scale: 0.9, opacity: 1.0, show: flowState >= 4 }
              ].map((ring, idx) => ring.show && (
                <div 
                  key={idx}
                  className={`absolute top-1/2 left-1/2 w-[360px] h-[360px] rounded-full border-[1px] border-white/[0.05] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.08)_35%,transparent_55%)] shadow-[inset_0_40px_80px_rgba(255,255,255,0.08),inset_0_4px_15px_rgba(255,255,255,0.05)] [-webkit-mask-image:linear-gradient(to_bottom,black_15%,transparent_90%)] [mask-image:linear-gradient(to_bottom,black_15%,transparent_90%)] transition-all ${flowState === 0 || flowState === 15 ? 'duration-[250ms]' : 'duration-[2400ms]'} ease-out`}
                  style={{
                    transform: `translate(-50%, -50%) scale(${flowState > 0 && flowState !== 15 ? ring.scale : 0.95})`,
                    opacity: flowState > 0 && flowState !== 15 ? ring.opacity : 0
                  }}
                />
              ))}
            </div>
          )}

          {/* CAR DISPLAY & TIMELINE MORPH */}
          <div className={`absolute top-1/2 left-1/2 flex items-center justify-center transition-all z-10 overflow-hidden ${flowState >= 10 ? 'duration-[1000ms] ease-in-out' : flowState >= 5 ? 'duration-[150ms] ease-in' : 'duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]'
            } ${flowState <= 3 ? 'w-[320px] h-[320px] bg-transparent border-[0px] border-transparent opacity-100 rounded-none' :
              flowState === 4 ? `${TIMELINE_WIDTH} h-[320px] bg-black/50 border-[2px] border-dotted border-[#C40504] opacity-100 rounded-none shadow-[0_0_20px_rgba(196,5,4,0.5)]` :
                `${TIMELINE_WIDTH} h-0 bg-transparent border-t-[2px] border-b-0 border-x-0 border-dotted border-[#C40504] opacity-100 rounded-none shadow-[0_0_10px_rgba(196,5,4,0.5)]`
            }`} style={{
              transform: `translate(-50%, calc(-50% - ${flowState >= 4 ? '5vh' : '0px'}))`,
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
              src={flowState >= 3 && flowState !== 15 ? "/assets/images/car_3.png" : "/assets/images/car_1.png"}
              alt="Engineered Car"
              className={`relative z-10 transition-all ${flowState >= 5 && flowState !== 15 ? 'duration-[150ms] ease-in' : 'duration-[250ms] ease-out'
                } ${flowState === 4 ? 'w-full h-full object-fill opacity-50 blur-[2px]' :
                  (flowState >= 5 && flowState !== 15) ? 'w-full h-0 opacity-0 blur-[4px]' :
                    'w-[342px] h-[341px] max-w-none object-contain opacity-100 blur-none'
                } ${trClass}`}
              style={{ width: (flowState >= 4 && flowState !== 15) ? '100%' : '342px', height: (flowState >= 4 && flowState !== 15) ? '100%' : '341px' }}
            />
          </div>

          {/* STATS OVERLAY - Only visible in animated screen state (flowState 1 and 2) */}
          <div className={`absolute inset-0 pointer-events-none ${trClass} ${(flowState === 1 || flowState === 2) ? 'opacity-100' : 'opacity-0'}`}>
            {/* Top Left */}
            <div className="absolute -left-[60px] top-[20px] text-right">
              <div className="text-[20px] font-bold text-white leading-tight">352</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Top Speed</div>
            </div>

            {/* Mid Left */}
            <div className="absolute -left-[90px] top-[150px] text-right">
              <div className="text-[20px] font-bold text-white leading-tight">620</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">HP Power</div>
            </div>

            {/* Bottom Left */}
            <div className="absolute -left-[60px] bottom-[20px] text-right">
              <div className="text-[20px] font-bold text-white leading-tight">750</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">RPM Engine</div>
            </div>

            {/* Top Right */}
            <div className="absolute -right-[70px] top-[20px] text-left">
              <div className="text-[20px] font-bold text-white leading-tight">3.2 Sec</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">0-100</div>
            </div>

            {/* Mid Right */}
            <div className="absolute -right-[100px] top-[150px] text-left">
              <div className="text-[20px] font-bold text-white leading-tight">2,450 KM</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Mileage</div>
            </div>

            {/* Bottom Right */}
            <div className="absolute -right-[70px] bottom-[20px] text-left">
              <div className="text-[20px] font-bold text-white leading-tight">520 KM</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Range</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. HORIZONTAL TIMELINE FLOW (Visible >= 4) */}
      <div className={`fixed top-[55%] left-1/2 ${TIMELINE_WIDTH} z-20 pointer-events-none transition-opacity duration-500 delay-200 ${flowState >= 4 ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translate(-50%, calc(-50% - 5vh))' }}>

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
          className={`absolute top-1/2 -translate-y-1/2 transition-all ${flowState >= 13 ? 'duration-0' : flowState >= 12 ? 'duration-[300ms] ease-in-out' : flowState >= 11 ? 'duration-[600ms] ease-in-out' : 'duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]'} z-10`}
          style={{
            left: flowState <= 6.5 ? '0%' : flowState <= 7.5 ? '33.33%' : flowState <= 8.5 ? '66.66%' : flowState < 11 ? '100%' : flowState === 11 ? '-8%' : '45%',
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
          <div className={`absolute bottom-[57px] left-1/2 -translate-x-1/2 w-[261.5px] h-[120px] transition-all duration-1000 ${flowState >= 6.5 && flowState < 11 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="relative w-full h-full overflow-hidden border border-white/20 bg-[#161616]/95 backdrop-blur-md shadow-2xl flex items-center justify-center" style={{ transform: 'skewX(-15deg)' }}>
              <div style={{ transform: 'skewX(15deg)' }} className="text-center flex flex-col items-center justify-center w-full h-full">
                <div className="text-white font-semibold text-[20px] uppercase tracking-wide">
                  {flowState <= 7 ? 'Registration' : flowState <= 8 ? 'Consultation' : flowState <= 9 ? 'Artist assign' : 'Vehicle Pickup'}
                </div>
                <div className="text-[#a3a3a3] text-[13px] mt-1 font-light tracking-wide">
                  {flowState <= 7 ? 'Fill form for submission' : flowState <= 8 ? 'Planning and pricing' : flowState <= 9 ? 'according to task' : 'Payment & dropoff'}
                </div>
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
                  VEICHLE DELIVERY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SIDE NAVIGATION - LEFT */}
      <div className="absolute left-[calc(10%-80px)] top-1/2 -translate-y-1/2 w-[120px] h-[300px] z-30">
        {/* Decorative Dashed Arc - Convex to the left, spaced 20px away from buttons */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 120 300">
          <path d="M 55 0 Q -65 150 55 300" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeDasharray="8 14" strokeLinecap="round" />
        </svg>

        {/* Timer Button */}
        <Image
          src="/assets/icons/timer_icon.svg"
          alt="Timer"
          width={62} height={62}
          className="absolute left-[34px] top-[34px] cursor-pointer transition-transform hover:scale-105 z-10"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />

        {/* Home Button (Active) */}
        <div className="absolute left-[15px] top-[119px] flex items-center z-20">
          <Image
            src="/assets/icons/home_icon.svg"
            alt="Home"
            width={62} height={62}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => flowState === 0 && setFlowState(1)}
          />
        </div>

        {/* Rupee Button */}
        <Image
          src="/assets/icons/rupee_icon.svg"
          alt="Rupee"
          width={62} height={62}
          className="absolute left-[34px] top-[204px] cursor-pointer transition-transform hover:scale-105 z-10"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />
      </div>

      {/* 6. SIDE NAVIGATION - RIGHT */}
      <div className="absolute right-[calc(10%-80px)] top-1/2 -translate-y-1/2 w-[120px] h-[300px] z-30">
        {/* Decorative Dashed Arc - Convex to the right, spaced 20px away from buttons */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 120 300">
          <path d="M 65 0 Q 185 150 65 300" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeDasharray="8 14" strokeLinecap="round" />
        </svg>

        {/* Chat Button */}
        <Image
          src="/assets/icons/chat_icon.svg"
          alt="Chat"
          width={62} height={62}
          className="absolute left-[24px] top-[34px] cursor-pointer transition-transform hover:scale-105 z-10"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />

        {/* Timeline Button */}
        <div className="absolute left-[43px] top-[119px] flex items-center z-20">
          <Image
            src="/assets/icons/timeline_icon.svg"
            alt="Timeline"
            width={62} height={62}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              if (flowState === 2) {
                // START THE SINGLE-CLICK CONTINUOUS SEQUENCE
                setFlowState(3); // Show red car, hide rings
                setTimeout(() => setFlowState(4), 1500); // Stretch horizontally
                setTimeout(() => setFlowState(5), 1800); // Bar collapses in 150ms
                setTimeout(() => setFlowState(6), 1950); // Step 1: Small car appears immediately after squeeze
                setTimeout(() => setFlowState(6.5), 2750); // HOLD 800ms, then Registration card appears over 1000ms
                setTimeout(() => setFlowState(7), 3750); // Step 2: Car starts moving to 33.33% ONLY AFTER card is visible
                setTimeout(() => setFlowState(7.5), 4650); // Swap text to Consultation 100ms before hitting 33.33%
                setTimeout(() => setFlowState(8), 5550); // Step 3: Car starts moving to 66.66%
                setTimeout(() => setFlowState(8.5), 6450); // Swap text to Artist 100ms before hitting 66.66%
                setTimeout(() => setFlowState(9), 7350); // Step 4: Car starts moving to 100%
                setTimeout(() => setFlowState(9.5), 8250); // Swap text to Pickup 100ms before hitting 100%
                setTimeout(() => setFlowState(10), 9150); // Step 5: Hold for 800ms, then Line and Nodes collapse into the car
                setTimeout(() => setFlowState(11), 10950); // Step 6: 800ms after collapse finishes (10150), car grows & moves left, truck enters
                setTimeout(() => setFlowState(12), 12150); // Step 7: 600ms wait after Step 6, car moves right behind truck
                setTimeout(() => setFlowState(13), 13250); // Step 8: 800ms wait after Step 7, truck exits right
                setTimeout(() => setFlowState(14), 14350); // Step 9: 300ms wait after Step 8 finishes, show Thank You
              }
            }}
          />
        </div>

        {/* Notes Button */}
        <Image
          src="/assets/icons/notes_icon.svg"
          alt="Notes"
          width={62} height={62}
          className="absolute left-[24px] top-[204px] cursor-pointer transition-transform hover:scale-105 z-10"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />
      </div>

      {/* GLOBAL ANIMATED TOOLTIP */}
      {/* Anchored right side, animates X via transform to avoid layout reflow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[calc(10%+15px)] pointer-events-none z-50"
      >
        <div
          className={`transition-transform ${flowState === 0 || flowState === 15 ? 'duration-[1000ms]' : 'duration-[400ms]'} ease-[cubic-bezier(0.2,0.8,0.2,1)] ${flowState === 3 ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: flowState === 0 || flowState === 15 ? 'translateX(calc(-80vw + 158px))' : 'translateX(0)' }}
        >
          {/* Fixed width pill with crossfading text to prevent width snapping */}
          <div className="relative w-[130px] h-[36px] bg-[#262626] border border-red-500/60 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)] overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center text-white text-[12px] font-medium tracking-wide whitespace-nowrap transition-opacity duration-500 ${flowState === 0 ? 'opacity-100' : 'opacity-0'}`}>
              Click for Home
            </div>
            <div className={`absolute inset-0 flex items-center justify-center text-white text-[12px] font-medium tracking-wide whitespace-nowrap transition-opacity duration-500 ${flowState > 0 ? 'opacity-100' : 'opacity-0'}`}>
              Explore timeline
            </div>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM RACING TIMELINE */}
      <div className="absolute bottom-0 left-0 w-full h-[320px] z-30 pointer-events-none">
        {/* Subtle red atmospheric glow underneath the path */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-600/5 via-red-900/5 to-transparent blur-2xl" />

        {/* The dashed racing path */}
        <svg
          className="absolute top-[80px] left-0 w-full h-[150px] overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 80 C 5 80, 5 75, 10 75 C 20 75, 20 65, 30 65 C 40 65, 40 52.5, 50 52.5 C 60 52.5, 60 35, 70 35 C 80 35, 80 20, 90 20 C 95 20, 95 15, 100 15"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="6 6"
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
              top: `calc(80px + (150px * ${parseFloat(cp.yOffset) / 100}))`,
              bottom: '40px'
            }}
          >
            {/* Exactly 54x54 Checkpoint visual element centered exactly on the path */}
            <div
              className={`relative z-10 flex items-center justify-center rounded-full h-[54px] w-[54px] -mt-[27px] bg-[#161616] ${trClass} ${cp.active
                ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-red-500/20'
                : 'shadow-lg border border-white/5'
                }`}
            >
              <Image
                src={cp.active ? "/assets/icons/progress_icon_active.svg" : "/assets/icons/progress_icon.svg"}
                alt={cp.lap}
                width={cp.active ? 20 : 18}
                height={cp.active ? 20 : 18}
              />
            </div>

            {/* Vertical connector line growing downwards strictly from the bottom of the checkpoint */}
            <div className={`flex-1 border-l border-dashed ${trClass} ${cp.active ? 'border-red-600/50' : 'border-[#4b5563]/60'} w-0 mt-2 mb-2`} />

            {/* Text Label aligned identically at the bottom */}
            <div className="absolute top-full w-[140px] text-center">
              <div className={`text-[12px] md:text-[13px] font-bold tracking-wider ${trClass} ${cp.active ? 'text-white' : 'text-gray-400'}`}>
                {cp.lap}
              </div>
              <div className={`text-[11px] md:text-[12px] tracking-wider mt-1 ${trClass} ${cp.active ? 'text-gray-300' : 'text-[#6b7280]'}`}>
                {cp.zone}
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* 8. FINAL THANK YOU SCREEN (State 14) */}
      <div 
        className={`fixed inset-0 pointer-events-none z-30 flex flex-col items-center justify-center transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${flowState === 14 ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="text-4xl md:text-[50px] font-black italic tracking-widest uppercase font-serif text-white drop-shadow-lg mb-8">
          THANK YOU
        </h2>
        <button 
          className={`flex items-center justify-center px-10 py-3 rounded-full bg-[#1c1c1c] border border-white/10 hover:bg-[#2a2a2a] transition-all duration-300 text-white text-sm tracking-widest font-medium ${flowState === 14 ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={() => {
            setFlowState(15);
            setTimeout(() => setFlowState(0), 300); // Snap cleanly back to 0 after fast collapse
          }}
        >
          Home
        </button>
      </div>
    </main>
  );
}


