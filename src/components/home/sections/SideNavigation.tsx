import React from 'react';
import Image from 'next/image';
import { FlowState } from '../hooks/useTimelineFlow';

interface SideNavigationProps {
  flowState: FlowState;
  setFlowState: (state: FlowState) => void;
  startTimelineSequence: (startState: FlowState) => void;
  timelineTimeouts: React.MutableRefObject<ReturnType<typeof setTimeout>[]>;
}

export default function SideNavigation({ flowState, setFlowState, startTimelineSequence, timelineTimeouts }: SideNavigationProps) {
  return (
    <>
      {/* 5. SIDE NAVIGATION - LEFT */}
      <div className="absolute left-[calc(10%-80px)] top-[429px] -translate-y-1/2 w-[120px] h-[300px] z-30">
        {/* Decorative Dashed Arc - Convex to the left, spaced 20px away from buttons */}
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[95%] pointer-events-none overflow-visible" viewBox="0 0 120 300">
          <path d="M 55 0 Q -65 150 55 300" fill="none" className="stroke-gray-300 dark:stroke-white/40 transition-colors duration-300" strokeWidth="1.5" strokeDasharray="8 14" strokeLinecap="round" />
        </svg>

        {/* Timer Button */}
        <Image
          src="/assets/icons/timer_icon.svg"
          alt="Timer"
          width={59} height={59}
          className="absolute left-[44px] top-[34px] cursor-pointer transition-transform hover:scale-105 z-10 dark:invert-0 invert dark:shadow-none shadow-md rounded-full dark:ring-0 ring-1 ring-black/5"
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
            src={(flowState === 1 || flowState === 2) ? "/assets/icons/home_active.svg" : "/assets/icons/home_icon.svg"}
            alt="Home"
            width={59} height={59}
            className={`cursor-pointer transition-transform hover:scale-105 rounded-full ${(flowState === 1 || flowState === 2) ? 'drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'dark:invert-0 invert dark:shadow-none shadow-md dark:ring-0 ring-1 ring-black/5'}`}
            onClick={() => {
              if (flowState === 0) {
                setFlowState(1);
              } else if (flowState >= 3 && flowState !== 15) {
                // Cancel any automatic timeline progression
                timelineTimeouts.current.forEach(clearTimeout);
                timelineTimeouts.current = [];
                // Navigate directly to Frame 2 using existing transition duration
                setFlowState(2);
              }
            }}
          />
        </div>

        {/* Rupee Button */}
        <Image
          src="/assets/icons/rupee_icon.svg"
          alt="Rupee"
          width={59} height={59}
          className="absolute left-[44px] top-[204px] cursor-pointer transition-transform hover:scale-105 z-10 dark:invert-0 invert dark:shadow-none shadow-md rounded-full dark:ring-0 ring-1 ring-black/5"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />
      </div>

      {/* 6. SIDE NAVIGATION - RIGHT */}
      <div className="absolute right-[calc(10%-80px)] top-[429px] -translate-y-1/2 w-[120px] h-[300px] z-30">
        {/* Decorative Dashed Arc - Convex to the right, spaced 20px away from buttons */}
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[95%] pointer-events-none overflow-visible" viewBox="0 0 120 300">
          <path d="M 65 0 Q 185 150 65 300" fill="none" className="stroke-gray-300 dark:stroke-white/40 transition-colors duration-300" strokeWidth="1.5" strokeDasharray="8 14" strokeLinecap="round" />
        </svg>

        {/* Chat Button */}
        <Image
          src="/assets/icons/chat_icon.svg"
          alt="Chat"
          width={59} height={59}
          className="absolute left-[14px] top-[34px] cursor-pointer transition-transform hover:scale-105 z-10 dark:invert-0 invert dark:shadow-none shadow-md rounded-full dark:ring-0 ring-1 ring-black/5"
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
            src={flowState >= 3 && flowState !== 15 ? "/assets/icons/timeline_active.svg" : "/assets/icons/timeline_icon.svg"}
            alt="Timeline"
            width={59} height={59}
            className={`cursor-pointer transition-transform hover:scale-105 rounded-full ${flowState >= 3 && flowState !== 15 ? 'drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'dark:invert-0 invert dark:shadow-none shadow-md dark:ring-0 ring-1 ring-black/5'}`}
            onClick={(e) => {
              e.stopPropagation();
              // HOME -> FRAME 3 (Start of Timeline sequence)
              if (flowState === 0 || flowState === 1 || flowState === 2) {
                startTimelineSequence(3);
              } 
              // FRAME 8 -> FRAME 4 (Restart loop from final position)
              else if (flowState >= 10 && flowState <= 14) {
                startTimelineSequence(6.5);
              }
              // Between Frame 3 and Frame 7 (flowState 3 through 9.5), click does absolutely nothing.
            }}
          />
        </div>

        {/* Notes Button */}
        <Image
          src="/assets/icons/notes_icon.svg"
          alt="Notes"
          width={59} height={59}
          className="absolute left-[14px] top-[204px] cursor-pointer transition-transform hover:scale-105 z-10 dark:invert-0 invert dark:shadow-none shadow-md rounded-full dark:ring-0 ring-1 ring-black/5"
          onClick={() => {
            if (flowState === 2) {
              setFlowState(15);
              setTimeout(() => setFlowState(0), 300);
            }
          }}
        />
      </div>
    </>
  );
}
