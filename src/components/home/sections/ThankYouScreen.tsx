import React from 'react';
import { FlowState } from '../hooks/useTimelineFlow';

interface ThankYouScreenProps {
  flowState: FlowState;
  setFlowState: (state: FlowState) => void;
  shrikhandClassName: string;
}

export default function ThankYouScreen({ flowState, setFlowState, shrikhandClassName }: ThankYouScreenProps) {
  return (
    <>
      {/* 8. FINAL THANK YOU SCREEN (State 14) */}
      <div
        className={`absolute top-[429px] left-1/2 z-30 transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${flowState === 14 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <h2 
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${shrikhandClassName} text-gray-900 dark:text-[#F4F4F4] transition-colors duration-300 font-normal text-[60px] leading-[39px] tracking-[0.01em] text-center`}
          style={{ width: '387px' }}
        >
          THANK YOU
        </h2>
        <button
          className={`absolute left-0 w-[135px] h-[49px] flex items-center justify-center rounded-[30px] bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:hover:bg-white/30 text-gray-900 dark:text-white transition-colors duration-300 text-base font-normal`}
          style={{ top: '180px', transform: 'translate(-50%, -50%)' }}
          onClick={() => {
            setFlowState(15);
            setTimeout(() => setFlowState(0), 300); // Snap cleanly back to 0 after fast collapse
          }}
        >
          Home
        </button>
      </div>
    </>
  );
}
