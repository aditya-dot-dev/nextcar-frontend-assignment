"use client";

import { Shrikhand } from 'next/font/google';
import { useTimelineFlow, TIMELINE_WIDTH } from './hooks/useTimelineFlow';
import BackgroundAtmosphere from './sections/BackgroundAtmosphere';
import Header from './sections/Header';
import TitleSection from './sections/TitleSection';
import CenterCarDisplay from './sections/CenterCarDisplay';
import SideNavigation from './sections/SideNavigation';
import AnimatedTooltip from './sections/AnimatedTooltip';
import BottomRacingTimeline from './sections/BottomRacingTimeline';
import ThankYouScreen from './sections/ThankYouScreen';

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function HomeScreen() {
  const {
    flowState,
    setFlowState,
    startTimelineSequence,
    timelineTimeouts,
    trClass,
    checkpoints
  } = useTimelineFlow();

  return (
    <main
      className="relative flex h-[max(100vh,831px)] w-full overflow-hidden bg-[#EBEBEB] dark:bg-[#050405] text-black dark:text-white select-none transition-colors duration-300"
      onClick={() => {
        if (flowState === 2) {
          setFlowState(15);
          setTimeout(() => setFlowState(0), 300);
        }
      }}
    >
      <BackgroundAtmosphere />
      <Header setFlowState={setFlowState} />
      <TitleSection shrikhandClassName={shrikhand.className} />
      
      <CenterCarDisplay 
        flowState={flowState} 
        trClass={trClass} 
        TIMELINE_WIDTH={TIMELINE_WIDTH} 
      />
      
      <SideNavigation 
        flowState={flowState} 
        setFlowState={setFlowState} 
        startTimelineSequence={startTimelineSequence} 
        timelineTimeouts={timelineTimeouts} 
      />
      
      <AnimatedTooltip flowState={flowState} />
      
      <BottomRacingTimeline 
        trClass={trClass} 
        checkpoints={checkpoints} 
      />
      
      <ThankYouScreen 
        flowState={flowState} 
        setFlowState={setFlowState} 
        shrikhandClassName={shrikhand.className} 
      />
    </main>
  );
}
