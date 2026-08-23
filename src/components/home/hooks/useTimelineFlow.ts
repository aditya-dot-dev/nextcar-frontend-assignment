import { useState, useEffect, useRef } from "react";

export type FlowState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 11 | 12 | 13 | 14 | 15;

export const TIMELINE_WIDTH = "w-[65vw] max-w-[750px]";

export function useTimelineFlow() {
  const [flowState, setFlowState] = useState<FlowState>(0);
  const timelineTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const timelineEvents = [
    { state: 4, delay: 1500 },
    { state: 5, delay: 1800 },
    { state: 6, delay: 1950 },
    { state: 6.5, delay: 2750 },
    { state: 7, delay: 3750 },
    { state: 7.5, delay: 4150 },
    { state: 8, delay: 5550 },
    { state: 8.5, delay: 5950 },
    { state: 9, delay: 7350 },
    { state: 9.5, delay: 7750 },
    { state: 10, delay: 9150 },
    { state: 11, delay: 10950 },
    { state: 12, delay: 12150 },
    { state: 13, delay: 13250 },
    { state: 14, delay: 14350 },
  ];

  const startTimelineSequence = (startState: any) => {
    timelineTimeouts.current.forEach(clearTimeout);
    timelineTimeouts.current = [];

    setFlowState(startState);

    const baseDelay = startState === 3 ? 0 : (timelineEvents.find(e => e.state === startState)?.delay || 0);

    timelineEvents.forEach(event => {
      if (event.state > startState) {
        const adjustedDelay = event.delay - baseDelay;
        timelineTimeouts.current.push(
          setTimeout(() => setFlowState(event.state as any), adjustedDelay)
        );
      }
    });
  };

  useEffect(() => {
    if (flowState === 1) {
      const timer = setTimeout(() => {
        setFlowState(2);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  const isTimelineStarted = flowState === 3;

  const getTransitionClass = () => {
    if (flowState === 1) return "transition-all duration-100 ease-in-out";
    if (flowState === 2) return "transition-all duration-500 ease-in-out";
    if (flowState === 3 || flowState === 4) return "transition-all duration-500 ease-in-out";
    if (flowState === 7) return "transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
    if (flowState >= 8) return "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
    return "transition-all duration-300 ease-in-out";
  };
  const trClass = getTransitionClass();

  const activeLap: string = isTimelineStarted ? 'LAP 05' : 'LAP 03';

  const checkpoints = [
    { lap: 'LAP 01', zone: 'Speed Zone', left: 10, yOffset: '79.5%', active: activeLap === 'LAP 01' },
    { lap: 'LAP 02', zone: 'Acceleration Zone', left: 30, yOffset: '70%', active: activeLap === 'LAP 02' },
    { lap: 'LAP 03', zone: 'Technical Section', left: 50, yOffset: '58.1%', active: activeLap === 'LAP 03' },
    { lap: 'LAP 04', zone: 'High Speed Zone', left: 70, yOffset: '52.9%', active: activeLap === 'LAP 04' },
    { lap: 'LAP 05', zone: 'Final Corner', left: 90, yOffset: '27.1%', active: activeLap === 'LAP 05' },
  ];

  return {
    flowState,
    setFlowState,
    startTimelineSequence,
    timelineTimeouts,
    trClass,
    checkpoints,
    activeLap
  };
}
