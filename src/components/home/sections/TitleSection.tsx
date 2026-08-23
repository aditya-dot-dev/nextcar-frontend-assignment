import React from 'react';

interface TitleSectionProps {
  shrikhandClassName: string;
}

export default function TitleSection({ shrikhandClassName }: TitleSectionProps) {
  return (
    <>
      {/* 3. TITLE SECTION (Anchored independently to the screen top) */}
      <div className="absolute top-[130px] left-1/2 flex flex-col items-center text-center w-max -translate-x-1/2 z-20">
        <h1 className={`${shrikhandClassName} text-[36px] md:text-[60px] leading-[39px] tracking-[0.01em] uppercase font-normal antialiased`}>
          <span className="text-white drop-shadow-sm">ENGINEERED FOR </span>
          <span className="text-[#BF0405] drop-shadow-[0_0_15px_rgba(191,4,5,0.4)]">PASSION</span>
        </h1>

        <p className="mt-5 text-[18px] font-normal leading-[39px] tracking-[0.01em] text-white/70">
          Precision. Power. Performance
        </p>

        {/* Small red underline/accent */}
        <div className="mt-1 h-[4px] w-[26px] rounded-full bg-[#BF0405]" />
      </div>
    </>
  );
}
